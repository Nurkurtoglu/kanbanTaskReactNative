import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="modal/create-task" options={{
                presentation: 'modal',
            }} />
            <Stack.Screen name="modal/task-detail" options={{
                presentation: 'modal',
                headerShown: false
            }} />
        </Stack>
    );
}