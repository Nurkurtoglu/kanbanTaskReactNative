// app/modal/task-detail.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TabBar from '../components/BottomBar';
import { Image } from 'expo-image';
import { Task } from "../../types/task";


export default function TaskDetailModal() {
    const router = useRouter();
    const { task } = useLocalSearchParams();

    const taskData: Task | null = task ? JSON.parse(task as string) : null

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => router.back()}
            >
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{taskData?.title}</Text>
            <Text>Reported By: </Text>

            <Text style={{ color: "#878787ff", marginTop: 40 }}>Description:</Text>

            <View style={styles.detailCard}>
                <Text style={styles.description}>{taskData?.description}</Text>
            </View>

            <View style={styles.avatarContainer}>
                {taskData?.assignee.map((user) => (
                    <View key={user.id}>
                        <Image style={styles.avatarImg} contentFit='contain' source={user.avatar}></Image>
                    </View>
                ))}
            </View>
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
    }

});