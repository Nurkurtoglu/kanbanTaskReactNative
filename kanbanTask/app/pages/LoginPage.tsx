import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import React from "react";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "@/store/slices/authSlice";
import GeneralBtn from "../../components/GeneralBtn";
import { saveFormSchema } from "../../schemas/SaveFormSchemas";

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const initialValues = { userEmail: '', userPassword: '' };

    const handleLogin = async (values: typeof initialValues) => {
        try {
            const res = await dispatch(loginUser({ email: values.userEmail, password: values.userPassword })).unwrap();
            console.log('Login success:', res);
            router.push('/pages/Home');
        } catch (err: any) {
            console.log('Login error:', err);
            Alert.alert('Hata', err);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Image style={styles.img} source={require('../../assets/images/login.png')} />
                    <Text style={styles.welcome}>Tekrar Hoş Geldiniz</Text>
                    <Text style={styles.subText}>Devam etmek için oturum açın</Text>
                </View>

                <Formik
                    initialValues={initialValues}
                    validationSchema={saveFormSchema}
                    onSubmit={handleLogin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.inputsContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#666"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={values.userEmail}
                                onChangeText={handleChange('userEmail')}
                                onBlur={handleBlur('userEmail')}
                            />
                            {touched.userEmail && errors.userEmail && (
                                <Text style={styles.errorText}>{errors.userEmail}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                placeholder="Şifre"
                                placeholderTextColor="#666"
                                secureTextEntry
                                value={values.userPassword}
                                onChangeText={handleChange('userPassword')}
                                onBlur={handleBlur('userPassword')}
                            />
                            {touched.userPassword && errors.userPassword && (
                                <Text style={styles.errorText}>{errors.userPassword}</Text>
                            )}

                            <View style={styles.buttonsContainer}>
                                <GeneralBtn color="#6661ebff" selfText="Giriş" onPress={handleSubmit as any} />
                                <View style={styles.registerContainer}>
                                    <Text>Hesabınız yok mu?</Text>
                                    <TouchableOpacity onPress={() => router.push('/pages/SignupPage' as any)}>
                                        <Text style={styles.registerText}>Kayıt olun</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 40,
    },
    header: {
        alignItems: "center",
        gap: 10,
    },
    img: {
        width: 200,
        height: 200,
    },
    welcome: {
        color: "#6661ebff",
        fontWeight: "bold",
        fontSize: 28,
    },
    subText: {
        color: "#777",
        fontSize: 15,
    },
    inputsContainer: {
        gap: 15,
        alignItems: "center",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        width: 280,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    errorText: {
        color: "##b94e4eff",
        marginBottom: 5,
        alignSelf: "flex-start",
        marginLeft: 5,
    },
    buttonsContainer: {
        width: 250,
        gap: 10,
    },
    registerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    registerText: {
        color: "#6661ebff",
        fontWeight: "600",
        marginHorizontal: 5,
    }
});
