import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken'); // Replace 'userToken' with your actual key
            await AsyncStorage.removeItem('user'); 
            console.log('Token removed, user logged out');
            // Reset navigation to avoid going back to a secured page after logging out
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Failed to remove the token', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <Button
                title="Logout"
                onPress={handleLogout}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default Profile;
