import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { colors } from "../constants/colors"
import Card from "./Card"
import {useDispatch, useSelector} from 'react-redux'
import { setCategorySelected } from "../features/Shop/shopSlice"

const CategoryItem = ({ category, navigation }) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setCategorySelected(category))
    navigation.navigate('ItemListCategory', {category})
  }

  return (
    <Card style={styles.card}>
      <Pressable onPress={handleNavigate}>
        <Text style={styles.text}>{category}</Text>
      </Pressable>
    </Card>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  text: {
    color: colors.color200,
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'Callingstone'
  },
  card: {
    backgroundColor: colors.color900, 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, 
    marginVertical: 10, 
    marginHorizontal: 10,
    height: 130
  }
})
