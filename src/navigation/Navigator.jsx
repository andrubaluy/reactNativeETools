import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import MenuBarNavigator from "./MenuBarNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector } from "react-redux";

export default function Navitagor() {

    const {user} = useSelector(state => state.auth.value)

    return (
        <NavigationContainer>
            {user ? <MenuBarNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    )
}