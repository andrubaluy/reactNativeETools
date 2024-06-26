import React from "react";
import CategoryHome from "../screens/CategoryHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemListCategory from "../screens/ItemListCategory";
import ItemDetail from "../screens/ItemDetail";

const Stack = createNativeStackNavigator()


export default function CategoryStackNavigator () {
    return(<Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen component={CategoryHome} name="Home" />
        <Stack.Screen
            component={ItemListCategory}
            name="ItemListCategory"
        />
        <Stack.Screen component={ItemDetail} name="ItemDetail" />
    </Stack.Navigator>)

}