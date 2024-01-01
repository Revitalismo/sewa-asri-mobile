import { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, Image, FlatList } from "react-native";
import { additional, neutral, primary } from "../constants/colors";
import { Button } from "./Button";
import { Chips } from "./Chips";
import { Input } from "./Input";

import { FilterContext } from "../context/FilterContext";
import { PaymentContext, PaymentMethodList } from "../context/PaymentContext";

import { Calendar } from "react-native-calendars";
import { PaymentMethod } from "./PaymentMethod";


type BottomSheetProps = {
    variant: "filter" | "pickBookingSchedule" | "pickPaymentMethod" | "reviews";
    state?: boolean;
    onCloseHandler?: () => void
};

type locationStateRef = {
    nearest: boolean;
    farthest: boolean;
    popular: boolean;
};

type roomStateRef = {
    "2": boolean;
    "3": boolean;
    "4": boolean;
    "6": boolean;
    "10": boolean;
};

type RatingState = {
    ratingLabel: string;
    ratingNumber: 0 | 1 | 2 | 3 | 4 | 5;
};

const paymentMethodList = [
    {
        id: "d28bf8ca",
        name: "Bank BCA"
    },
    {
        id: "d28bf9c4",
        name: "Bank BRI"
    },
    {
        id: "d28bfaaa",
        name: "Bank BNI"
    }
];

