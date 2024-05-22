import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { colors } from "../constants/colors"
import CategoryStackNavigator from "./CategoryStackNavigator"
import { StyleSheet, View } from 'react-native';
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

export default function MenuBarNavigator () {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            })}
        >
            <Tab.Screen
                name="Shop"
                component={CategoryStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="shopify"
                                    size={24}
                                    color={focused ? "black" : colors.teal400}
                                />
                            </View>
                        )
                    },
                }}
                />
            <Tab.Screen
                name="Cart"
                component={CategoryStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="shopping-basket"
                                    size={24}
                                    color={focused ? "black" : colors.teal600}
                                />
                            </View>
                        )
                    },
                }}
                />
            <Tab.Screen
                name="Orders"
                component={CategoryStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="money-check"
                                    size={24}
                                    color={focused ? "black" : colors.teal600}
                                />
                            </View>
                        )
                    },
                }}
                />
                <Tab.Screen
                name="Account"
                component={CategoryStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <MaterialIcons
                                    name="account-circle"
                                    size={26}
                                    color={focused ? "black" : colors.teal600}
                                />
                            </View>
                        )
                    },
                }}
                />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.color200,
        shadowColor: "black",
        elevation: 4,
        borderRadius: 0,
        height: 60,
    }
})