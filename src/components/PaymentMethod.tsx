import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { neutral } from "../constants/colors";

type PaymentName = "Bank BCA" | "Bank BRI" | "Bank BNI" | string;

interface PaymentMethod {
    name: PaymentName | string;
    currentMethod: string;
    onSelectHandler?: () => void;
}

export function PaymentMethod({ name, currentMethod, onSelectHandler }:PaymentMethod) {
    return (
        <View  style={styles.container} >

            <View  style={styles.paymentMethod} >

                <PaymentMethodLogo paymentName={name} />

                <View  style={styles.detail} >

                    <Text  style={styles.name} >
                        { name }
                    </Text>

                    <Text  style={styles.description} >
                        Pembayaran ke rekening { name }
                    </Text>
                </View>
            </View>

            {
                name !== currentMethod ? (

                    <Pressable onPress={() => {
                        if (onSelectHandler) {
                            onSelectHandler();
                        }
                    }}>

                        <Image  source={require("./../../assets/icon/radio-button-default.png")}
                                style={styles.radioButton} 
                                />
                    </Pressable>
                ) : (
                    <Image  source={require("./../../assets/icon/radio-button.png")} 
                            style={styles.radioButton}
                            />
                )
            }
            
        </View>
    );
}

function PaymentMethodLogo({ paymentName }: { paymentName:PaymentName }) {
    switch (paymentName) {
        case "Bank BCA":
            return (
                <Image  source={require("./../../assets/payment-method/logo/bank-bca.png")}
                        style={styles.paymentLogo} />
            );

        case "Bank BRI":
            return (
                <Image  source={require("./../../assets/payment-method/logo/bank-bri.png")}
                        style={styles.paymentLogo} />
            );

        case "Bank BNI":
            return (
                <Image  source={require("./../../assets/payment-method/logo/bank-bni.png")}
                        style={styles.paymentLogo} />
            );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 6,
        paddingBottom: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red'
    },

    paymentMethod: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center'
    },

    detail: {
        rowGap: 4,
        // backgroundColor: 'blue'
    },

    name: {
        fontSize: 13,
        color: neutral[600]
    },

    description: {
        fontSize: 13,
        color: neutral[500],
        flexWrap: 'wrap'
    },

    paymentLogo: {
        height: 50,
        width: 70
    },

    radioButton: {
        height: 20,
        width: 20
    }
});