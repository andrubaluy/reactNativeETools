import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import ProductItem from "../components/ProductItem"
import { useState, useEffect } from "react"
import { useGetProductsByCategoryQuery } from "../services/shopServices"

const ItemListCategory = ({
  setCategorySelected = () => {},
  navigation,
  route
}) => {
  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

   const {category: categorySelected} = route.params

  const {data: productsFetched, error: errorFromFetch, isLoading} = useGetProductsByCategoryQuery(categorySelected)

  useEffect(() => {
    //Products filtered by category

    //No digits validation
    const regexDigits = /\d/
    const hasDigits = regexDigits.test(keyWord)
    if (hasDigits) {
      setError("Don't use digits")
      return
    }
    //3 or more characters
    const regexThreeOrMore = /[a-zA-Z]{3,}/
    const hasThreeOrMoreChars = regexThreeOrMore.test(keyWord)

    if (!hasThreeOrMoreChars && keyWord.length) {
      setError("Type 3 or more characters")
      return
    }

    // Product filtered by name
    if (!isLoading) {
      const productsFilter = productsFetched.filter((product) =>
        product.name.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
      )
      setProductsFiltered(productsFilter)
      setError("")
    }
  }, [keyWord,  productsFetched, isLoading])

  return (
    <View style={styles.flatListContainer}>
      
      <FlatList
        data={productsFiltered}
        renderItem={({ item }) => (
          <ProductItem product={item} navigation={navigation}/>
        )}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.color400,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
})
