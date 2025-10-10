import { View, TouchableOpacity, StyleSheet, } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';

export default function TabBar() {
    return (
        <View style={styles.tabBar}>
            <TouchableOpacity>
                <Feather style={{ margin: 25 }} name="home" size={26} color="black" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    tabBar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f9f9f9',
        borderTopWidth: 0.5,
        borderColor: '#ddd',
        height: 100,
        paddingBottom: 8,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 20,
    }

})