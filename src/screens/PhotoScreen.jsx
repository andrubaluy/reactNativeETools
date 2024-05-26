import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../constants/colors';
import * as ExpoLibrary from "expo-media-library";
import modalStyles from '../constants/modalStyles'
import { useGetProfileImageQuery, usePostProfileImageMutation } from "../services/shopServices";
import { useDispatch, useSelector } from 'react-redux';
import {setCameraImage} from '../features/user/userSlice'

const PhotoScreen = ({ navigation }) => {
    const [photoLocation, setPhotoLocation] = useState(null);
    const [image, setImage] = useState(null);
    const { localId } = useSelector(state => state.auth.value)
    const dispatch = useDispatch()
    const { data: imageFromBase } = useGetProfileImageQuery(localId);
    const [isImageFromCamera, setIsImageFromCamera] = useState(false);

    const [triggerPostImage, result] = usePostProfileImageMutation()

    const handleTakePicture = async () => {
        // Ask for camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Permisions were rejected. We need access to the camera to take a picture.');
            return;
        }

        // Launch the camera
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,
            quality: 0.2
        });
        
        if (!result.canceled) {            
            setIsImageFromCamera(true);
            setPhotoLocation(result.assets[0].uri);
            const image = `data:image/jpeg;base64,${result.assets[0].base64}`
            setImage(image)
        }
    };

    const handleCancel = () => {
        navigation.goBack()
    }

    const handleConfirm = async () => {
        try {
            dispatch(setCameraImage(image))
            triggerPostImage({image, localId})
            if (isImageFromCamera) {
                const result = await ExpoLibrary.createAssetAsync(imageURI)
            }
            navigation.goBack()
        } catch (error) {
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {photoLocation ? (
                    <Image source={{ uri: image || imageFromBase?.image }} style={styles.image} />
                ) : (
                    <View style={styles.noImageContainer}>
                        <Text style={styles.noImageText}>No picture taken</Text>
                    </View>
                )}
            </View>
            <View style={modalStyles.modalButtonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                    <Text style={styles.buttonText}> Take Photo </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
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
    imageContainer: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    noImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImageText: {
        color: '#ccc',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default PhotoScreen;
