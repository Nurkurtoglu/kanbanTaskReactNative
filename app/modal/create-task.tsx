import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
    TextInput
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import GeneralBtn from "../components/GeneralBtn";
import { Task } from "../../types/task";
import { LogBox } from 'react-native';
import { useAppDispatch } from "../../store/hooks";
import { addTask } from "../../store/slices/tasksSlice";


LogBox.ignoreLogs(['SafeAreaView has been deprecated']);


interface CreateTaskModalProps {
    handleClose: () => void;
}

export default function CreateTaskModal({ handleClose }: CreateTaskModalProps) {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [valueStatus, setValueStatus] = useState<string | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [assignee, setAssignee] = useState<string[]>([]);
    const [items, setItems] = useState([
        { label: 'Alice', value: 'alice' },
        { label: 'Bob', value: 'bob' },
    ]);

    const [openStatus, setOpenStatus] = useState<boolean>(false);
    const [itemsStatus, setItemsStatus] = useState([
        { label: 'Todo', value: 'todo' },
        { label: 'Backlog', value: 'backlog' },
        { label: 'Inprogress', value: 'inprogress' },
    ]);

    const dispatch = useAppDispatch();




    const handleCreateTask = () => {
        if (!valueStatus) {
            alert("Lütfen bir durum seçin!");
            return;
        }

        if (!title.trim() || !description.trim()) {
            alert("Lütfen başlık ve açıklama girin!");
            return;
        }

        // Seçilen kullanıcıları assignee formatına çevir
        const selectedAssignees = assignee.map((name, index) => ({
            id: String(Date.now() + index),
            name,
            avatar: undefined
        }));

        const newTask: Task = {
            id: String(Date.now()),
            title,
            description,
            status: valueStatus,  // 👈 dikkat: valueStatus burada kullanılıyor
            assignee: selectedAssignees,
        };

        // Redux slice'a ekle
        dispatch(addTask(newTask));

        // Inputları sıfırla
        setTitle('');
        setDescription('');
        setAssignee([]);
        setValueStatus(null);
        alert("Görev başarıyla eklendi!");
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
                            value={assignee}
                            items={items}
                            setOpen={setOpen}
                            setValue={setAssignee}
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

    },
});