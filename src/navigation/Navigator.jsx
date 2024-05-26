import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native";
import MenuBarNavigator from "./MenuBarNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector } from "react-redux";
import { getSession } from "../persistence";

export default function Navitagor() {

    const {user} = useSelector(state => state.auth.value)

    useEffect(()=> {
        (async ()=> {
          try {
            const response = await getSession()
            if (response.rows._array.length) {
              const user = response.rows._array[0]
              dispatch(setUser({
                email: user.email,
                localId: user.localId,
                idToken: user.token
              }))
            }
          } catch (error) {
            console.log(error);
          }
        })()
      }, [])
    return (
        <NavigationContainer>
            {user ? <MenuBarNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    )
}