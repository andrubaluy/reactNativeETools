import { StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors";

const Orders = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text> Orders</Text>
        </View>
    )
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