import { Stack } from 'expo-router';
import { Provider as PaperProvider } from "react-native-paper";
import { store } from '../store';
import { Provider } from 'react-redux';


export default function RootLayout() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="pages" options={{ headerShown: false }} />
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
        </Provider>
    );
}
