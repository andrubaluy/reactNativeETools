import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersScreen from "../screens/Orders";

const Stack = createNativeStackNavigator()


export default function OrderStackNavigator() {
    return (<Stack.Navigator
        initialRouteName="ordersTab"
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen component={OrdersScreen} name="ordersTab" />
    </Stack.Navigator>)

}