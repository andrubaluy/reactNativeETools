import { Image, StyleSheet, Text, Pressable } from "react-native"
import React from "react"
import Card from "./Card"
import { colors } from "../constants/colors"
import { useDispatch } from "react-redux"
import { setIdSelected } from "../features/Shop/shopSlice"

const OrderItem = ({
  order,
}) => {

  const dispatch = useDispatch()
  const getTotalUnitItems = () => {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }
  return (
    <Card style={styles.additionalStylesCard}>
      
        <Text style={styles.textCategory}>${order.total}</Text>
        <Text> { `Total Items: ${getTotalUnitItems()}`} </Text>
      
    </Card>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120,
    marginBottom: 10,
  },
  additionalStylesCard: {
    height: 180,
    width: 300,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2
  },
  textCategory: {
    width: "70%",
    color: colors.color200,
    fontFamily: 'Callingstone',
    textAlign: "center"
  },
  pressable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color400
  },
})
