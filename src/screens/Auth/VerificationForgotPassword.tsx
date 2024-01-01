import { useState, useRef } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Header, Input, Button } from "../../components";

import { neutral } from "../../constants/colors";
import { useForgotPassword } from "../../hooks/useAuth";
import { useVerification } from "../../hooks/useOTP";
import { Message, ParamListBase } from "../../utils/interface";

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EmailRouteParams } from "../../utils/types";

export function VerificationForgotPassword() {
    const route = useRoute<RouteProp<ParamListBase, string>>();
    const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

    const { email } = route.params as EmailRouteParams;

    const otpRef = useRef<string | number>(0);
    
    const [message, setMessage] = useState<Message>({
        showMessage: false,
        name: ""
    });

    const { verifyOtp, isVerifying } = useVerification();
    const { isLoading:isForgotPasswordLoading, forgotPassword } = useForgotPassword();
    
    function onVerifyOtp() {
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
                    navigation.navigate("reset-password", {
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

    function onForgotPassword() {
        forgotPassword({ email: email })

        .then((response) => {
            if (response.status === "success") {
                navigation.navigate("verification-register", {
                    email: email
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

                <Text>
                    Kami telah mengirim kode verifikasi ke email yang anda masukan, silahkan cek kotak masuk atau folder spam.
                </Text>

                <View  style={styles.formLogin}>

                    <Input  variant="email"
                            placeholder="achmadjulian@mail.com"
                            required={true}
                            
                            onInputHandler={(text) => {
                                
                            }}
                            />
                    
                    <View  style={styles.actions} >

                        <Button size="large" 
                                variant="primary"
                                label="Verifikasi"
                                state="active"
                                behavior="fill-container"

                                onPressHandler={() => {
                                    onVerifyOtp();
                                }}

                                isLoading={isVerifying}
                                />
                        
                        <Button size="large" 
                                variant="secondary"
                                label="Kirim ulang kode verifikasi"
                                state="disabled"
                                behavior="fill-container"

                                onPressHandler={() => {
                                    onForgotPassword();
                                }}

                                isLoading={isForgotPasswordLoading}
                                />
                    </View>
                    
                </View>
            </View>

            <Text>
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

    actions: {
        rowGap: 16
    }
});