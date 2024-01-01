import { ScrollView, View, Image, Text, StyleSheet, ImageBackground, Pressable, FlatList } from "react-native";
import { PriceBottomBar, Card, Header, Manager } from "../components";

import { RouteProp, useRoute } from '@react-navigation/native';

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import villaData from "./../../data.json";
import villaReviews from "./../../data/reviews.json";

import { neutral, primary } from "../constants/colors";
import { ReviewsCard } from "../components/Reviews";
import { useState } from "react";
import { BottomSheet } from "../components/BottomSheet";

type RouteParams = {
    villaId: {};
};

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function VillaDetail() {
    const route = useRoute<RouteProp<ParamListBase, string>>();
    const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();

    const [showPickBookingSchedule, setShowPickBookingSchedule] = useState<boolean>(false);

    const { villaId } = route.params as RouteParams;

    const recentReviewsData = villaReviews.reviews[1];

    console.info(villaId);

    const villa = villaData.villa.find((villa) => villa.villaId === villaId);

    return (
        <>
            <Header variant="navigation"
                    label="Detail villa"
                    navigateTo="goBack" />

            <ScrollView  style={styles.container}
                         contentContainerStyle={{
                            rowGap: 24
                         }}
                         >

                <View  style={styles.detail}>

                    <ImageBackground  source={{ uri: villa?.image }}
                                      style={styles.image}>

                        <Pressable  style={styles.bookmarkButton}
                                    onPress={() => {
                                                    console.info(villa?.villaId);
                                                }}
                                    >
        
                            <Image  source={require("./../../assets/icon/bookmark-icon.png")} 
                                    style={styles.bookmarkIcon}
                                    />
        
                        </Pressable>
                    
                    </ImageBackground>
                    
                    <View  style={styles.nameLocationWrapper}>

                        <View  style={styles.labelRatingWrapper}>
            
                            <Text  style={styles.name}>{villa?.name}</Text>
            
                            <View  style={styles.rating}>
            
                                <Image  source={require("./../../assets/icon/star-icon.png")} 
                                        style={styles.starIcon}
                                        />
                
                                <Text  style={styles.ratingDetail}>
                                    {villa?.ratingPoint} ({villa?.totalReviews} ulasan)
                                </Text>
                            </View>
                        </View>

                        <View  style={styles.location}>
                            <Image  source={require("./../../assets/icon/pin-icon.png")} 
                                    style={styles.pinIcon}
                                    />

                            <Text  style={styles.address}>{villa?.address}</Text>
                        </View>
                    </View>

                    <View  style={styles.facility}>

                        <View  style={styles.facilityDetail}>
                            <Image  source={require("./../../assets/icon/bed-icon.png")} 
                                    style={styles.facilityIcon}
                                    />
                            
                            <Text  style={styles.facilityName}>
                                {villa?.bedroomQuantity} kamar tidur
                            </Text>
                        </View>

                        <View  style={styles.facilityDetail}>
                            <Image  source={require("./../../assets/icon/shower-icon.png")} 
                                    style={styles.facilityIcon}
                                    />
                            
                            <Text  style={styles.facilityName}>
                                {villa?.bathroomQuantity} kamar mandi
                            </Text>
                        </View>
                    </View>

                    <View  style={styles.description}>

                        <Text  style={styles.descriptionLabel}>Deskripsi</Text>

                        <View>
                            <Text  style={styles.descriptionContent}
                                   ellipsizeMode="tail"
                                   numberOfLines={3}>
                                Villa Pesona Lestari adalah sebuah tempat peristirahatan yang indah dan menawan, terletak di tengah-tengah alam yang asri dan hijau. Villa ini menawarkan pengalaman menginap yang tenang dan damai, di mana Anda dapat bersantai dan menikmati keindahan alam sekitarnya.
                                
                            </Text>

                            <Pressable  onPress={() => {
                                navigation.navigate('villa-detail-description', { villaId: villaId});
                            }}>
                                <Text  style={styles.viewMore}>selengkapnya</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                
                <Manager managerId={villa?.managerId} />

                <View  style={recentReviews.container} >

                    <View  style={recentReviews.labelViewmoreWrapper} >
                        
                        <Text  style={recentReviews.label} >
                            Reviews ({villaReviews.overallRatting.totalReviews} ulasan)
                        </Text>

                        <Pressable  onPress={() => {
                                        navigation.navigate('villa-reviews');
                                    }} 
                                    
                                    style={recentReviews.viewMoreButton}>

                            <Text  style={recentReviews.viewmore} >
                                Lihat semua
                            </Text>
                        </Pressable>
                    </View>

                    <ReviewsCard  data={recentReviewsData} />
                </View>

                <View  style={styles.othersVilla} >

                    <Text  style={styles.othersVillaLabel} >
                        Villa lainnya
                    </Text>

                    <FlatList   data={villaData.villa}
                                
                                renderItem={({ item }) => (
                                    <Card   data={item} 
                                            variant="villa" 
                                            />
                                )}

                                horizontal={true}
                                showsHorizontalScrollIndicator={true}

                                keyExtractor={item => item.villaId}

                                ItemSeparatorComponent={() => <View style={{width: 16}} />}

                                style={styles.othersVillaList}
                                />

                </View>

            </ScrollView>

            <PriceBottomBar     priceDetail={villa?.price} 
                                
                                bookingHandler={() => {
                                    setShowPickBookingSchedule(true);
                                }}
                                />

            <BottomSheet    variant="pickBookingSchedule"
                            state={showPickBookingSchedule}

                            onCloseHandler={() => {
                                setShowPickBookingSchedule(false);
                            }}
                            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },

    image: {
        padding: 16,
        height: 250,

        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',

        borderRadius: 8,
        overflow: 'hidden'
    },

    bookmarkIcon: {
        height: 22,
        width: 18,
        tintColor: neutral[0]
    },

    bookmarkButton: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor: '#1c1c1c0d',
        borderRadius: 6
    },

    content: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 14,

        rowGap: 10,

        alignItems: 'flex-start'
    },

    detail: {
        rowGap: 12
    },

    labelRatingWrapper: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    nameLocationWrapper: {
        rowGap: 8
    },

    name: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[700],
    },

    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6
    },

    ratingDetail: {
        fontSize: 13,
        color: neutral[400]
    },

    starIcon: {
        height: 14,
        width: 14
    },

    price: {
        flexDirection: 'row',
        columnGap: 2,
        alignItems: 'flex-end'
    },

    priceLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[700]
    },

    nightLabel: {
        fontSize: 13,
        color: neutral[400]
    },

    facility: {
        flexDirection: 'row',
        columnGap: 24,
        alignItems: 'center'
    },

    facilityDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6
    },

    facilityIcon: {
        height: 18,
        width: 18
    },

    facilityName: {
        fontSize: 13,
        color: neutral[500]
    },

    location: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 4
    },

    pinIcon: {
        height: 16,
        width: 16
    },

    address: {
        fontSize: 13,
        color: neutral[400]
    },

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
    },

    othersVilla: {
        width: '100%',
        rowGap: 16,
    },

    othersVillaLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[600]
    },

    othersVillaList: {
        height: 328,
    }

});

const recentReviews = StyleSheet.create({
    container: {
        rowGap: 16
    },

    labelViewmoreWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    label: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[600]
    },

    viewMoreButton: {
        paddingLeft: 8,
        paddingVertical: 6
    },

    viewmore: {
        fontSize: 13,
        color: neutral[500],
    }
})