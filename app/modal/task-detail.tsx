// app/modal/task-detail.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TabBar from '../components/TabBar';


export default function TaskDetailModal() {
    const router = useRouter();
    const { task } = useLocalSearchParams();

    const taskData = task ? JSON.parse(task as string) : null;

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => router.back()}
            >
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{taskData?.title}</Text>
            <Text style={styles.description}>{taskData?.description}</Text>

            <View style={styles.tabBarContainer}>
                <TabBar />
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
        fontSize: 16,
        color: '#666',
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

});