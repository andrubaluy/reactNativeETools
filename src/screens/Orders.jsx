import { StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-web";
import OrderItem from "../components/OrderItem";

const Orders = ({ navigation }) => {
    const { user, localId } = useSelector(state => state.auth.value);
    const { data: ordersFromDb, error: errorFromFetch, isLoading } = useGetOrdersByUserQuery(user)


    if (isLoading) {
        return (<Text>Loading...</Text>)
    } else {
        const filteredOrders = ordersFromDb.filter((order) => order.user == user);
        return (
            <>
                {isLoading ? <Text> Loading </Text> :
                    <View style={styles.container}>
                        <FlatList
                            data={filteredOrders}
                            renderItem={({ item }) => (
                                <OrderItem order={item} />
                            )}
                            keyExtractor={(order) => order.timestamp}
                        />
                    </View>}
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.color400,
    }
});


export default Orders