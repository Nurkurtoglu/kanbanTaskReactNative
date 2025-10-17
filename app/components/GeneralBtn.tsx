import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


interface GenralBtnProps {
    handleCreateTask?: () => void,
    color: string,
    selfText: string
    onPress?: () => void;
}

export default function GeneralBtn({ handleCreateTask, color, selfText, onPress }: GenralBtnProps) {


    return (
        <View>
            <TouchableOpacity style={[styles.createButton, { backgroundColor: color }]} onPress={() => {
                handleCreateTask?.();
                onPress?.();
            }}>
                <Text style={styles.createButtonText}>{selfText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    createButton: {
        backgroundColor: '#f30010ff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',

    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
})