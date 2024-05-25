import React, { useState } from "react";
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, ActivityIndicator } from "react-native";
import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { colors } from "../constants/colors";
import { addToCart } from "../features/Cart/cartSlice";
import modalStyles from "../constants/modalStyles"

const ItemDetail = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { productId: idSelected } = route.params;
    const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected);
    const { width, height } = useWindowDimensions();

    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddCart = () => {
        dispatch(addToCart({ ...product, quantity })); 
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Button onPress={() => navigation.goBack()} title="Go back" />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text>Error loading product</Text>
            ) : product ? (
                <View style={styles.mainContainer}>
                    <Image
                        source={{ uri: product.img }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={{ ...styles.textFamily}}>{product.name}</Text>
                        <Text style={styles.textFamily}>{product.description}</Text>
                        <Text style={{ ...styles.price, ...styles.textFamily }}>${product.price.toFixed(2)}</Text>
                    </View>
                    <Button style={styles.buttonStyle} title="Add to cart" onPress={() => setModalVisible(true)}></Button>
                </View>
            ) : null}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.modalText}>Select Quantity</Text>
                        <View style={modalStyles.counterContainer}>
                            <TouchableOpacity onPress={() => setQuantity(prev => Math.max(prev - 1, 1))}>
                                <Text style={modalStyles.counterButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={modalStyles.counterText}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(prev => prev + 1)}>
                                <Text style={modalStyles.counterButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={modalStyles.modalButtonContainer}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            <Button title="Add" onPress={handleAddCart} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ItemDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.color400,
    },
    mainContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginTop: 20,
        fontFamily: "Callingstone",
    },
    mainContainerLandscape: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 10,
        gap: 10,
    },
    image: {
        width: '80%',
        height: 250,
        alignContent: "center",
    },
    imageLandscape: {
        width: '45%',
        height: 200,
    },
    textContainer: {
        flexDirection: "column",        
    },
    textContainerLandscape: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 10,
    },
    price: {
        textAlign: 'right',
        width: '100%',
    },
    textFamily: {
        fontFamily: "Callingstone",
        fontSize: 15,
        fontWeight: "bold",
        color: colors.color200,
    },
    buttonStyle: {
        marginTop: 10,
    },
    
});