import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal  // 👈 Modal'ı import et
} from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

interface CreateTaskModalProps {
    handleClose: () => void; // fonksiyon tipini belirledik
}

export default function CreateTaskModal({ handleClose }: CreateTaskModalProps) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [status, setStatus] = useState('');



    const handleCreateTask = () => {
        console.log('New task:', { title, description });
        handleClose();
    };


    return (
        <Modal
            visible={true}
            animationType="slide"
            transparent
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create New Task</Text>
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.content}>
                        <Text style={styles.label}>Task Title</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Enter task title"
                        />

                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Enter task description"
                            multiline
                        />
                        <Text style={styles.label}>Assignee</Text>
                        <TextInput
                            style={styles.input}
                            value={assignee}
                            onChangeText={setAssignee}
                            placeholder="Assigne"
                        />
                        <Text style={styles.label}>Status</Text>
                        <TextInput
                            style={styles.input}
                            value={status}
                            onChangeText={setStatus}
                            placeholder="Status"
                        />

                        <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
                            <Text style={styles.createButtonText}>Create Task</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '95%',
        height: 650,
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        fontSize: 20,
        color: '#666',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    createButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});