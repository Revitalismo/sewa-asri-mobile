import { useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Header, Input, Button } from "./../../components";

import { neutral } from "../../constants/colors";

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useLogin } from "../../hooks/useAuth";
import { setAuth, setUserId } from "./auth";

interface ParamListBase {
    [routeName: string]: object | undefined;
}

interface Message {
    showMessage: boolean,
    name: string | ""
}

export function Login() {    
    const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

    const [message, setMessage] = useState<Message>({
        showMessage: false,
        name: ""
    });

    console.info("Re-render Login.tsx");
       
    const emailRef = useRef<string>("");
    const passwordRef = useRef<string>("");

    const { login, isLoading } = useLogin();

    function onLogin(email:string, password:string) {
        if (email.length > 0 && password.length > 0) {
            
            login({ email: email, password: password })
            .then((response) => {
                if (response?.status === "Success") {
                    setAuth({
                        token: response.token,
                        authenticated: true
                    });

                    setUserId(response.data.user._id);

                    navigation.navigate("home");
                }
                else if (response?.message === "Incorrect email or password") {
                    setMessage({
                        showMessage: true,
                        name: "Email atau password salah" 
                    });
                }
            });
        } 
        else {
            setMessage({
                showMessage: true,
                name: "Mohon isi email dan password" 
            });
        }
    }

    if (message.showMessage) {
        setTimeout(() => {
            setMessage({
                showMessage: false,
                name: ""
            });
        }, 2000);
    }

    return (
        <>
            <Header  variant="navigation"
                     label="Masuk"
                     navigateTo="welcome"
                     />

            <View  style={styles.container}>

                <Image  source={require("./../../../assets/logo-small.png")} 
                        style={styles.logo}
                        />

                <View  style={styles.formLogin}>

                    <Input  variant="email"
                            placeholder="mhabiberdian@mail.com"

                            onInputHandler={(text) => {
                                if (typeof text === "string") {
                                    emailRef.current = text;
                                }
                            }}
                            />

                    <Input  variant="password"
                            label="Password"
                            placeholder="julian1992"
                            required={false} 
                            
                            onInputHandler={(text) => {
                                if (typeof text === "string") {
                                    passwordRef.current = text;                                    
                                }
                            }}

                            showMessage={message.showMessage}
                            message={message.name}
                            />

                    
                    <Button size="large" 
                            variant="primary"
                            label="Masuk"
                            state="active"
                            behavior="fill-container"

                            onPressHandler={() => {
                                onLogin(emailRef.current, passwordRef.current);
                            }}

                            isLoading={isLoading}
                            />
                    
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        paddingTop: 32,
        paddingHorizontal: 16,
        
        backgroundColor: neutral[0],

        flex: 1,
        rowGap: 28,
        alignItems: 'center'
    },

    logo: {
        height: 70,
        width: 70
    },

    formLogin: {
        rowGap: 24,
        width: '100%'
    }
});