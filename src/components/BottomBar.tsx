import { View, Text, StyleSheet } from "react-native";
import { Button } from "./Button";
import { neutral } from "../constants/colors";

function PriceBottomBar(
    { 
        priceDetail,
        bookingHandler
    }: 
    { 
        priceDetail:number | undefined,
        bookingHandler?: () => void
    }
    ) {
    return (
        <View  style={styles.bottomBar}>

            <View  style={styles.detail}>

                <Text  style={styles.priceLabel}>
                    Rp. {priceDetail}
                </Text>

                <Text  style={styles.nightLabel}>/malam</Text>
            </View>

            <Button   size="medium"
                      label="Booking"
                      variant="primary"
                      state="active"
                      behavior="center"

                      onPressHandler={() => {
                        if (bookingHandler) {
                            bookingHandler();
                        }
                      }}
                      />
        </View>
    );
}

function ReviewsBottomBar() {
    return (
        <View  style={[styles.bottomBar, { width: '100%' }]} >
            <Button   size="large"
                      label="Beri ulasan"
                      variant="primary"
                      state="active"
                      behavior="fill-container"
                      />
        </View>
    );
}

export { PriceBottomBar, ReviewsBottomBar }

const styles = StyleSheet.create({
    bottomBar: {
        height: 70,
        backgroundColor: neutral[0],

        paddingHorizontal: 16,
        paddingVertical: 10,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        columnGap: 24,

        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: neutral[200]
    },

    detail: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        columnGap: 4
    },

    priceLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[700]
    },

    nightLabel: {
        fontSize: 13,
        color: neutral[500]
    }

});