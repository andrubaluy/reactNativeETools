import React from "react";
import CategoryHome from "../screens/CategoryHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemListCategory from "../screens/ItemListCategory";
import ItemDetail from "../screens/ItemDetail";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator()


export default function AuthStackNavigator() {
    return (<Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen component={LoginScreen} name="LogIn" />
        <Stack.Screen component={SignupScreen} name="SignUp" />
    </Stack.Navigator>)

}