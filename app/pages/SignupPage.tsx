import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import GeneralBtn from "../components/GeneralBtn";
import { useRouter } from 'expo-router'
import { avatars } from "../../types/avatarMap"


export default function RegisterPage() {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
    const router = useRouter();


    // const avatars = [
    //     require("../../assets/images/man1.png"),
    //     require("../../assets/images/man2.png"),
    //     require("../../assets/images/man3.png"),
    //     require("../../assets/images/man4.png"),
    //     require("../../assets/images/woman1.png"),
    //     require("../../assets/images/woman2.png"),
    //     require("../../assets/images/woman3.png"),
    //     require("../../assets/images/woman4.png"),
    // ];

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
                    placeholder="Name"
                    placeholderTextColor="#666"
                />
                <TextInput
                    style={styles.input}
                    value={surname}
                    onChangeText={setSurname}
                    placeholder="Surname"
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
                    placeholder="Password"
                    placeholderTextColor="#666"
                    secureTextEntry
                />

                <Text style={styles.avatarLabel}>Choose your avatar</Text>
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
                <GeneralBtn color="#6661ebff" selfText="REGISTER" />
                <View style={styles.loginRow}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/pages/LoginPage")}>
                        <Text style={{ color: "#6661ebff" }}> Login</Text>
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
