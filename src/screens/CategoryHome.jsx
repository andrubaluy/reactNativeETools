import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import CategoryItem from "../components/CategoryItem"
import { useGetCategoriesQuery } from "../services/shopServices"



const CategoryHome = ({ route, navigation}) => {
  const {data: categories, error, isLoading} = useGetCategoriesQuery()
  

  console.log(categories);

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item}
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem 
            navigation={navigation} 
            category={item} 
          />
        )}
      />
    </View>
  )
}

export default CategoryHome

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
