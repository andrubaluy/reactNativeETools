import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import React from "react"
import { useGetProductByIdQuery } from "../services/shopServices"
import { useDispatch } from "react-redux"

const ItemDetail = ({ route, navigation }) => {

    const dispatch = useDispatch()

    const { productId: idSelected } = route.params

    const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected)

    const handleAddCart = () => {
        console.log("Product added to cart")
    }

    return (
        <View>
            <Button onPress={() => navigation.goBack()} title="Go back" />
            {product ? (
                <View
                    style={styles.mainContainer}
                >
                    <Image
                        source={{ uri: product.img }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.textFamily}>{product.name}</Text>
                        <Text style={styles.textFamily}>{product.description}</Text>
                        <Text style={{...styles.price, ...styles.textFamily}}>${product.price.toFixed(2)}</Text>
                       
                    </View>
                    <Button style={styles.buttonStyle} title="Add cart" onPress={handleAddCart}></Button>
                </View>
            ) : null}
        </View>
    )
}

export default ItemDetail

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginTop: 20,
        fontFamily: "Callingstone"
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
        alignContent: "center"
    },
    imageLandscape: {
        width: '45%',
        height: 200
    },
    textContainer: {
        flexDirection: "column"
    },

    textContainerLandscape: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        gap: 10,
    },
    price: {
        textAlign: 'right',
        width: '100%',
        
    },
    textFamily:{
        fontFamily: "Callingstone",
        fontSize: 15,
        fontWeight: "bold"
    },
    buttonStyle:{

    }
})
