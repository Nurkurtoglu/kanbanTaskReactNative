import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { use } from 'react'
import { StyleSheet } from 'react-native'
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useAppSelector } from "../../store/hooks"


// Props interface'ini tanımla
interface KanbanColumnProps {
    title: string;
    color?: string;
    status: string;
    onTaskPress?: (taskId: string) => void;
    onColumnPress?: () => void;
}


export default function KanbanBoard({ title, color, status }: KanbanColumnProps) {

    const { tasks } = useAppSelector((state) => state.tasks);
    const filteredTasks = tasks.filter((t) => t.status === status);

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
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.taskCard} onPress={() => router.push({
                        pathname: '/modal/task-detail',
                        params: { task: JSON.stringify(item) }
                    })}>
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <Text style={styles.taskDescription}>{item.description}</Text>
                        <View style={styles.userInfo}>
                            {item.assignee.map((user) => (
                                <View key={user.id} style={{ marginRight: 8 }}>
                                    <Image
                                        style={styles.avatarImg}
                                        contentFit='contain'
                                        source={user.avatar}>
                                    </Image>
                                    <Text style={{ fontSize: 15 }}>{user.name}</Text>
                                </View>
                            ))}
                        </View>
                    </TouchableOpacity>
                )}
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
    }
})