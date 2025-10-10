import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import KanbanRow from './components/KanbanBoard';
import TabBar from './components/TabBar';
import CreateTaskModal from './modal/create-task';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';



const backlogTasks = [
    { id: '1', title: 'Implement Clean Architecture', description: 'Refactor the app' },
    { id: '2', title: 'Add TypeScript', description: 'Migrate to TypeScript' },
    { id: '3', title: 'Implement Clean Architecture', description: 'Refactor the app' },
    { id: '4', title: 'Add TypeScript', description: 'Migrate to TypeScript' },
    { id: '5', title: 'Implement Clean Architecture', description: 'Refactor the app' },
    { id: '6', title: 'Add TypeScript', description: 'Migrate to TypeScript' },
];

const inProgressTasks = [
    { id: '1', title: 'Design System', description: 'Create component library' },
    { id: '2', title: 'Design System', description: 'Create component library' },
    { id: '3', title: 'Design System', description: 'Create component library' },
    { id: '4', title: 'Design System', description: 'Create component library' },
    { id: '5', title: 'Design System', description: 'Create component library' },
];
const todoTasks = [
    { id: '4', title: 'Done ', description: 'Create component sdadasdsalibrary' },
    { id: '5', title: 'Done ', description: 'Create component sdadasdsalibrary' },
    { id: '6', title: 'Done ', description: 'Create component sdadasdsalibrary' },
];


export default function HomePage() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image style={styles.img} resizeMode='contain' source={require("../assets/images/rastMobile.png")} />
                <View style={styles.iconsContainer}>
                    <TouchableOpacity>
                        <Ionicons name="search" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="settings" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Kanban Board */}
            <ScrollView style={styles.board}>

                <KanbanRow
                    title="Backlog"
                    tasks={backlogTasks}
                    color="red"
                />

                <KanbanRow
                    title="Todo"
                    tasks={todoTasks}
                    color="#8581ecff"
                />

                <KanbanRow
                    title="Inprogress"
                    tasks={inProgressTasks}
                    color="green"
                />


            </ScrollView>
            {/* Home icon */}
            <TabBar />


            {/* Modal aç butonu */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>

            {/* Modal */}

            {isModalVisible && (
                <CreateTaskModal handleClose={() => setIsModalVisible(false)} />
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: '#5A56E9',
        borderBottomColor: '#e0e0e0',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    board: {
        padding: 10,
    },
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
        backgroundColor: "#8581ecff"
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

    taskCard: {
        backgroundColor: '#fafafa',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    taskTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    taskDescription: {
        fontSize: 12,
        color: '#666',
        lineHeight: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 14,
        marginTop: 20,
    },
    addButton: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        backgroundColor: '#5A56E9',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    img: {
        width: 100,
        height: 70
    },
    boardCard: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        height: 200,
        margin: 20,
        borderWidth: 1,
        borderColor: "#dcd6d6ff",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    iconsContainer: {
        flexDirection: "row",
        gap: 10
    }
});