import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { colors } from "../constants/colors"
import CategoryStackNavigator from "./CategoryStackNavigator"
import { StyleSheet, View } from 'react-native';
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import CartStackNavigator from "./CartStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import OrderStackNavigator from "./OrderStackNavigator";

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
                                    color={focused ? colors.platinum : "black"}
                                />
                            </View>
                        )
                    },
                }}
                />
            <Tab.Screen
                name="Cart"
                component={CartStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="shopping-basket"
                                    size={24}
                                    color={focused ? colors.platinum : "black"}
                                />
                            </View>
                        )
                    },
                }}
                />
            <Tab.Screen
                name="Orders"
                component={OrderStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="money-check"
                                    size={24}
                                    color={focused ? colors.platinum : "black"}
                                />
                            </View>
                        )
                    },
                }}
                />
                <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <MaterialIcons
                                    name="account-circle"
                                    size={26}
                                    color={focused ? colors.platinum : "black"}
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