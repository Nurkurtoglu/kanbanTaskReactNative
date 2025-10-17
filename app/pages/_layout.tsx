import { Stack } from 'expo-router';
import { Provider as PaperProvider } from "react-native-paper";

export default function PagesLayout() {
    return (
        <PaperProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" options={{ headerShown: false }} />
                <Stack.Screen name="LoginPage" />
                <Stack.Screen name="SignupPage" />
                <Stack.Screen name="Home" />
            </Stack>
        </PaperProvider>

    );
}