export function BottomSheet({ 
        variant, 
        state = false,
        onCloseHandler
    }:BottomSheetProps) {  

    const moveAnim = useRef(new Animated.Value(1000)).current;

    let bottomSheetVariant;

    switch (variant) {
        case "filter":
            bottomSheetVariant = <FilterSheet/>;
            break;
        
        case "reviews":
            bottomSheetVariant = <ReviewsSheet  onCancelHandler={() => {
                                                    if (onCloseHandler) {
                                                        onCloseHandler();
                                                    }
                                                }}
                                                 />;
            break;
        
        case "pickBookingSchedule":
            bottomSheetVariant = <BookingSheet  />;
            break;

        case "pickPaymentMethod":
            bottomSheetVariant = <PaymentMethodSheet  />;
        break;
    }

    function moveIn() {
        Animated.timing(moveAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    function moveOut() {
        Animated.timing(moveAnim, {
            toValue: 600,
            duration: 300,
            useNativeDriver: true
        }).start();
    }
  
    useEffect(() => {
        if (state) {
        moveIn();
        } else {
        moveOut();
        }
    }, [state]);

    return (
        <Animated.View  style={[
                            styles.bottomSheet,
                            { transform: [{ translateY: moveAnim }] }
                        ]}>

            <Pressable  style={styles.closeBar}

                        onPress={() => {
                            if (onCloseHandler) {
                                onCloseHandler();                                
                            }
                        }}>
        
                <View   style={styles.bar} />
            </Pressable>

            { bottomSheetVariant }
        </Animated.View>
    );
    
}

function FilterSheet() {
    const priceStateRef = useRef<boolean>(true);

    const locationStateRef = useRef<locationStateRef>({
        nearest: true,
        farthest: false,
        popular: false
    });

    const roomStateRef = useRef<roomStateRef>({
        "2": true,
        "3": false,
        "4": false,
        "6": false,
        "10": false,
    });

    const { value, setFilter } = useContext(FilterContext);

    function setPriceFilter(option: "termurah" | "termahal") {
        setFilter({
            sortByPrice: option,
            sortByLocation: value.sortByLocation,
            sortByRooms: value.sortByRooms
        });

        if (option === "termurah") {
            priceStateRef.current = true;
        } else {
            priceStateRef.current = false;
        }
    }

    function setLocationFilter(option: "terdekat" | "terjauh" | "terpopuler") {
        setFilter({
            sortByPrice: value.sortByPrice,
            sortByLocation: option,
            sortByRooms: value.sortByRooms
        });

        switch (option) {
            case "terdekat":
                locationStateRef.current.nearest = true;
                locationStateRef.current.farthest = false;
                locationStateRef.current.popular = false;
                break;

            case "terjauh":
                locationStateRef.current.nearest = false;
                locationStateRef.current.farthest = true;
                locationStateRef.current.popular = false;
                break;

            case "terpopuler":
                locationStateRef.current.nearest = false;
                locationStateRef.current.farthest = false;
                locationStateRef.current.popular = true;
                break;
        }
    }

    function setRoomFilter(option: 2 | 3 | 4 | 6 | 10) {
        setFilter({
            sortByPrice: value.sortByPrice,
            sortByLocation: value.sortByLocation,
            sortByRooms: option
        });

        switch (option) {
            case 2:
                roomStateRef.current[2] = true;
                roomStateRef.current[3] = false;
                roomStateRef.current[4] = false;
                roomStateRef.current[6] = false;
                roomStateRef.current[10] = false;
                break;

            case 3:
                roomStateRef.current[2] = false;
                roomStateRef.current[3] = true;
                roomStateRef.current[4] = false;
                roomStateRef.current[6] = false;
                roomStateRef.current[10] = false;
                break;

            case 4:
                roomStateRef.current[2] = false;
                roomStateRef.current[3] = false;
                roomStateRef.current[4] = true;
                roomStateRef.current[6] = false;
                roomStateRef.current[10] = false;
                break;

            case 6:
                roomStateRef.current[2] = false;
                roomStateRef.current[3] = false;
                roomStateRef.current[4] = false;
                roomStateRef.current[6] = true;
                roomStateRef.current[10] = false;
                break;

            case 10:
                roomStateRef.current[2] = false;
                roomStateRef.current[3] = false;
                roomStateRef.current[4] = false;
                roomStateRef.current[6] = false;
                roomStateRef.current[10] = true;
                break;
        
        }
    }

    return (
        <>
            <Text  style={styles.label} >
                Filter
            </Text>

            <View  style={filter.detail} >

                <Text  style={filter.label} >
                    Urutkan berdasarkan harga
                </Text>

                <View  style={filter.options} >

                    <Chips  label="Termurah" 
                            variant="active"

                            state={priceStateRef.current}        

                            onSelect={() => {
                                setPriceFilter("termurah");
                            }}
                            />

                    <Chips  label="Termahal" 
                            variant="active"

                            state={!priceStateRef.current}        

                            onSelect={() => {
                                setPriceFilter("termahal");
                            }}
                            />
                </View>                        
            </View>

            <View  style={filter.detail} >

                <Text  style={filter.label} >
                    Urutkan berdasarkan lokasi
                </Text>

                <View  style={filter.options} >

                    <Chips  label="Terdekat" 
                            variant="active"

                            state={locationStateRef.current.nearest}        

                            onSelect={() => {
                                setLocationFilter("terdekat");
                            }}
                            />

                    <Chips  label="Terjauh" 
                            variant="active"

                            state={locationStateRef.current.farthest}        

                            onSelect={() => {
                                setLocationFilter("terjauh");
                            }}
                            />

                    <Chips  label="Terpopuler" 
                            variant="active"

                            state={locationStateRef.current.popular}        

                            onSelect={() => {
                                setLocationFilter("terpopuler");
                            }}
                            />
                </View>                        
            </View>

            <View  style={filter.detail} >

                <Text  style={filter.label} >
                    Urutkan berdasarkan jumlah kamar
                </Text>

                <View  style={filter.options} >

                    <Chips  label="2 Kamar" 
                            variant="active"

                            state={roomStateRef.current[2]}        

                            onSelect={() => {
                                setRoomFilter(2);
                            }}
                            />

                    <Chips  label="3 Kamar" 
                            variant="active"

                            state={roomStateRef.current[3]}        

                            onSelect={() => {
                                setRoomFilter(3);
                            }}
                            />

                    <Chips  label="4 Kamar" 
                            variant="active"

                            state={roomStateRef.current[4]}        

                            onSelect={() => {
                                setRoomFilter(4);
                            }}
                            />

                    <Chips  label="6 Kamar" 
                            variant="active"

                            state={roomStateRef.current[6]}        

                            onSelect={() => {
                                setRoomFilter(6);
                            }}
                            />

                    <Chips  label="10 Kamar" 
                            variant="active"

                            state={roomStateRef.current[10]}        

                            onSelect={() => {
                                setRoomFilter(10);
                            }}
                            />
                </View>                        
            </View>

                            
                    <View  style={styles.actions} >

                        <Button  size="large"
                                 behavior="hug-content"
                                 state="active"
                                 label="Hapus semua"
                                 variant="secondary"

                                 onPressHandler={() => {
                                    setPriceFilter("termurah");
                                    setLocationFilter("terdekat");
                                    setRoomFilter(2);
                                 }}
                                 />

                        <Button  size="large"
                                 behavior="hug-content"
                                 state="active"
                                 label="Terapkan"
                                 variant="primary"

                                 onPressHandler={() => {
                                    console.info({
                                        sortByPrice: value.sortByPrice,
                                        sortByLocation: value.sortByLocation,
                                        sortByRooms: value.sortByRooms
                                    });
                                 }}
                                 />
                    </View>
                </>
    );
}

function ReviewsSheet({ onCancelHandler }: { onCancelHandler: () => void }) {
    const commentRef = useRef("");

    const [rating, setRating] = useState<RatingState>({
        ratingLabel: "Belum dipilih",
        ratingNumber: 0
    });

    return (
        <View  style={styles.container} >

            <Text  style={styles.label} >
                Beri ulasan
            </Text>

            <View  style={reviews.ratingDetail} >

                <View  style={reviews.ratingRange} >

                    <Pressable  onPress={() => {
                                    setRating({
                                        ratingLabel: "Tidak memuaskan",
                                        ratingNumber: 1
                                    });
                                }}>

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                
                                style={[
                                    reviews.starIcon,
                                    {
                                        tintColor: rating.ratingNumber >= 1 ? 
                                        additional.yellow[0] 
                                        : 
                                        neutral[200]
                                    }
                                ]} 
                                />
                    </Pressable>

                    <Pressable  onPress={() => {
                                    setRating({
                                        ratingLabel: "Kurang memuaskan",
                                        ratingNumber: 2
                                    });
                                }}>

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                
                                style={[
                                    reviews.starIcon,
                                    {
                                        tintColor: rating.ratingNumber >= 2 ? 
                                        additional.yellow[0] 
                                        : 
                                        neutral[200]
                                    }
                                ]} 
                                />
                    </Pressable>

                    <Pressable  onPress={() => {
                                    setRating({
                                        ratingLabel: "Cukup memuaskan",
                                        ratingNumber: 3
                                    });
                                }}>

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                
                                style={[
                                    reviews.starIcon,
                                    {
                                        tintColor: rating.ratingNumber >= 3 ? 
                                        additional.yellow[0] 
                                        : 
                                        neutral[200]
                                    }
                                ]} 
                                />
                    </Pressable>

                    <Pressable  onPress={() => {
                                    setRating({
                                        ratingLabel: "Memuaskan",
                                        ratingNumber: 4
                                    });
                                }}>

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                
                                style={[
                                    reviews.starIcon,
                                    {
                                        tintColor: rating.ratingNumber >= 4 ? 
                                        additional.yellow[0] 
                                        : 
                                        neutral[200]
                                    }
                                ]} 
                                />
                    </Pressable>

                    <Pressable  onPress={() => {
                                    setRating({
                                        ratingLabel: "Sangat memuaskan",
                                        ratingNumber: 5
                                    });
                                }}>

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                
                                style={[
                                    reviews.starIcon,
                                    {
                                        tintColor: rating.ratingNumber >= 5 ? 
                                        additional.yellow[0] 
                                        : 
                                        neutral[200]
                                    }
                                ]} 
                                />
                    </Pressable>
                </View>

                <Text  style={reviews.ratingLabel} >
                    { rating.ratingLabel }
                </Text>
            </View>

            <Input  variant="text"
                    label="Berikan ulasan Anda"
                    placeholder="Bagaimana pengalaman Anda tentang villa ini?"
                    required={true}     
                    
                    onInputHandler={(text) => {
                        commentRef.current = text;
                    }}
                    />

            <View  style={styles.actions} >

                <Button     label="Batal"
                            size="large"
                            variant="secondary"
                            state="active"

                            onPressHandler={() => {
                                commentRef.current = "";

                                setRating({
                                    ratingLabel: "Belum dipilih",
                                    ratingNumber: 0
                                });

                                if (onCancelHandler) {
                                    onCancelHandler();
                                }
                            }}
                            />

                <Button     label="Beri ulasan"
                            size="large"
                            variant="primary"
                            state="active"

                            onPressHandler={() => {
                                console.info(commentRef.current);
                            }}
                            />
            </View>
        </View>
    );
}

function BookingSheet() {
    return (
        <View  style={styles.container} >

            <Text  style={styles.label} >
                Pilih jadwal booking
            </Text>

            <Calendar   onDayPress={(DateData) => {
                            console.info(DateData);
                        }}

                        // disableArrowLeft={true}
                        markedDates={{
                            '2023-12-22': {selected: true, marked: true, selectedColor: primary[400]},
                            '2023-12-23': {selected: true, marked: true, selectedColor: primary[400]},
                            '2023-12-24': {selected: true, marked: true, selectedColor: primary[400]},
                            '2023-12-25': {disabled: true, disableTouchEvent: true}
                          }}
                        />
            
            <View  style={styles.actions} >

                <Button     label="Hapus semua"
                            size="large"
                            variant="secondary"
                            state="active"

                            
                            />

                <Button     label="Terapkan"
                            size="large"
                            variant="primary"
                            state="active"

                            
                            />
            </View>
        </View>
    );
}

function PaymentMethodSheet() {
    const { payment, setPaymentMethod } = useContext(PaymentContext);

    const currentPayment = payment.name;

    return (
        <View  style={styles.container} >

            <Text  style={styles.label} >
                Pilih metode pembayaran
            </Text>

            <FlatList   data={paymentMethodList}
                                    
                        renderItem={({ item }) => (
    
                                    <PaymentMethod  name={item.name}
                                                    currentMethod={currentPayment}
                                                    onSelectHandler={() => {
                                                        setPaymentMethod({
                                                            id: item.id,
                                                            name: item.name
                                                        });
                                                    }} />
                                )}
    
                        keyExtractor={item => item.id}
    
                        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    
                        showsVerticalScrollIndicator={false}
                        />
        </View>
    );
}

const styles = StyleSheet.create({
    bottomSheet: {
        minHeight: 470,

        position: 'absolute',
        left: 8,
        right: 8,
        bottom: 0,
        zIndex: 10,
        
        flex: 1,
        rowGap: 24,
        justifyContent: 'flex-start',

        paddingHorizontal: 20,
        paddingBottom: 24,

        backgroundColor: neutral[0],

        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,

        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: neutral[200]
    },

    container: {
        rowGap: 24
    },

    bar: {
        height: 6,
        width: 100,

        backgroundColor: neutral[200],
        borderRadius: 8
    },

    closeBar: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 16,

        justifyContent: 'center',
        alignItems: 'center'
    },

    label: {
        fontSize: 20,
        fontWeight: '500',
        color: neutral[700]
    },

    actions: {
        flexDirection: 'row',
        columnGap: 16,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flexWrap: 'wrap'
    }
});

const filter = StyleSheet.create({
    container: {
        rowGap: 24,
        justifyContent: 'flex-end',
        backgroundColor: 'yellow',
    },

    label: {
        fontSize: 13,
        fontWeight: '400',
        color: neutral[600]
    },

    detail: {
        rowGap: 10
    },

    options: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    }
});

const reviews = StyleSheet.create({
    ratingRange: {
        flexDirection: 'row',
        columnGap: 16
    },
    
    ratingDetail: {
        rowGap: 10,
        alignItems: 'center'
    },

    ratingLabel: {
        fontSize: 13,
        color: neutral[600]
    },
    starIcon: {
        height: 30,
        width: 28.5
    },
})