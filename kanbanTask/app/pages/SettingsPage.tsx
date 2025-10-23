import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logoutUser } from "../../store/slices/authSlice"
import { updateUserData } from "@/store/apiwithThunks/usersApi"
import { avatars } from "../../types/avatarMap"
import { Snackbar } from "react-native-paper";



export default function SettingsScreen() {
    const { user: authUser } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const router = useRouter()

    const [name, setName] = useState(authUser?.name || '');
    const [surname, setSurname] = useState(authUser?.surname || '');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(authUser?.email || '');
    const [selectedAvatar, setSelectedAvatar] = useState<number>(0);
    const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

    const handleLogout = async () => {
        await dispatch(logoutUser()).unwrap(); // AsyncStorage temizlenir
        router.replace('/pages/LoginPage'); // Kullanıcıyı login sayfasına yönlendir
    }


    const handleSave = async () => {
        if (!authUser?.id) {
            Alert.alert("Hata", "Kullanıcı bilgisi bulunamadı.");
            return;
        }

        try {
            await dispatch(
                updateUserData({
                    id: authUser.id,
                    name,
                    surname,
                    email,
                    ...(password ? { password } : {}), // Şifre girildiyse gönder
                    avatarIndex: selectedAvatar,
                })
            ).unwrap()
            setSnackbarVisible(true);

        } catch (error) {
            Alert.alert("Hata", "Kullanıcı güncellenemedi: " + error);
        }
    };
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image style={styles.img} source={require("../../assets/images/user.png")} />
            </View>

            <Text>İsim:</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} />
            <Text>Soyisim:</Text>
            <TextInput value={surname} onChangeText={setSurname} style={styles.input} />
            <Text>Yeni Şifreniz:</Text>
            <TextInput value={password} onChangeText={setPassword} style={styles.input} />
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} />
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
            <View style={styles.btnContainer} >
                <TouchableOpacity style={styles.saveSettingsBtn} onPress={handleSave}>
                    <Text style={styles.saveSettingsText}>Kaydet</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={[styles.saveSettingsBtn, { backgroundColor: "red", width: "50%" }]}>
                    <Text style={styles.saveSettingsText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
                {/* Snackbar */}
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={2000}
                    style={styles.snackbar}
                >
                    <Text style={{ color: "#fff" }}>✅ Görev başarıyla güncellendi!</Text>
                </Snackbar>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: 'white'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10, marginVertical: 10,
        borderRadius: 6
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
    snackbar: {
        backgroundColor: "#5A56E9",
        borderRadius: 8,
    },
    saveSettingsBtn: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        margin: 14,
        height: 45,
        width: "100%"
    },
    saveSettingsText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    header: {
        alignItems: "center",
        margin: 30,
    },
    img: {
        width: 120,
        height: 120,
        marginBottom: 15,
    },
    btnContainer: {
        alignItems: "center",
        justifyContent: "center"
    }
});
