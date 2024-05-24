import { Image, StyleSheet, Text, Pressable } from "react-native"
import React from "react"
import Card from "./Card"
import { colors } from "../constants/colors"
import { useDispatch } from "react-redux"
import { setIdSelected } from "../features/Shop/shopSlice"

const ProductItem = ({
  product,
  setProductSelected = () => {},
  navigation,
}) => {

  const dispatch = useDispatch()
  const handleNavigate = () => {
    dispatch(setIdSelected(product.title))
    navigation.navigate('ItemDetail', {productId: product.id})
  }
  return (
    <Card style={styles.additionalStylesCard}>
      <Pressable
        style={styles.pressable}
        onPress={handleNavigate}
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: product.img }}
        />
        <Text style={styles.textCategory}>{product.name}</Text>
        
      </Pressable>
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120,
    marginBottom: 10,
  },
  additionalStylesCard: {
    height: 180,
    width: 250,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCategory: {
    width: "70%",
    color: colors.color200,
    fontFamily: 'Callingstone'
  },
  pressable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color400
  },
})
