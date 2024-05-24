import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useEffect, useState } from "react"
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../constants/colors"

const Search = ({ onSearch = () => { }, error = "", goBack = () => { } }) => {
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        if (keyword.length >= 2)
            onSearch(keyword);
    }, [keyword]);
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Product..."
                    value={keyword}
                    onChangeText={setKeyword}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

            </View>
            <Pressable onPress={() => onSearch(keyword)}>
                <Ionicons name="search-circle" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => setKeyword("")}>
                <MaterialCommunityIcons name="eraser" size={24} color="black" />
            </Pressable>
            <Pressable onPress={goBack}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 18,
        backgroundColor: colors.color600
    },
    inputContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'start',
        gap: 4,
        width: '70%'
    },
    input: {
        padding: 8,
        fontSize: 18,
        backgroundColor: colors.color600,
        color: colors.color900,
    },
    errorText: {
        color: 'tomato',
        fontSize: 14,
        fontFamily: 'Callingstone'
    }
})
