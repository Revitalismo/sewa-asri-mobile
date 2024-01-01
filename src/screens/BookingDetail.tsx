import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { Header, Button } from "../components";
import { neutral } from "../constants/colors";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

import villaData from "./../../data.json";

type RouteParams = {
    villaId: {};
};

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function BookingDetail() {
    const route = useRoute<RouteProp<ParamListBase, string>>();
    const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

    const { villaId } = route.params as RouteParams;

    const villa = villaData.bookedVilla.find((villa) => villa.orderId === villaId);

    const dahBayar = false;

    return (
        <>
            <Header variant="navigation"
                    label="Detail pemesanan"
                    navigateTo="goBack" />

            <ScrollView  style={styles.container}>

                <View  style={styles.booking}>

                    <Image  source={{ uri: villa?.image }}
                            style={styles.image} />

                    <View  style={styles.namePriceActionWrapper}>

                        <View  style={styles.namePriceWrapper}>

                            <Text  style={styles.name}>{villa?.name}</Text>

                            <Text  style={styles.price}>Rp. {villa?.price}</Text>
                        </View>

                    
                        {
                            dahBayar ? (
                                <Button  size="medium"
                                 variant="primary"
                                 behavior="center"
                                 label="Unduh tiket"
                                 state="active"
                                 />

                            ) : (

                                <Button  size="medium"
                                 variant="primary"
                                 behavior="center"
                                 label="Bayar"
                                 state="active"

                                 onPressHandler={() => {
                                    navigation.navigate('payment-confirmation', { villa });
                                 }}
                                 />
                            )
                        }
                        
                        
                    </View>
                    
                    <View  style={styles.bookingsdetail}>

                        <Text  style={styles.status}
                               >Status: {villa?.status}</Text>

                        <Text  style={styles.orderId}
                               >ID Pesanan: {villa?.orderId}</Text>
                    </View>

                    <View  style={styles.actions}>
                        <Button     size="medium"
                                    variant="secondary"
                                    label="Lihat status pemesanan"
                                    state="active"

                                    onPressHandler={() => {
                                        navigation.navigate("payment-confirmation", { trID: villa?.orderId });
                                    }}
                                    />
                    </View>
                </View>
                
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        width: '100%',
        paddingHorizontal: 16,
        backgroundColor: neutral[0],
        flex: 1
    },

    booking: {
        rowGap: 24
    },

    image: {
        height: 250,
        width: '100%',
        borderRadius: 8
    },

    namePriceActionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    namePriceWrapper: {
        rowGap: 8
    },

    name: {
        fontSize: 16,
        color: neutral[700]
    },
    
    price: {
        fontSize: 20,
        fontWeight: '500',
        color: neutral[700]
    },    

    bookingsdetail: {
        rowGap: 6
    },

    status: {
        fontSize: 13,
        color: neutral[600]
    },

    orderId: {
        fontSize: 13,
        color: neutral[400]
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 12
    }


});