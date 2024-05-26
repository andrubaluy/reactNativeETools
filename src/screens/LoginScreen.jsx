import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { useSignInMutation } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch()

    const [triggerSignIn, result] = useSignInMutation()

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken,
                    localId: result.data.localId
                })
            )
        }
        if(result.isError){
            if(result.error.data.error.message == "INVALID_LOGIN_CREDENTIALS"){
                setErrorMessage("Invalid email or password");
            }else{
                setErrorMessage(result.error.data.error.message);
            }
        }
    }, [result])

    const handleLogin = () => {
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
        //Firebase authentication
        try {
            triggerSignIn({ email, password });
        } catch (ex) {
            setErrorMessage(ex.message);
        }

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

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            {result.isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Sign In" onPress={handleLogin} />
            )}            
            <Text style={styles.infoText}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.subLink}>Create Account</Text>
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
        marginTop:10,
        fontSize: 14,
        color: colors.color600,
        fontFamily: "Callingstone"
    }
});

export default LoginScreen;