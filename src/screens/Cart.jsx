import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, StyleSheet, Button, Image, Modal, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { removeFromCart, addToCart, emptyCart } from '../features/Cart/cartSlice';
import modalStyles from '../constants/modalStyles'
import { usePostOrderMutation } from '../services/shopServices';

const CartScreen = ({ navigation }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [totalViewVisible, setTotalViewVisible] = useState(cartItems.length > 0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [isConfirmOrder, setIsConfirmOrder] = useState(false);
    const [triggerPostOrder, result] = usePostOrderMutation()
    const { user } = useSelector((state) => state.auth.value)

    const handleCheckout = () => {
        setIsConfirmOrder(true);
    }
    const handleCheckoutYes = () => {
        triggerPostOrder({items: cartItems, user: user, total: getTotal()});
        dispatch(emptyCart());
        setIsConfirmOrder(false);
    }
    const handleCheckoutNo = () => {
        setIsConfirmOrder(false);
    }

    const handleEditItem = (item) => {
        setSelectedItem(item);
        setQuantity(item.quantity);
        setModalVisible(true);
    };

    const handleUpdateQuantity = () => {
        dispatch(removeFromCart(selectedItem.id));
        if (quantity > 0) {
            dispatch(addToCart({ ...selectedItem, quantity }));
        }
        setModalVisible(false);
    };

    const handleCancelEdit = () => {
        setModalVisible(false);
    };

    const handleClearCart = () => {
        dispatch(emptyCart());
    }

    const getTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleEditItem(item)}>
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.img }} style={styles.itemImage} />
                <View style={styles.itemDescription}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetails}>{item.description}</Text>
                </View>
                <View style={styles.itemPricing}>
                    <Text style={styles.itemDetails}>Qty: {item.quantity}</Text>
                    <Text style={styles.itemDetails}>Price: ${item.price.toFixed(2)}</Text>
                    <Text style={styles.itemDetails}>Total: ${(item.quantity * item.price).toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity >
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
            />
            <View style={styles.totalContainer} visible={totalViewVisible}>
                {isConfirmOrder ?
                    <Text style={styles.totalText}>Are you sure you want to confirm the order? you will be charged: ${getTotal()}</Text>
                    :
                    <Text style={styles.totalText}>Total: ${getTotal()}</Text>
                }


                {isConfirmOrder ?
                    <>
                        <View style={modalStyles.modalButtonContainer}>
                            <Button title="Yes" onPress={handleCheckoutYes} />
                            <Button title="No" onPress={handleCheckoutNo} />
                        </View>
                    </> :
                    <>
                        {cartItems.length > 0 ? 
                        <View style={modalStyles.modalButtonContainer}>
                        <Button title="Checkout" onPress={handleCheckout} />
                        <Button title="Clear Cart" onPress={handleClearCart} />
                    </View>   : 
                        <Button title="Checkout" disabled={true} />}
                    </>}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.modalText}>Edit Quantity</Text>
                        <View style={modalStyles.counterContainer}>
                            <TouchableOpacity onPress={() => setQuantity(Math.max(quantity - 1, 0))}>
                                <Text style={modalStyles.counterButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={modalStyles.counterText}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                                <Text style={modalStyles.counterButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={modalStyles.modalButtonContainer}>
                            <Button title="Cancel" onPress={handleCancelEdit} />
                            <Button title="Edit" onPress={handleUpdateQuantity} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.color400,

    },
    itemContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
        alignItems: 'center',
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    itemDescription: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontFamily: "Callingstone",
        color: colors.color200
    },
    itemDetails: {
        fontSize: 12,
        fontFamily: "Callingstone",
        color: colors.color200
    },
    itemPricing: {
        alignItems: 'flex-end',
    },
    totalContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 16,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: "Callingstone",
        color: colors.color200
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        fontFamily: "Callingstone",
        color: colors.color200
    }
});