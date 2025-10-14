import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import GeneralBtn from '../components/GeneralBtn';
import { useRouter } from 'expo-router';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS için padding, Android için height
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled" // klavye açıkken tıklama sorunu yaşamamak için
            >

                <View style={styles.header}>
                    <Image style={styles.img} source={require('../../assets/images/login.png')} />
                    <Text style={styles.welcome}>Welcome Back</Text>
                    <Text style={styles.subText}>Sign in to continue</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        placeholderTextColor="#666"
                        secureTextEntry
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <GeneralBtn color="#6661ebff" selfText="LOGIN" />
                    <View style={styles.registerContainer}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('/pages/SignupPage')}>
                            <Text style={styles.registerText}> Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: "space-evenly",
        gap: 40,
    },
    header: {
        alignItems: 'center',
        gap: 10,

    },
    img: {
        width: 200,
        height: 200,
    },
    welcome: {
        color: '#6661ebff',
        fontWeight: 'bold',
        fontSize: 28,
    },
    subText: {
        color: '#777',
        fontSize: 15,
    },
    inputsContainer: {
        gap: 15,
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        width: 280,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonsContainer: {
        width: 250,
        gap: 10,
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerText: {
        color: '#6661ebff',
        fontWeight: '600',
    },
});
