import { useRef, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Header, Input, Button } from "./../../components";

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useResetPassword } from "../../hooks/useAuth";
import { setAuth, setUserId } from "./auth";

import { neutral } from "../../constants/colors";

import { Message, ParamListBase } from "../../utils/interface";
import { OtpRouteParams } from "../../utils/types";

interface PasswordRef {
    password: string;
    passwordConfirm: string;
}

export function ResetPassword() {
    const route = useRoute<RouteProp<ParamListBase, string>>();
    const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

    const { resetPassword, isLoading } = useResetPassword();

    const { otp } = route.params as OtpRouteParams;

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
            resetPassword({
                password: passwordRef.current.password,
                passwordConfirm: passwordRef.current.passwordConfirm,
                token: otp
            })

            .then((response) => {
                if (response.status === "Success") {
                    console.info(response);
                    // setAuth({
                    //     authenticated: true,
                    //     token: response.token
                    // });

                    // setUserId(response.data.user._id);

                    // navigation.navigate("home");
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
                     label="Reset password"
                     navigateTo="verification-forgot-password"
                     />

            <View  style={styles.container}>

                <Image  source={require("./../../../assets/logo-small.png")} 
                        style={styles.logo}
                        />

                <View  style={styles.formLogin} >

                    <Text  style={styles.info} >
                        Buat password baru yang berbeda dari password sebelumnya
                    </Text>

                    <Input  variant="password"
                            placeholder="ironSlayer"
                            required={true}
                            label="Buat password baru"
                            
                            onInputHandler={(text) => {
                                if (typeof text === "string") {
                                    passwordRef.current.password = text;                                    
                                }
                            }}
                            />

                    <Input  variant="password"
                            placeholder="ironSlayer"
                            required={true}
                            label="Ketik ulang password baru"
                            
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
                                label="Buat password baru"
                                state="active"
                                behavior="fill-container"

                                onPressHandler={() => {
                                    onCreatePassword();
                                }}

                                isLoading={isLoading}
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