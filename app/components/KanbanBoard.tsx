import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Task } from "../../types/user"
import { router } from 'expo-router';


// Props interface'ini tanımla
interface KanbanColumnProps {
    title: string;
    tasks: Task[];
    color?: string;
    onTaskPress?: (taskId: string) => void;
    onColumnPress?: () => void;
}


export default function KanbanBoard({ title, tasks, color }: KanbanColumnProps) {
    return (
        <View>
            <View style={styles.columnHeader}>
                <View style={[styles.colorDot, { backgroundColor: color }]} />
                <Text style={styles.columnTitle}>{title}</Text>
                <Text style={styles.taskCount}>({tasks.length})</Text>
            </View>

            <FlatList
                data={tasks}
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
                    </TouchableOpacity>
                )}
            />

            {/* Eğer hiç görev yoksa */}
            {tasks.length === 0 && (
                <Text style={styles.emptyText}>No tasks available</Text>
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
    taskItem: {
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

})