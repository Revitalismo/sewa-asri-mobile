import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Header, Button, OrderedVilla, PickPaymentMethod, PaymentMethod } from "../components";
import { neutral } from "../constants/colors";

import Clipboard from '@react-native-clipboard/clipboard';
import orderJson from "./../../data/order.json";
import transactionsJson from "./../../data/transactions.json";

import { RouteProp, useRoute } from '@react-navigation/native';
import { useState, useContext } from "react";
import { PaymentStatus, ReservationStatus } from "../components/Payment";
import { BottomSheet } from "../components/BottomSheet";

import { PaymentContext } from "../context/PaymentContext";

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function OrderDetail() {
    const { payment } = useContext(PaymentContext);
    const [showPickPaymentMethod, setShowPickPaymentMethod] = useState<boolean>(false);
    
    const order_1 = orderJson.orders[1];
    const transaction_1 = transactionsJson.transactions[0];


    let reservationStatus, paymentStatus;
    
    const route = useRoute<RouteProp<ParamListBase, string>>();

    switch (order_1.status) {
        case "pending":
            reservationStatus = <ReservationStatus  status="pending" />
            break;

        case "canceled":
            reservationStatus = <ReservationStatus  status="canceled" />
            break;
    }

    switch (transaction_1.status) {
        case "success":
            paymentStatus = <PaymentStatus  status="success" />
            break;

        case "pending":
            paymentStatus = <PaymentStatus  status="pending"
                                            paymentCode={transaction_1.paymentCode}
                                            />
            break;

        case "failed":
            paymentStatus = <PaymentStatus  status="failed" />
            break;
    }

    return (
        <>
            <Header variant="navigation"
                    label="Status pemesanan"
                    navigateTo="goBack" />

            <View  style={styles.container} >

                {
                    order_1.status === "pending" || order_1.status === "canceled" ? (
                        reservationStatus
                    ) : (
                        paymentStatus
                    )
                }

                {/* <OrderedVilla  data={} /> */}

                <View  style={styles.billDetails} >

                    <Text  style={styles.billLabel} >
                        Rincian tagihan
                    </Text>

                    <View  style={styles.costDetail} >
                        
                        <Text  style={styles.costLabel} >
                            Biaya sewa selama x hari
                        </Text>

                        <Text  style={styles.amountOfCosts} >
                            Rp. x
                        </Text>
                    </View>

                    <View  style={styles.costDetail} >
                        
                        <Text  style={styles.costLabel} >
                            Biaya admin
                        </Text>

                        <Text  style={styles.amountOfCosts} >
                            Rp. x
                        </Text>
                    </View>

                    <View  style={styles.paymentMethod} >

                        <View  style={styles.labelViewmoreWrapper} >

                            <Text  style={styles.paymentMethodLabel} >
                                Metode pembayaran
                            </Text>

                            <Pressable  onPress={() => {
                                setShowPickPaymentMethod(true);
                            }}>

                                <Text  style={styles.paymentMethodViewmore} >
                                    Lihat semua
                                </Text>
                            </Pressable>
                        </View>

                        <PaymentMethod  name={payment.name} 
                                        currentMethod={payment.name} 
                                        />
                    </View>
                </View>

            </View>

            <View  style={styles.bottomBar} >

                <View  style={styles.totalCost} >

                    <Text  style={styles.totalBillLabel} >
                        Total tagihan
                    </Text>

                    <Text  style={styles.totalBillDetail} >
                        Rp. x
                    </Text>
                </View>

                <Button     size="large"
                            label="Bayar sekarang"
                            variant="primary"
                            state="active"
                            behavior="fill-container"
                            />
            </View>

            <BottomSheet    variant="pickPaymentMethod"
                            state={showPickPaymentMethod}

                            onCloseHandler={() => {
                                setShowPickPaymentMethod(false);
                            }}
                            />
        </>
    );    
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        width: '100%',
        paddingHorizontal: 16,
        backgroundColor: neutral[0],
        flex: 1,
        rowGap: 32
    },

    billDetails: {
        rowGap: 16,
    },

    billLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[700]
    },

    costDetail: {
        rowGap: 6
    },

    costLabel: {
        fontSize: 13,
        color: neutral[600]
    },

    amountOfCosts: {
        fontSize: 16,
        color: neutral[600]
    },

    bottomBar: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        rowGap: 24
    },

    totalCost: {
        rowGap: 6
    },

    totalBillLabel: {
        fontSize: 13,
        color: neutral[600]
    },

    totalBillDetail: {
        fontSize: 20,
        color: neutral[700]
    },

    paymentMethod: {
        rowGap: 16
    },

    labelViewmoreWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    paymentMethodLabel: {
        color: neutral[500]
    },

    paymentMethodViewmore: {
        color: neutral[700],
        fontWeight: '500'
    },

    paymentDetail: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center'
    },

    radioButton: {
        height: 20,
        width: 20
    },

    paymentLogoNameWrapper: {
        rowGap: 4,
        alignItems: 'center'
    },

    paymentLogo: {
        width: 70,
        height: 50
    },

    paymentName: {
        color: neutral[600]
    }
});