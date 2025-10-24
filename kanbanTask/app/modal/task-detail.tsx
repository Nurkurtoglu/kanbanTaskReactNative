// app/modal/task-detail.tsx
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Task } from "../../types/task";
import { Snackbar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { avatars } from '@/types/avatarMap';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import DropDownPicker from 'react-native-dropdown-picker';
import { User } from '@/types/user';
import { updateTaskData } from '@/store/apiwithThunks/tasksApi';


export default function TaskDetailModal() {
    const router = useRouter();
    const { task } = useLocalSearchParams();

    const { currentUser: usersList } = useAppSelector((state) => state.user);
    const { tasks } = useAppSelector((state) => state.tasks);
    const { user: authUser } = useAppSelector((state) => state.auth);
    const taskData: Task = task ? JSON.parse(task as string) : null
    const dispatch = useAppDispatch();

    const [editableTask, setEditableTask] = useState<Task | null>(taskData);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

    // Dropdown state'leri
    const [openAssignee, setOpenAssignee] = useState(false);
    const [assigneeItems, setAssigneeItems] = useState<{ label: string, value: string }[]>([]);
    const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
    const reporterId = taskData?.created_by;
    const reporter = usersList?.find(user => user.id === reporterId);

    useEffect(() => {
        if (!usersList) return;
        // authUser varsa kendisini hariç tut
        const items = usersList
            .filter((user: User) => authUser ? user.id !== authUser.id : true)
            .map((user: User) => ({
                label: `${user.name} ${user.surname}`,
                value: user.id!
            }));

        setAssigneeItems(items);
    }, [usersList, authUser]);

    useEffect(() => {
        if (isEditing && editableTask?.assignees) {
            const assigneeIds = editableTask.assignees
                .map(user => user.id)
            setSelectedAssignees(assigneeIds);
        }
    }, [isEditing, editableTask]);

    const handleEditToggle = () => {

        if (!authUser || authUser.id !== reporterId) {
            Alert.alert("Uyarı!", "Bu görevi yalnızca oluşturan kişi düzenleyebilir!");
            return;
        }

        if (!isEditing) {
            // Edit moda geçiyoruz
            setIsEditing(true);
        } else {
            // Edit moddan çıkıyoruz, değişiklikleri kaydetmeden
            setIsEditing(false);
            // Düzenlemeyi iptal edince editableTask'i Redux store’dan güncel task ile set et
            const latestTask = tasks.find(t => t.id === taskData?.id);
            if (latestTask) setEditableTask(latestTask);
        }
    };

    const handleSave = () => {
        if (!authUser || authUser.id !== reporterId) {
            Alert.alert("Uyarı", "Bu görevi güncelleme yetkiniz yok!");
            return;
        }

        if (!editableTask?.id) {
            Alert.alert("Hata", "Task ID bulunamadı!");
            return;
        }

        // Seçilen assignee'leri User objelerine çevir
        const updatedAssignees = usersList
            .filter(user => selectedAssignees.includes(user.id!))
            .map(user => user.id!)

        const updatedTask = {
            ...editableTask,
            assignees: updatedAssignees as any
        };

        // Redux action'ını dispatch et
        dispatch(updateTaskData(updatedTask))
            .unwrap()
            .then((updated) => {
                setSnackbarVisible(true);
                console.log("Görev güncellendi");

                // Kaydetmeden sonra eski haline dön
                setIsEditing(false);
                // Kaydettikten sonra editableTask’i Redux store’daki güncel task ile güncelle
                setEditableTask(updated);
            })
            .catch(err => {
                Alert.alert("Hata", "Güncelleme hatası: " + err);
            });
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => router.back()}
            >
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            {/* Başlık */}
            {isEditing ? (
                <TextInput
                    style={[styles.input, isEditing && styles.inputEditing]}
                    value={editableTask?.title}
                    onChangeText={(text) =>
                        setEditableTask((prev) => prev ? { ...prev, title: text } : prev)
                    }
                    autoFocus={true}
                />
            ) : (
                <Text style={styles.title}>{editableTask?.title}</Text>
            )}

            {/* Raporlayan */}

            <View style={styles.reporterContainer}>
                {reporter && reporter.avatarIndex != null && (
                    <Image
                        style={styles.reporterAvatarImg}
                        contentFit='contain'
                        source={avatars[reporter?.avatarIndex]}
                    />
                )}
                <Text style={{ color: "#878787ff" }}>Raporlayan: </Text>
                <Text style={{ color: "#000000ff" }}>{reporter?.name} {reporter?.surname}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                <TouchableOpacity style={{ borderRadius: 22, padding: 14, backgroundColor: "#114495ff" }}>
                    <Text style={{ color: "#fff" }}>{taskData.status
                        ? taskData.status.charAt(0).toUpperCase() + taskData.status.slice(1)
                        : ''}</Text>
                </TouchableOpacity>
                <Text style={{ color: "#555" }}>{taskData.created_at ? new Date(taskData.created_at).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}</Text>
            </View>

            <Text style={{ color: "#878787ff", marginTop: 40 }}>Açıklama:</Text>

            {/* Açıklama Kartı */}
            <View style={styles.detailCard}>
                {isEditing ? (
                    <TextInput
                        multiline
                        style={[styles.description, styles.input]}
                        value={editableTask?.description}
                        onChangeText={(text) =>
                            setEditableTask((prev) => prev ? { ...prev, description: text } : prev)
                        }
                    />
                ) : (
                    <Text style={styles.description}>{editableTask?.description}</Text>
                )}
            </View>

            {/* Atanan Kişiler */}
            <Text style={styles.assigneesLabel}>Atanan Kişiler:</Text>

            {isEditing ? (
                // Edit mod: Dropdown
                <DropDownPicker
                    multiple={true}
                    open={openAssignee}
                    value={selectedAssignees}
                    items={assigneeItems}
                    setOpen={setOpenAssignee}
                    setValue={setSelectedAssignees}
                    setItems={setAssigneeItems}
                    placeholder="Kişi seçin"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    listMode="SCROLLVIEW"
                />
            ) : (
                // View mod: Avatar listesi
                <View style={styles.avatarContainer}>
                    {editableTask?.assignees.map((user) => (
                        <View key={user.id} style={styles.avatarItem}>
                            <Image
                                style={styles.avatarImg}
                                contentFit='contain'
                                source={avatars[user.avatarIndex]}
                            />
                            <Text style={styles.assigneeName}>{user.name}</Text>
                        </View>
                    ))}

                </View>
            )}

            <View style={styles.editingStyle}>
                {/* Düzenle / Kaydet Butonu */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={isEditing ? handleSave : handleEditToggle}
                >
                    {isEditing ?
                        <Ionicons name="checkmark-done" size={50} color="#22b947ff" /> :
                        <MaterialCommunityIcons name="clipboard-edit-outline" size={50} color="#114495ff" />
                    }
                </TouchableOpacity>
            </View>


            <View style={{ alignItems: "center" }}>
                {/* Snackbar */}
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={2000}
                    style={styles.snackbar}
                >
                    <Text style={{ color: "#fff" }}>✅ Görev başarıyla güncellendi!</Text>
                </Snackbar>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    closeText: {
        fontSize: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 17,
        color: '#000000ff',
    },
    avatarImg: {
        width: 50,
        height: 50,
        backgroundColor: '#eee',
        borderRadius: 20,
    },
    detailCard: {
        alignItems: "flex-start",
        backgroundColor: '#e1dedeff',
        borderRadius: 10,
        padding: 12,
        width: '100%',
        height: 200,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: '#e5e7eb',
        marginTop: 5
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: 'wrap',
    },
    avatarItem: {
        alignItems: 'center',
        margin: 10,
    },
    input: {
        backgroundColor: "#f0f0f0",
        borderRadius: 6,
        padding: 8,
        width: "100%",
    },
    snackbar: {
        backgroundColor: "#5A56E9",
        borderRadius: 8,
        marginLeft: 5
    },
    button: {
        marginTop: 30,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: 'center',
    },
    inputEditing: {
        borderColor: "#1d4ed8",
        backgroundColor: "#f3ededff",
    },
    assigneesLabel: {
        color: "#878787ff",
        marginTop: 20,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    assigneeName: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
    },
    dropdown: {
        borderColor: '#e5e7eb',
        marginBottom: 10,
    },
    dropdownContainer: {
        borderColor: '#e5e7eb',
        maxHeight: 200,
    },
    editingStyle: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    reporterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    reporterAvatarImg: {
        width: 40,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 20,
        margin: 10
    }
});