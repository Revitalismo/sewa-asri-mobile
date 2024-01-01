import { useRef, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Header, Input, Button } from "./../../components";

import { neutral } from "../../constants/colors";

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useSend, useVerification } from "./../../hooks/useOTP";

interface Message {
    showMessage: boolean,
    name: string
}

type RouteParams = {
    email: string;
};

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function VerificationRegister() {
    const route = useRoute<RouteProp<ParamListBase, string>>();
    const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();
    
    const otpRef = useRef<string | number>(0);
    const { email } = route.params as RouteParams;

    const { sendOTP, isSending } = useSend();
    const { verifyOtp, isVerifying } = useVerification();

    const [message, setMessage] = useState<Message>({
        showMessage: false,
        name: ""
    });

    console.info(isSending, " - ", isVerifying);

    function onVerification() {
        const otpString = otpRef.current.toString();

        if (otpString.length === 6) {  
            const otp = Number.parseInt(otpString);

            verifyOtp({ otp: otp })

            .then((response) => {
                if (response.result === 0) {
                    setMessage({
                        showMessage: true,
                        name: "Kode verifikasi yang kamu masukan salah"
                    });
                } 
                else {
                    navigation.navigate("create-password", {
                        email: email,
                        otp: otpRef.current
                    });
                }
            })
            
            .catch((error) => {
                console.info(error);
            });         
        }
        else if (otpString.length < 6) {
            setMessage({
                showMessage: true,
                name: "Kode verifikasi tidak boleh kurang dari 6 digit"
            });
        }
        else {
            setMessage({
                showMessage: true,
                name: "Kode verifikasi tidak lebih dari 6 digit"
            });
        } 
    }

    function onSendOtp() {
        sendOTP({ email: email })
        .then((response) => {
            console.info(response);
        })
        .catch((error) => {
            console.info(error);
        });   
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
                     label="Verifikasi email"
                     navigateTo="welcome"
                     />

            <View  style={styles.container}>

                <Image  source={require("./../../../assets/logo-small.png")} 
                        style={styles.logo}
                        />

                <View  style={styles.formLogin} >

                    <Text  style={styles.info} >
                        Kami telah mengirim kode verifikasi ke email yang anda masukan, silahkan cek kotak masuk atau folder spam.
                    </Text>

                    <Input  variant="number"
                            placeholder="623xxx"
                            required={true}
                            label="Kode verifikasi"
                            
                            onInputHandler={(text) => {
                                otpRef.current = text;
                            }}

                            showMessage={message.showMessage}
                            message={message.name}
                            />
                    
                    <View  style={styles.actions} >

                        <Button size="large" 
                                variant="primary"
                                label="Verifikasi"
                                state="active"
                                behavior="fill-container"

                                onPressHandler={() => {
                                    onVerification();
                                }}

                                isLoading={isVerifying}
                                />
                        
                        <Button size="large" 
                                variant="secondary"
                                label="Kirim ulang kode verifikasi"
                                state="disabled"
                                behavior="fill-container"

                                onPressHandler={() => {
                                    onSendOtp();
                                }}

                                isLoading={isSending}
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