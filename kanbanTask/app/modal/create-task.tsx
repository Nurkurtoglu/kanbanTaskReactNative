import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
    TextInput,
    Alert
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import GeneralBtn from "../../components/GeneralBtn";
import { Task } from "../../types/task";
import { LogBox } from 'react-native';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserData } from "../../store/apiwithThunks/usersApi";
import { addTaskData } from "../../store/apiwithThunks/tasksApi";
import { User } from '@/types/user';
import { loadUserFromStorage } from "../../store/slices/authSlice"


LogBox.ignoreLogs(['SafeAreaView has been deprecated']);


interface CreateTaskModalProps {
    handleClose: () => void;
}

export default function CreateTaskModal({ handleClose }: CreateTaskModalProps) {


    const dispatch = useAppDispatch();
    const { user: currentUser, token } = useAppSelector(state => state.auth);
    const { currentUser: usersList } = useAppSelector(state => state.user);



    // kullanıcıdan alınan veriler ve sonrasında veritabanına atılacak veriler işte.
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [valueStatus, setValueStatus] = useState<string | null>(null);
    const [assigneeIds, setAssigneeIds] = useState<string[]>([]);

    const [openStatus, setOpenStatus] = useState<boolean>(false);
    const [itemsStatus, setItemsStatus] = useState([
        { label: 'Todo', value: 'todo' },
        { label: 'Backlog', value: 'backlog' },
        { label: 'Inprogress', value: 'Inprogress' },
    ]);


    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        dispatch(loadUserFromStorage());
    }, [dispatch]);


    // Kullanıcıları getir
    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    // Dropdown için items hazırla
    useEffect(() => {
        if (usersList) {
            const dropdownItems = usersList
                .filter((user: User) => currentUser ? user.id !== currentUser.id : true)
                .map((user: User) => ({
                    label: user.name,
                    value: user.id
                }));
            setItems(dropdownItems);
        }
    }, [usersList]);


    const handleCreateTask = () => {
        if (!title.trim() || !description.trim() || !valueStatus) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
            return;
        }

        if (!currentUser) {
            Alert.alert("Hata", "Kullanıcı bilgisi bulunamadı!");
            return;
        }

        // Backend fonksiyonun beklediği şekilde sadece string id listesi gönderiyoruz
        dispatch(addTaskData({
            title,
            description,
            status: valueStatus,
            assignees: assigneeIds as any, // string[] id listesi
            created_by: currentUser.id
        }))
            .unwrap()
            .then(() => {
                Alert.alert("Bilgi", "Görev başarıyla eklendi!");
                setTitle('');
                setDescription('');
                setValueStatus(null);
                setAssigneeIds([]);
            })
            .catch(err => {
                Alert.alert("Hata", "Görev eklenemedi: " + err);
            });
    };


    return (
        <Modal
            visible={true}
            animationType="slide"
            transparent
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.content}>
                        <Text style={styles.label}>Durum</Text>
                        <DropDownPicker
                            open={openStatus}
                            value={valueStatus}
                            items={itemsStatus}
                            setOpen={setOpenStatus}
                            setValue={setValueStatus}
                            setItems={setItemsStatus}
                            placeholder="Durum seçin"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                            listMode="SCROLLVIEW"
                        />
                        <Text style={styles.label}>Görev Başlığı</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Görev başlığını girin"
                        />

                        <Text style={styles.label}>Açıklama</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Görev açıklamasını girin"
                            multiline
                        />
                        <DropDownPicker
                            multiple={true}
                            min={0}
                            max={5}
                            open={open}
                            value={assigneeIds}
                            items={items}
                            setOpen={setOpen}
                            setValue={setAssigneeIds}
                            setItems={setItems}
                            placeholder="İsim seçin"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                            listMode="SCROLLVIEW"
                        />
                        <GeneralBtn handleCreateTask={handleCreateTask} color="red" selfText="Kaydet" />

                    </ScrollView>
                </View>
            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '95%',
        height: 650,
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        fontSize: 20,
        color: '#666',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    dropdown: {
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,

    },
    dropdownContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        height: 150
    },
});