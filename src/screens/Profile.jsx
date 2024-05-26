import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, Modal } from 'react-native';
import { colors } from "../constants/colors";
import modalStyles from '../constants/modalStyles'
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../features/user/userSlice';
import { useGetProfileImageQuery } from '../services/shopServices';
import { dropSessionsTable } from '../persistence';

const Profile = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { email, imageCamera, localId } = useSelector(state => state.auth.value);

    const { data: imageFromBase } = useGetProfileImageQuery(localId);
    const dispatch = useDispatch()

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleSave = () => {
        // Logic to save profile details
        toggleModal();
    };

    const handleLogout = async () => {
        try {
            const response = await truncateSessionsTable().then((response) => {
                dispatch(clearUser())
            })
                .catch((err) => {
                })
        } catch (error) {

        }
    }

    const handleTakePicture = () => {
        navigation.navigate("Take Picture")
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: imageFromBase?.image || imageCamera }} style={styles.profileImage} />
            <Text style={styles.email}>{email}</Text>
            <View style={modalStyles.modalButtonContainer}>
                <Button style={styles.button} title="Take Picture" onPress={handleTakePicture} />
                <Button style={styles.button} title="Sign Out" onPress={handleLogout} />
            </View>


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.color400,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        marginTop: 10
    }
});

export default Profile