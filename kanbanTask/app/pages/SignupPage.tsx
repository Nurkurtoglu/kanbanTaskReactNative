import React from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as yup from "yup";
import GeneralBtn from "../../components/GeneralBtn";
import { avatars } from "../../types/avatarMap";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addUserData } from "@/store/apiwithThunks/usersApi";
import axios, { AxiosError } from "axios";


import { LogBox } from "react-native";

// Tüm uyarıları ve logları bastırmak
LogBox.ignoreAllLogs(true);

// Sadece belirli bir uyarıyı bastırmak
LogBox.ignoreLogs([
    "AxiosError" // Bu kısmı hatanın mesajından veya regex ile ayarlayabilirsin
]);
// Yup şeması
const registerSchema = yup.object({
    name: yup.string().required("İsim zorunludur"),
    surname: yup.string().required("Soyisim zorunludur"),
    email: yup.string().email("Geçerli bir email giriniz").required("Email zorunludur"),
    password: yup.string().min(6, "Şifre en az 6 karakter olmalı").required("Şifre zorunludur"),
    avatarIndex: yup.number().required("Avatar seçimi zorunludur"),
});

// Tip çıkarımı
type RegisterFormValues = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const initialValues: RegisterFormValues = {
        name: "",
        surname: "",
        email: "",
        password: "",
        avatarIndex: 0,
    };
    const { currentUser, statusUser, errorUser } = useAppSelector((state) => state.user);
    const userEmails = currentUser.map(user => user.email);

    const handleRegister = async (values: RegisterFormValues) => {
        try {
            await dispatch(addUserData(values)).unwrap();
            Alert.alert("Başarılı", "Kayıt tamamlandı!");
            router.push("/pages/LoginPage" as any);
        } catch (error: any) {
            let errorMessage = "Bu email zaten kayıtlı!";

            // Axios hatası mı kontrol et
            if (axios.isAxiosError(error)) {
                // Backend'den gelen özel mesaj
                errorMessage = error.response?.data?.message || errorMessage;
            }

            // Kullanıcıya göster
            Alert.alert("Uyarı", errorMessage);
            //console.log("Kayıt hatası:", error);
        }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image style={styles.img} source={require("../../assets/images/signup.png")} />
            </View>

            <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleRegister}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldError }) => (
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="İsim"
                            placeholderTextColor="#666"
                            value={values.name}
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                        />
                        {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Soyisim"
                            placeholderTextColor="#666"
                            value={values.surname}
                            onChangeText={handleChange("surname")}
                            onBlur={handleBlur("surname")}
                        />
                        {touched.surname && errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#666"
                            keyboardType="email-address"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                        />
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Şifre"
                            placeholderTextColor="#666"
                            secureTextEntry
                            value={values.password}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                        />
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        <Text style={styles.avatarLabel}>Avatarını seç</Text>
                        <View style={styles.avatarContainer}>
                            {avatars.map((avatar, index) => (
                                <TouchableOpacity key={index} onPress={() => setFieldValue("avatarIndex", index)}>
                                    <Image
                                        source={avatar}
                                        style={[styles.avatar, values.avatarIndex === index && styles.selectedAvatar]}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        {touched.avatarIndex && errors.avatarIndex && <Text style={styles.errorText}>{errors.avatarIndex}</Text>}

                        <View style={styles.buttonContainer}>
                            <GeneralBtn color="#6661ebff" selfText="ÜYE OL" onPress={handleSubmit as any} />
                            <View style={styles.loginRow}>
                                <Text>Zaten bir hesabınız mı var?</Text>
                                <TouchableOpacity onPress={() => router.push("/pages/LoginPage" as any)}>
                                    <Text style={{ color: "#6661ebff", marginHorizontal: 5 }}>Giriş</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    header: {
        alignItems: "center",
        margin: 30,
    },
    img: {
        width: 180,
        height: 180,
        marginBottom: 15,
    },
    formContainer: {
        width: "100%",
        alignItems: "center",
        gap: 15,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    avatarLabel: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    avatarContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 10,
        gap: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "transparent",
    },
    selectedAvatar: {
        borderColor: "#6661ebff",
        transform: [{ scale: 1.1 }],
    },
    buttonContainer: {
        marginTop: 30,
        alignItems: "center",
        width: "100%",
    },
    loginRow: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    errorText: {
        color: "#b94e4eff",
        marginBottom: 5,
        alignSelf: "flex-start",
        marginLeft: 15,
    },
});
