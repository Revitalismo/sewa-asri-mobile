import { useState, useRef } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Header, Input, Button } from "./../../components";

import { neutral } from "../../constants/colors";
import { useForgotPassword } from "../../hooks/useAuth";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, Message } from "../../utils/interface";

export function ForgotPassword() {    
    const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();

    const emailRef = useRef<string>("");
    
    const [message, setMessage] = useState<Message>({
        showMessage: false,
        name: ""
    });

    const { isLoading, forgotPassword } = useForgotPassword();

    function onForgotPassword() {
        if (emailRef.current.length > 0) {
            forgotPassword({ email: emailRef.current })

            .then((response) => {
                if (response.message === "There is no user with email address.") {
                    navigation.navigate("verification-register", {
                        email: emailRef.current
                    });
                }
                else {
                    setMessage({
                        showMessage: true,
                        name: "Email yang kamu masukan tidak terdaftar"
                    });
                }
            })

            .catch((error) => {
                console.info(error);
                setMessage({
                    showMessage: true,
                    name: "Ada kesalahan di server, mohon coba beberapa saat lagi"
                });
            });
        }
        else {
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
                     label="Lupa password"
                     navigateTo="goBack"
                     />

            <View  style={styles.container}>

                <Image  source={require("./../../../assets/logo-small.png")} 
                        style={styles.logo}
                        />

                <View  style={styles.formLogin} >

                    <Text  style={styles.info} >
                        Masukan alamat email agar kami dapat mengirim kode verifikasi ke email yang anda masukan.
                    </Text>

                    <Input  variant="email"
                            placeholder="habib@example.com"
                            required={true}
                            label="Email"
                            
                            onInputHandler={(text) => {
                                if (typeof text === "string") {
                                    emailRef.current = text;
                                }
                            }}

                            showMessage={message.showMessage}
                            message={message.name}
                            />
                    
                    <View  style={styles.actions} >

                        <Button size="large" 
                                variant="primary"
                                label="Kirim kode verifikasi ke email"
                                state="active"
                                behavior="fill-container"

                                onPressHandler={() => {
                                    onForgotPassword();
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