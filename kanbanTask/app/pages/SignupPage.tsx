import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import GeneralBtn from "../../components/GeneralBtn";
import { useRouter } from 'expo-router'
import { avatars } from "../../types/avatarMap"
import { useAppDispatch } from "@/store/hooks";
import { addUserData } from "@/store/apiwithThunks/usersApi";


export default function RegisterPage() {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [selectedAvatar, setSelectedAvatar] = useState<number>(0);
    const router = useRouter();

    const dispatch = useAppDispatch();


    const newUser = {
        name,
        surname,
        email,
        password,
        avatarIndex: selectedAvatar
    }

    const createAnAcoount = async () => {
        if (!name || !surname || !email || !password) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            await dispatch(addUserData(newUser)).unwrap();
            Alert.alert("Başarılı", "Kayıt işlemi tamamlandı!");
            setName("");
            setSurname("");
            setEmail("");
            setPassword("");
            setSelectedAvatar(0);

            router.push("/pages/LoginPage" as any);
        } catch (error) {
            console.error("Kayıt hatası:", error);
            Alert.alert("Hata", "Hesap oluştururken hata oluştu.");
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image style={styles.img} source={require("../../assets/images/signup.png")} />
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="İsim"
                    placeholderTextColor="#666"
                />
                <TextInput
                    style={styles.input}
                    value={surname}
                    onChangeText={setSurname}
                    placeholder="Soyisim"
                    placeholderTextColor="#666"
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor="#666"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Şifre"
                    placeholderTextColor="#666"
                    secureTextEntry
                />

                <Text style={styles.avatarLabel}>Avatarını seç</Text>
                <View style={styles.avatarContainer}>
                    {avatars.map((avatar, index) => (
                        <TouchableOpacity key={index} onPress={() => setSelectedAvatar(index)}>
                            <Image
                                source={avatar}
                                style={[
                                    styles.avatar,
                                    selectedAvatar === index && styles.selectedAvatar,
                                ]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <GeneralBtn color="#6661ebff" selfText="ÜYE OL" onPress={createAnAcoount} />
                <View style={styles.loginRow}>
                    <Text>Zaten bir hesabınız mı var?</Text>
                    <TouchableOpacity onPress={() => router.push("/pages/LoginPage" as any)}>
                        <Text style={{ color: "#6661ebff", marginHorizontal: 5 }}>Giriş</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#6661ebff",
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
});
