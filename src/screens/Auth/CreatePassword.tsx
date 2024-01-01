import { useRef, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Header, Input, Button } from "./../../components";

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useRegister } from "../../hooks/useAuth";
import { setAuth, setUserId } from "./auth";

import { neutral } from "../../constants/colors";

interface Message {
    showMessage: boolean,
    name: string
}

interface PasswordRef {
    password: string;
    passwordConfirm: string;
}

type RouteParams = {
    email: string;
    otp: string;
};

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function CreatePassword() {
    const route = useRoute<RouteProp<ParamListBase, string>>();
    const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

    const { createAccount, isCreating } = useRegister();

    const { email, otp } = route.params as RouteParams;

    const passwordRef = useRef<PasswordRef>({
        password: "",
        passwordConfirm: ""
    });

    const [message, setMessage] = useState<Message>({
        showMessage: false,
        name: ""
    });
    
    function onCreatePassword() {
        if (passwordRef.current.password === passwordRef.current.passwordConfirm) {
            createAccount({
                name: `User ${email}`,
                email: email,
                password: passwordRef.current.password,
                otp: otp
            })

            .then((response) => {
                if (response.status === "Success") {
                    setAuth({
                        authenticated: true,
                        token: response.token
                    });

                    setUserId(response.data.user._id);

                    navigation.navigate("home");
                }
                else {
                    setMessage({
                        showMessage: true,
                        name: "Ada kesalahan di server, mohon coba beberapa saat lagi"
                    });
                }
            })

            .catch(() => {
                setMessage({
                    showMessage: true,
                    name: "Ada kesalahan di server, mohon coba beberapa saat lagi"
                });
            });
        } 
        else {
            setMessage({
                showMessage: true,
                name: "Password harus sama!"
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
                     label="Buat password"
                     navigateTo="welcome"
                     />

            <View  style={styles.container}>

                <Image  source={require("./../../../assets/logo-small.png")} 
                        style={styles.logo}
                        />

                <View  style={styles.formLogin} >

                    <Text  style={styles.info} >
                        Buat password yang mudah diingat dan sulit ditebak (minimal 8 karakter)
                    </Text>

                    <Input  variant="password"
                            placeholder="ironSlayer"
                            required={true}
                            label="Buat password"
                            
                            onInputHandler={(text) => {
                                if (typeof text === "string") {
                                    passwordRef.current.password = text;                                    
                                }
                            }}
                            />

                    <Input  variant="password"
                            placeholder="ironSlayer"
                            required={true}
                            label="Ketik ulang password"
                            
                            onInputHandler={(text) => {
                                if (typeof text === "string") {
                                    passwordRef.current.passwordConfirm = text;                                    
                                }
                            }}

                            showMessage={message.showMessage}
                            message={message.name}
                            />
                    
                    <View  style={styles.actions} >

                        <Button size="large" 
                                variant="primary"
                                label="Buat password"
                                state="active"
                                behavior="fill-container"

                                onPressHandler={() => {
                                    onCreatePassword();
                                }}

                                isLoading={isCreating}
                                />
                    </View>
                    
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
    },

    info: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 24,
        color: neutral[600],
    },

    actions: {
        rowGap: 16
    }
});