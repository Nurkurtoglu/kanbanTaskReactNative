import { Stack } from 'expo-router';
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
    return (

        <PaperProvider>
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
        </PaperProvider>
    );
}