import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile";
import PhotoScreen from "../screens/PhotoScreen";

const Stack = createNativeStackNavigator()


export default function ProfileStackNavigator() {
    return (<Stack.Navigator
        initialRouteName="profileTab"
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen component={ProfileScreen} name="profileTab" />
        <Stack.Screen component={PhotoScreen} name="Take Picture" />
    </Stack.Navigator>)

}