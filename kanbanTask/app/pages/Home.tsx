import {
    View, StyleSheet, ScrollView,
    TouchableOpacity, TextInput
} from 'react-native'
import React from 'react'
import KanbanRow from '../../components/KanbanBoard';
import TabBar from '../../components/BottomBar';
import CreateTaskModal from '../modal/create-task';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { useState } from "react"
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/store/hooks';



export default function Home() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false); // search input toggle
    const { tasks } = useAppSelector(state => state.tasks);

    const filteredTasks = tasks.filter(task =>
    (task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase()))
    );


    // Search ikonuna tıklayınca arama inputu aç
    const handleSearchPress = () => {
        setIsSearching(prev => !prev);
    }


    const router = useRouter()

    const routerSettingsPage = () => {
        console.log("Settings sayfası")
        router.push("/pages/SettingsPage")
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Image style={styles.img} contentFit='contain' source={require("../../assets/images/rastMobile.png")} />
                    <View style={styles.iconsContainer}>
                        <TouchableOpacity onPress={handleSearchPress}>
                            <Ionicons name="search" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={routerSettingsPage}>
                            <Feather name="settings" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Arama inputu */}
                {isSearching && (
                    <TextInput
                        style={{ padding: 10, backgroundColor: '#fff', margin: 10, borderRadius: 6 }}
                        placeholder="Görev ara..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                )}

                {/* Kanban Board */}
                <ScrollView style={styles.board}>

                    <KanbanRow
                        title="Backlog"
                        color="red"
                        status="backlog"
                        taskss={filteredTasks}
                    />

                    <KanbanRow
                        title="Todo"
                        color="#8581ecff"
                        status="todo"
                        taskss={filteredTasks}
                    />

                    <KanbanRow
                        title="Inprogress"
                        color="green"
                        status="Inprogress"
                        taskss={filteredTasks}
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
                    <CreateTaskModal
                        handleClose={() => setIsModalVisible(false)}
                    />
                )}


            </View>
        </View>
    )
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
        paddingHorizontal: 15,
        paddingVertical: 20,
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