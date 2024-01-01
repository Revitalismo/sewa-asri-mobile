import { ScrollView, View, Image, Text, StyleSheet, ImageBackground, Pressable, FlatList } from "react-native";
import { Facility, Header } from "../components";

import { RouteProp, useRoute } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';

import villaData from "./../../data.json";
import { neutral, primary } from "../constants/colors";

type RouteParams = {
    villaId: {};
};

export function VillaDetailDescription() {
    const route = useRoute<RouteProp<ParamListBase, string>>();

    const { villaId } = route.params as RouteParams;

    const villa = villaData.villa.find((villa) => villa.villaId === villaId);

    return (
        <>
            <Header variant="navigation"
                    label="Detail villa"
                    navigateTo="goBack" />

            <ScrollView>

                <View  style={styles.description}>

                        <Text  style={styles.descriptionLabel}>Deskripsi</Text>

                        <Text  style={styles.descriptionContent}
                               ellipsizeMode="tail"
                               numberOfLines={3}>
                                Villa Pesona Lestari adalah sebuah tempat peristirahatan yang indah dan menawan, terletak di tengah-tengah alam yang asri dan hijau. Villa ini menawarkan pengalaman menginap yang tenang dan damai, di mana Anda dapat bersantai dan menikmati keindahan alam sekitarnya.
                            
                        </Text>
                </View>
    
                <View>
                    <Text>Fasilitas indoor</Text>

                    <FlatList  data={villaData.facilityIndoor}
                               renderItem={({ item }) => <Facility data={item} />} 
                               keyExtractor={item => item.id}

                               ItemSeparatorComponent={() => <View style={{height: 16}} />}

                            //    style={styles.newestVillaList}
                               showsVerticalScrollIndicator={false}
                               horizontal
                               />

                </View>
    
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    description: {
        rowGap: 6
    },

    descriptionLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[600]
    },

    descriptionContent: {
        height: 70,

        fontSize: 13,
        color: neutral[500],
        lineHeight: 24
    },

    viewMore: {
        fontSize: 13,
        color: primary[500]
    }
});