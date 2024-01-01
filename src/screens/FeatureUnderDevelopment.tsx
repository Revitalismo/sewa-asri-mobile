import { Image, StyleSheet, Text, View } from "react-native";
import { neutral } from "../constants/colors";
import { Header } from "../components";

export function FeatureUnderDevelopment() {
    return (
        <>
            <Header  variant="navigation"
                     label="Feature under development"
                     navigateTo="home"
                     />

            <View  style={styles.container} >

                <Image  source={require("./../../assets/under_construction.png")} 
                        style={styles.illustration}
                        resizeMode="contain"
                        />

                <Text  style={styles.content} >
                    Fitur ini masih dalam pengembangan dan belum bisa digunakan
                </Text>
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
        rowGap: 10,
        alignItems: 'center'
    },

    illustration: {
        height: 200,
        width: '100%'
    },

    content: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 24,
        color: neutral[600]
    }
})