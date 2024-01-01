import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header, SearchBar, Card, BottomNavigation } from "../components";
import { neutral } from "../constants/colors";

import villaData from "./../../data.json";

export function Booking() {

    return (
        <>
            <Header variant="status"
                    label="Pemesanan"
                    navigateTo="goBack" />

            <View  style={styles.container}>
            
            <FlatList   data={villaData.bookedVilla}
                        renderItem={({ item }) => <Card data={item} variant="booked villa" />} 
                        keyExtractor={item => item.orderId}

                        ItemSeparatorComponent={() => <View style={{height: 16}} />}

                        showsVerticalScrollIndicator={false}
                        />
            </View>

            <BottomNavigation />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        paddingTop: 32,
        paddingHorizontal: 16,
        
        backgroundColor: neutral[0],

        flex: 1
    },
});