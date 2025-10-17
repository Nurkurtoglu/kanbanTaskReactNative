// app/modal/task-detail.tsx
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Task } from "../../types/task";
import { Snackbar } from 'react-native-paper';
import { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TaskDetailModal() {
    const router = useRouter();
    const { task } = useLocalSearchParams();

    const taskData: Task | null = task ? JSON.parse(task as string) : null

    const [editableTask, setEditableTask] = useState<Task | null>(taskData);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };
    const handleSave = () => {
        setIsEditing(false);
        setSnackbarVisible(true);

        // Burada backend'e update isteği atabilirsin (örneğin Firebase veya API)
        console.log("Updated task:", editableTask);
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


            <Text>Raporlayan: </Text>

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
                        autoFocus={true}
                    />
                ) : (
                    <Text style={styles.description}>{editableTask?.description}</Text>
                )}
            </View>


            <View style={styles.avatarandbutton}>
                {/* Avatarlar */}
                <View style={styles.avatarContainer}>
                    {editableTask?.assignee.map((user) => (
                        <View key={user.id}>
                            <Image
                                style={styles.avatarImg}
                                contentFit='contain'
                                source={user.avatar}
                            />
                        </View>
                    ))}
                </View>

                {/* Düzenle / Kaydet Butonu */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={isEditing ? handleSave : handleEditToggle}
                >
                    {isEditing ? <Ionicons name="checkmark-done" size={50} color="#22b947ff" /> : <MaterialCommunityIcons name="clipboard-edit-outline" size={50} color="#114495ff" />
                    }
                </TouchableOpacity>

            </View>

            {/* Snackbar */}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={2000}
                style={styles.snackbar}
                theme={{ colors: { onSurface: 'white' } }}
            >
                <Text style={{ color: "#fff" }}>✅ Görev başarıyla güncellendi!</Text>
            </Snackbar>

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
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    avatarImg: {
        width: 50,
        height: 50,
        backgroundColor: '#eee',
        borderRadius: 20,
        marginTop: 30,
        margin: 10
    },
    detailCard: {
        alignItems: "flex-start",
        backgroundColor: '#e1dedeff',
        borderRadius: 10,
        padding: 12,
        margin: 12,
        width: 320,
        height: 200,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: '#e5e7eb',
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    input: {
        backgroundColor: "#f0f0f0",
        borderRadius: 6,
        padding: 8,
        width: "100%",
    },
    snackbar: {
        backgroundColor: "#323232",
        borderRadius: 8,
        left: 22
    },
    button: {
        marginTop: 30,
        borderRadius: 8,
        alignItems: "center",
    },
    avatarandbutton: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    inputEditing: {
        borderColor: "#1d4ed8",
        backgroundColor: "#f3ededff",
    },

});