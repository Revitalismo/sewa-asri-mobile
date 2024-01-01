import { useRef } from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from "react-native";
import { neutral } from "../constants/colors";
import * as Clipboard from 'expo-clipboard';

type PaymentName = "Qris" | "Transfer BCA" | "Transfer Bank BNI" | "BRIVA" | "Mandiri" | "Permata Bank"
type PaymentCode = "014" | "009" | "002";

type PickPaymentMethod = {
    paymentName: PaymentName;
    onViewMoreHandler?: () => void;
}

type PaymentStatus = {
    status: "success" | "failed" | "pending";
    paymentCode?: string;
}

function PickPaymentMethod({ paymentName, onViewMoreHandler }: PickPaymentMethod) {
    return (
        <View  style={pickPaymentMethod.container} >

            <View  style={pickPaymentMethod.labelViewmoreWrapper} >

                <Text  style={pickPaymentMethod.label} >
                    Metode pembayaran
                </Text>

                <Pressable  style={pickPaymentMethod.viewMore} 
                            
                            onPress={() => {
                                if (onViewMoreHandler) {
                                    onViewMoreHandler();
                                }
                            }}>

                    <Text  style={pickPaymentMethod.viewMoreText} >
                        Lihat semua
                    </Text>
                </Pressable>
            </View>

            <View  style={pickPaymentMethod.paymentMethod} >

                <View  style={pickPaymentMethod.paymentDetail} >

                    <Image  source={require("./../../assets/payment-method/logo.png")} 
                            style={pickPaymentMethod.paymentLogo}
                            />

                    <Text  style={pickPaymentMethod.paymentName} >
                        { paymentName }
                    </Text>
                </View>

                <Image  source={require("./../../assets/icon/radio-button.png")}
                        style={pickPaymentMethod.radioButton} 
                        />

            </View>
        </View>
    );
}

const pickPaymentMethod = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width - 32,
        paddingTop: 6,
        paddingBottom: 10,

        rowGap: 16
    },

    labelViewmoreWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    label: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[700]
    },

    viewMore: {
        paddingVertical: 6,
        paddingHorizontal: 4
    },

    viewMoreText: {
        fontSize: 13,
        color: neutral[500]
    },

    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    paymentDetail: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    paymentLogo: {
        height: 50,
        width: 70
    },

    paymentName: {
        fontSize: 13,
        color: neutral[600]
    },

    radioButton: {
        height: 20,
        width: 20
    }




});

function ReservationStatus({ status }: { status: "pending" | "canceled" }) {
    switch (status) {
        case "canceled":
            return (
                <View   style={statusStyles.container}>
                    <Image  source={require("./../../assets/payment-method/close-circle.png")}
                            style={statusStyles.icon}
                            />

                    <Text   style={statusStyles.label}>
                        Pesanan dibatalkan pemilik
                    </Text>
                </View>
            );

        case "pending":
            return (
                <View   style={statusStyles.container}>
                    <Image  source={require("./../../assets/payment-method/pending-circle.png")}
                            style={statusStyles.icon}
                            />

                    <Text   style={statusStyles.label}>
                        Menunggu konfirmasi pemilik
                    </Text>
                </View>
            );
    }
}

function PaymentStatus({ status, paymentCode = "" }: PaymentStatus) {
    async function copyToClipboard() {
        await Clipboard.setStringAsync(paymentCode);
    }

    switch (status) {
        case "success":
            return (
                <View   style={statusStyles.container}>
                    <Image  source={require("./../../assets/payment-method/check-circle.png")}
                            style={statusStyles.icon}
                            />

                    <Text   style={statusStyles.label}>
                        Pembayaran berhasil
                    </Text>
                </View>
            );
        case "failed":
            return (
                <View   style={statusStyles.container}>
                    <Image  source={require("./../../assets/payment-method/close-circle.png")}
                            style={statusStyles.icon}
                            />

                    <Text   style={statusStyles.label}>
                        Pembayaran gagal
                    </Text>
                </View>
            );

        case "pending":
            return (
                <View   style={statusStyles.container}>

                    <Image  source={require("./../../assets/payment-method/pending-circle.png")}
                            style={statusStyles.icon}
                            />

                    <View   style={statusStyles.detail}>

                        <View   style={statusStyles.payment}>
                            <Text   style={statusStyles.paymentCode}>
                                { paymentCode }
                            </Text>

                            <Pressable  onPress={copyToClipboard}>

                                <Image  source={require("./../../assets/icon/copy.png")}
                                        style={statusStyles.copyIcon}  
                                        />
                            </Pressable>
                        </View>

                        <Text   style={statusStyles.label}>
                            Menunggu pembayaran
                        </Text>
                    </View>
                </View>
            );
    }
}

const statusStyles = StyleSheet.create({
    container: {
        rowGap: 16,
        alignItems: 'center'
    },

    detail: {
        rowGap: 10,
        alignItems: 'center'
    },

    payment: {
        columnGap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 6
    },

    label: {
        fontSize: 16,
        color: neutral[600]
    },

    paymentCode: {
        fontSize: 16,
        color: neutral[500]
    },

    copyIcon: {
        height: 20,
        width: 20
    },

    icon: {
        height: 60,
        width: 60
    }
});


export { PickPaymentMethod, ReservationStatus, PaymentStatus };