import React, { useState } from "react";
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, ActivityIndicator } from "react-native";
import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { colors } from "../constants/colors";

const ItemDetail = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { productId: idSelected } = route.params;
    const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected);
    const { width, height } = useWindowDimensions();
    const isPortrait = width < height;

    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddCart = () => {
        // dispatch(addToCart({ ...product, quantity })); // Dispatch the action to add product to cart with quantity
        setModalVisible(false);
        console.log(`Product added to cart. Amount ${quantity}`);
    };

    return (
        <View style={styles.container}>
            <Button onPress={() => navigation.goBack()} title="Go back" />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text>Error loading product</Text>
            ) : product ? (
                <View style={isPortrait ? styles.mainContainer : styles.mainContainerLandscape}>
                    <Image
                        source={{ uri: product.img }}
                        style={isPortrait ? styles.image : styles.imageLandscape}
                        resizeMode="cover"
                    />
                    <View style={isPortrait ? styles.textContainer : styles.textContainerLandscape}>
                        <Text style={{ ...styles.textFamily, textDecorationLine: "underline" }}>{product.name}</Text>
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
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Select Quantity</Text>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity onPress={() => setQuantity(prev => Math.max(prev - 1, 1))}>
                                <Text style={styles.counterButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.counterText}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(prev => prev + 1)}>
                                <Text style={styles.counterButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalButtonContainer}>
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
    },
    buttonStyle: {
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.transparentBackground,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    counterContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    counterButton: {
        fontSize: 30,
        paddingHorizontal: 20,
    },
    counterText: {
        fontSize: 20,
        marginHorizontal: 10,
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});