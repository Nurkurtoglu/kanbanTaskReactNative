import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="modal/create-task" options={{
                presentation: 'modal',
                headerShown: false
            }} />
            <Stack.Screen name="modal/task-detail" options={{
                presentation: 'modal',
                headerShown: false
            }} />
        </Stack>
    );
}