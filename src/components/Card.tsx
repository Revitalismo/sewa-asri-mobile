import { Image, ImageBackground, Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { neutral } from "../constants/colors";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Villa = {
    villaId: string;
    image: string;
    name: string;
    price: number;
    bedroomQuantity?: number;
    bathroomQuantity?: number;
    ratingPoint?: number;
    totalReviews?: number;
    address?: string;
}

type BookedVilla = Villa & {
    orderId: string;
    data: {
        photo: string;
        name: string;
        schedule: {
            checkIn: string;
            checkOut: string;
            nights: number;
        }
    }
    status: "Menunggu pembayaran" | "Reservasi dibatalkan" | "Selesai";
}

type CardProps = {
    data: Villa | BookedVilla;
    variant: "villa" | "booked villa" | "notification" | "ordered villa" | "attraction";
    onPressHandler?: () => void;
}

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function Card({ data, variant, onPressHandler }: CardProps) {
    const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();
    
    switch (variant) {
        case "villa":
            const villa = data as Villa;

            return (
                <View  style={villaStyle.container}>
        
                    <ImageBackground  source={{ uri: villa.image }}
                                      style={villaStyle.image}
                                      resizeMode="cover">
        
        
                        <Pressable  style={villaStyle.bookmarkButton}
                                    onPress={() => {
                                        if (onPressHandler) {
                                            onPressHandler();                                            
                                        }
                                    }}
                                    >
        
                            <Image  source={require("./../../assets/icon/bookmark-icon.png")} 
                                    style={villaStyle.bookmarkIcon}
                                    />
        
                        </Pressable>
                    </ImageBackground>
        
                    <View  style={villaStyle.content}>
        
                        <Pressable  style={villaStyle.detail}
                                    
                                    onPress={() => {
                                        navigation.navigate("villa-detail", { villaId: villa.villaId });
                                    }}>
        
                            <View  style={villaStyle.labelRatingWrapper}>
        
                                <Text>{villa.name}</Text>
        
                                <View  style={villaStyle.rating}>
        
                                    <Image  source={require("./../../assets/icon/star-icon.png")} 
                                            style={villaStyle.starIcon}
                                            />
        
                                    <Text  style={villaStyle.ratingDetail}>
                                        {villa.ratingPoint} ({villa.totalReviews} ulasan)
                                    </Text>
                                </View>
                            </View>
        
                            <View  style={villaStyle.price}>
        
                                <Text  style={villaStyle.priceLabel}>Rp. {villa.price}</Text>
        
                                <Text  style={villaStyle.nightLabel}>/malam</Text>
                            </View>
        
                        </Pressable>
        
                        <View  style={villaStyle.facility}>
        
                            <View  style={villaStyle.facilityDetail}>
        
                                <Image  source={require("./../../assets/icon/bed-icon.png")} 
                                        style={villaStyle.facilityIcon}
                                        />
        
                                <Text   style={villaStyle.facilityName}
                                        >{villa.bedroomQuantity} kamar tidur</Text>
                            </View>
        
                            <View  style={villaStyle.facilityDetail}>
        
                                <Image  source={require("./../../assets/icon/shower-icon.png")}
                                        style={villaStyle.facilityIcon}
                                        />
        
                                <Text   style={villaStyle.facilityName}
                                        >{villa.bathroomQuantity} kamar tidur</Text>
                            </View>
                        </View>
        
                        <View  style={villaStyle.location}>
        
                            <Image  source={require("./../../assets/icon/pin-icon.png")}
                                    style={villaStyle.pinIcon}
                                    />
        
                            <Text   style={villaStyle.address}>{villa.address}</Text>
                        </View>
        
        
        
                    </View>
                </View>
            );
    
        case "booked villa":
            const bookedVilla = data as BookedVilla;

            return (
                <View  style={bookedVillaStyle.container}>

                    <Image  source={{ uri: bookedVilla.image }} 
                            style={bookedVillaStyle.image}
                            />

                    <View  style={bookedVillaStyle.content}>

                        <Pressable  style={bookedVillaStyle.detail}

                                    onPress={() => {
                                        navigation.navigate("booking-detail", { villaId: bookedVilla.orderId });
                                    }}
                                    >


                            <Text  style={bookedVillaStyle.name}>{bookedVilla.name}</Text>

                            <Text  style={bookedVillaStyle.price}>Rp. {bookedVilla.price}</Text>

                            <Text  style={bookedVillaStyle.status}>Status: {bookedVilla.status}</Text>

                        </Pressable>

                        <Text  style={bookedVillaStyle.orderId}
                               numberOfLines={1}                                   
                               ellipsizeMode="tail"
                                    
                               >Order ID: {bookedVilla.orderId}</Text>
                    </View>
                </View>
            );
    }

    
}

export function OrderedVilla({ data, orderId, status }: BookedVilla) {
    return (
        <View  style={orderedVillaStyle.container} >

            <Image  source={{ uri: "https://i.pinimg.com/564x/e5/cb/e1/e5cbe1e3bc29ed3880831ba46fcb38ee.jpg" }}
                    style={orderedVillaStyle.photo} 
                    />

            <View  style={orderedVillaStyle.detail} >

                <Text  style={orderedVillaStyle.villaName} >

                    { data.name }
                </Text>

                <View  style={orderedVillaStyle.schedule} >

                    <View  style={orderedVillaStyle.scheduleDetail} >

                        <Text  style={orderedVillaStyle.date} >
                            Check in: { data.schedule.checkIn }
                        </Text>

                        <Text  style={orderedVillaStyle.date} >
                            Check out: { data.schedule.checkOut }
                        </Text>
                    </View>

                    <Text  style={orderedVillaStyle.amountOfNights} >
                        { data.schedule.nights } malam
                    </Text>
                </View>
            </View>
        </View>
    );
}

const villaStyle = StyleSheet.create({
    container: {
        height: 300,
        width: Dimensions.get('screen').width - 32,

        backgroundColor: neutral[0],
        borderWidth: 1,
        borderColor: neutral[200],
        borderRadius: 8
    },

    image: {
        padding: 16,
        height: 180,

        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',

        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
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
        rowGap: 6
    },

    labelRatingWrapper: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    name: {
        fontSize: 13,
        color: neutral[600],
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
    }
});

const bookedVillaStyle = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width - 32,
        height: 110,
        
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',

        borderRadius: 8,
        overflow: 'hidden',

        backgroundColor: neutral[0],
        borderWidth: 1,
        borderColor: neutral[200]
    },

    image: {
        height: 110,
        width: 110
    },

    content: {
        flex: 1,
        height: '100%',

        paddingVertical: 8,
        paddingLeft: 0,
        paddingRight: 8,

        justifyContent: 'space-between'
    },

    detail: {
        rowGap: 4
    },

    name: {
        fontSize: 13,
        color: neutral[600]
    },

    price: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[700]
    },

    status: {
        fontSize: 10,
        color: neutral[500]
    },

    orderId: {
        fontSize: 10,
        color: neutral[500],
        overflow: 'hidden'
    }
    
});

const orderedVillaStyle = StyleSheet.create({
    container: {
        height: 110,
        width: Dimensions.get('screen').width - 32,

        flexDirection: 'row',
        columnGap: 16,

        borderRadius: 8,
        overflow: 'hidden',

        backgroundColor: neutral[0],
        elevation: 1.5
    },

    photo: {
        height: 110,
        width: 110
    },

    detail: {
        width: Dimensions.get('screen').width - 158,
        paddingVertical: 8,
        paddingRight: 8,
        justifyContent: 'space-between'
    },

    villaName: {
        fontSize: 16,
        color: neutral[600]
    },

    schedule: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

    scheduleDetail: {
        rowGap: 6
    },

    date: {
        fontSize: 13,
        color: neutral[500]
    },

    amountOfNights: {
        fontSize: 13,
        color: neutral[400]
    }
});