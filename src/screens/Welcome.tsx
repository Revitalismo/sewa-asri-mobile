import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "./../components"
import { neutral } from "../constants/colors";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function Welcome() {
    const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();

    console.info("Re-render Welcome.tsx");

    return (
        <View  style={styles.container}>            
            <ImageBackground  source={require("./../../assets/image/nature-unsplash.jpg")}
                              resizeMode="cover"
                              style={styles.hero}>

                <View style={styles.content}>
                    <Text  style={styles.contentHeading}>Menjelajah dan menginap di villa</Text>

                    <Text  style={styles.contentParagraph}>Dengan Sewa Asri kamu dapat terhubung dengan alam dan temukan keindahan yang tak ternilai</Text>
                </View>
            </ImageBackground>

            <View  style={styles.actions}>
                <Button behavior="fill-container"
                        size='large'
                        state='active'
                        variant='primary' 
                        label='Mari kita mulai!' 

                        onPressHandler={() => {
                            navigation.navigate("register");
                        }}
                        />

                <Button behavior="fill-container"
                        size='large'
                        state='active'
                        variant='secondary' 
                        label='Saya sudah punya akun' 

                        onPressHandler={() => {
                            navigation.navigate("login");
                        }}
                        />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        paddingTop: 32,
        paddingHorizontal: 16,
        
        backgroundColor: neutral[0],

        flex: 1,
        rowGap: 30,
        justifyContent: 'center'
    },

    hero: {
        height: 500,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',

        justifyContent: 'flex-end'
    },

    content: {
        paddingHorizontal: 16,
        paddingBottom: 10,
        rowGap: 10,

        backgroundColor: '#4d4d4d4d', // opacity: 0.3
    },

    contentHeading: {
        fontSize: 25,
        fontWeight: '700',
        lineHeight: 40,

        color: neutral[0]
    }, // https://rgbacolorpicker.com/rgba-to-hex

    contentParagraph: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 24,

        color: neutral[100]
    },

    actions: {
        rowGap: 16
    }
});