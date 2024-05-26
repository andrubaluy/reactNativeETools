import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
import { useSignUpMutation } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import { insertSession } from "../persistence"

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch()

    const [triggerSignUp, result] = useSignUpMutation()

    useEffect(() => {
        console.log("useEffect", result);
        if (result.isSuccess) {
            insertSession({
                email: result.data.email,
                localId: result.data.localId,
                token: result.data.idToken,
            })
                .then((response) => {
                    dispatch(
                        setUser({
                            email: result.data.email,
                            idToken: result.data.idToken,
                            localId: result.data.localId
                        })
                    )
                })
                .catch((err) => {
                    setErrorMessage("Unhandled error");
                })
        }
        if (result.isError) {
            const retMsg = result.error.data.error.message
            setErrorMessage(retMsg);
        }
    }, [result])

    const handleSignup = () => {
        setErrorMessage('');
        // Validate email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValidEmail = regexEmail.test(email)
        if (!isValidEmail) {
            setErrorMessage('Please enter a valid email address');
            return
        }

        if (!password) {
            setErrorMessage('Password is required');
            return;
        }
        // Validate password 
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        //Firebase authentication
        triggerSignUp({ email, password, returnSecureToken: true });

    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            {result.isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Sign Up" onPress={handleSignup} />
            )}
            <Text style={styles.infoText}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate("LogIn")}>
                <Text style={styles.subLink}>Sign In</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.color400,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: colors.color200,
        fontFamily: "Callingstone"
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
        fontFamily: "Callingstone"
    },
    infoText: {
        marginTop: 15,
        fontSize: 14,
        color: colors.color200,
        fontFamily: "Callingstone"

    },
    subLink: {
        marginTop: 10,
        fontSize: 14,
        color: colors.color600,
        fontFamily: "Callingstone"
    }
});

export default SignupScreen;