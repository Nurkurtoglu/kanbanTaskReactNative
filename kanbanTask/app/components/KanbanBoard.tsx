import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { use, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getTaskData } from '@/store/apiwithThunks/tasksApi';
import { getUserData } from '@/store/apiwithThunks/usersApi';
import { avatars } from "@/types/avatarMap"
import { User } from '@/types/user';


// Props interface'ini tanımla
interface KanbanColumnProps {
    title: string;
    color?: string;
    status: string;
    onTaskPress?: (taskId: string) => void;
    onColumnPress?: () => void;
}


export default function KanbanBoard({ title, color, status }: KanbanColumnProps) {

    const dispatch = useAppDispatch();

    const { tasks, statusTask, errorTask } = useAppSelector((state) => state.tasks);
    const { currentUser, statusUser, errorUser } = useAppSelector((state) => state.user);

    useEffect(() => {
        // Eğer veriler daha önce yüklenmediyse çek
        if (tasks.length === 0 && statusTask === 'idle') {
            dispatch(getTaskData());
        }
    }, [dispatch, tasks.length, statusTask]);

    useEffect(() => {
        // Eğer veriler daha önce yüklenmediyse çek
        if (currentUser.length === 0 && statusUser === 'idle') {
            dispatch(getUserData());
        }
    }, [dispatch, currentUser.length, statusUser]);

    console.log("veriler ", tasks)
    console.log("users from state:", currentUser);

    // Filtrele
    const filteredTasks = tasks?.filter((t) => t.status === status) || [];

    // Kullanıcı bilgilerini eşleştiren fonksiyon
    const getAssigneeInfo = (assigneeIds: string[]): User[] => {
        if (!currentUser || !assigneeIds || assigneeIds.length === 0) return [];

        return assigneeIds
            .map(id => {
                const user = currentUser.find(u => u.id === id);
                return user ? {
                    id: user.id,
                    name: user.name,
                    avatarIndex: user.avatarIndex
                } : undefined;
            })
            .filter((user): user is User & { id: string } => user !== undefined);
    };

    // Eğer yükleniyorsa göster
    if (statusTask === 'loading' || statusUser === 'loading') {
        return <Text style={styles.loadingText}>Yükleniyor...</Text>;
    }

    // Eğer hata varsa göster
    if (errorTask || errorUser) {
        return <Text style={styles.errorText}>Hata: {errorTask || errorUser}</Text>;
    }
    return (
        <View>
            <View style={styles.columnHeader}>
                <View style={[styles.colorDot, { backgroundColor: color }]} />
                <Text style={styles.columnTitle}>{title}</Text>
                <Text style={styles.taskCount}>({filteredTasks.length})</Text>
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.taskList}
                renderItem={({ item }) => {
                    // assignees'leri işle - hem string ID array hem de object array durumunu kontrol et
                    const assigneeIds = Array.isArray(item.assignees)
                        ? item.assignees.map(a => typeof a === 'string' ? a : a.id).filter((id): id is string => id !== undefined) // undefined'ları filtrele
                        : [];

                    const assigneeInfos = getAssigneeInfo(assigneeIds);

                    return (
                        <TouchableOpacity
                            style={styles.taskCard}
                            onPress={() => router.push({
                                pathname: '/modal/task-detail',
                                params: { task: JSON.stringify(item) }
                            })}
                        >
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text style={styles.taskDescription} numberOfLines={2}>
                                {item.description}
                            </Text>
                            <View style={styles.userInfo}>
                                {assigneeInfos.length > 0 ? (
                                    assigneeInfos.map((user) => (
                                        <View key={user.id} >
                                            <Image
                                                style={styles.avatarImg}
                                                source={avatars[user.avatarIndex]}
                                            />
                                        </View>
                                    ))
                                ) : (
                                    <Text >Atanmış kullanıcı yok</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />

            {(!filteredTasks || filteredTasks.length === 0) && (
                <Text style={styles.emptyText}>Mevcut görev yok</Text>
            )}

        </View>

    );
}

const styles = StyleSheet.create({

    columnHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    colorDot: {
        width: 10,
        height: 10,
        borderRadius: 20,
        marginRight: 8,
    },
    columnTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    taskCount: {
        color: '#888',
        fontSize: 14,
        marginLeft: 6,
    },
    taskTitle: {
        fontSize: 17,
        fontWeight: "bold"
    },
    emptyText: {

    },
    taskDescription: {
        fontSize: 15
    },
    taskList: {
        paddingHorizontal: 8,
    },
    taskCard: {
        justifyContent: "space-between",
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        margin: 12,
        width: 300,
        height: 180,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 0.2,
        borderColor: '#e5e7eb',
    },
    userInfo: {
        flexDirection: 'row',
        marginTop: 8,
    },
    avatarImg: {
        width: 30,
        height: 30,
        backgroundColor: '#eee',
        borderRadius: 20,
    },
    loadingText: {
        padding: 15,
        textAlign: 'center',
        color: '#888',
    },
    errorText: {
        padding: 15,
        textAlign: 'center',
        color: 'red',
    },
})