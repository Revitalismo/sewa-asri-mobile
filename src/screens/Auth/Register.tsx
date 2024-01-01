import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Header, Input, Button } from "./../../components";

import { neutral } from "../../constants/colors";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSend } from "../../hooks/useOTP";

interface Message {
    showMessage: boolean,
    name: string
}

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function Register() {
    const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();

    const [message, setMessage] = useState<Message>({
        showMessage: false,
        name: ""
    });

    const { sendOTP, isSending } = useSend();
    const emailRef = useRef<string>("");

    console.info("Re-render Register.tsx")
    
    function onSendOtp() {
        if (emailRef.current.length > 0) {
            sendOTP({ email: emailRef.current })
            .then((response) => {
                if (response.success) {
                    navigation.navigate("verification-register", {
                        email: emailRef.current
                    });
                } 
                else if (response.message === "Email already exist!") {
                    setMessage({
                        showMessage: true,
                        name: "Email sudah pernah digunakan"
                    });
                }
            });
        } else {
            setMessage({
                showMessage: true,
                name: "Email tidak boleh kosong"
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
                     label="Buat akun"
                     navigateTo="welcome"
                     />

            <View  style={styles.container}>

                <Image  source={require("./../../../assets/logo-small.png")} 
                        style={styles.logo}
                        />

                <View  style={styles.formLogin}>

                    <Input  variant="email"
                            placeholder="habibjulian@mail.com"
                            required={true}
                            
                            onInputHandler={(text) => {
                                if (typeof text === "string") {
                                    emailRef.current = text;                                    
                                }
                            }}

                            showMessage={message.showMessage}
                            message={message.name}
                            />
                    
                    <Button size="large" 
                            variant="primary"
                            label="Buat akun"
                            state="active"
                            behavior="fill-container"

                            onPressHandler={() => {
                                onSendOtp();
                            }}
                            
                            isLoading={isSending}
                            />
                    
                </View>
            </View>

            <Text style={styles.termsCondition} >
                Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku.
            </Text>
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

    termsCondition: {
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 24,
        color: neutral[400],

        marginBottom: 20
    }
});