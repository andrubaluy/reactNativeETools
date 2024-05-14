import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import MenuBarNavigator from "./MenuBarNavigator";

export default function Navitagor() {
    return (
        <NavigationContainer>
            <MenuBarNavigator/>
        </NavigationContainer>
    )
}