import { View } from "react-native";

import { RouteProp, useRoute } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';

import villaData from "./../../data.json";


type RouteParams = {
    villaId: string;
};

export function BookingDetail() {
    const route = useRoute<RouteProp<ParamListBase, string>>();

    const { villaId } = route.params as RouteParams;

    // const villa = villaData.bookedVilla.filter((orderId) => orderId === villaId);

    console.info("id: ", villaId)

    return (
        <View>
            {/* <Image  source={}
                    style={} /> */}

            <View>

            </View>

            <View>

            </View>
        </View>
    );
}