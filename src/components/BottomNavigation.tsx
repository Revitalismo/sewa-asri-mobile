import { Image, Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { neutral, primary } from "../constants/colors";

import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function BottomNavigation() {
    const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();
    const route = useRoute();
    
    return (
        <View  style={styles.bottomNavigation}>

            <Pressable  style={styles.menu}
                        
                        onPress={() => {
                            navigation.navigate("home");
                        }}>

                <Image  source={require("./../../assets/icon/home-icon.png")} 
                        style={[
                            styles.menuIcon,
                            route.name === "home" && { tintColor: primary[400]}
                        ]}
                        />

                <Text   style={[
                            styles.menuLabel,
                            route.name === "home" && { color: primary[400] }
                        ]}
                        >Home</Text>

            </Pressable>

            <Pressable  style={styles.menu}
                        onPress={() => {
                            navigation.navigate("booking");
                        }}>

                <Image  source={require("./../../assets/icon/booking-icon.png")}
                        style={[
                            styles.menuIcon,
                            route.name === "booking" && { tintColor: primary[400]}
                        ]}
                        />

                <Text  style={[
                            styles.menuLabel,
                            route.name === "booking" && { color: primary[400] }
                        ]}
                        >Booking</Text>

            </Pressable>

            <Pressable  style={styles.menu}
                        onPress={() => {
                            navigation.navigate("bookmark");
                        }}>

                <Image  source={require("./../../assets/icon/bookmark-icon.png")}
                        style={[
                            styles.menuIcon,
                            route.name === "bookmark" && { tintColor: primary[400]}
                        ]}
                        />

                <Text   style={[
                            styles.menuLabel,
                            route.name === "bookmark" && { color: primary[400] }
                        ]}
                        >Boomark</Text>

            </Pressable>

            <Pressable  style={styles.menu}
                        onPress={() => {
                            navigation.navigate("profile");
                        }}>


                <Image  source={require("./../../assets/icon/profile-icon.png")} 
                        style={[
                            styles.menuIcon,
                            route.name === "profile" && { tintColor: primary[400]}
                        ]}
                        />

                <Text   style={[
                            styles.menuLabel,
                            route.name === "profile" && { color: primary[400] }
                        ]}
                        >Profile</Text>

            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomNavigation: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 44,

        height: 60,
        width: Dimensions.get('screen').width - 32,
        
        paddingVertical: 10,
        paddingHorizontal: 24,

        borderRadius: 30,
        borderWidth: 1,

        backgroundColor: neutral[0],
        borderColor: neutral[200],

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    menu: {
        paddingHorizontal: 6,
        alignItems: 'center',
        rowGap: 4
    },

    menuIcon: {
        height: 24,
        width: 24
    },

    menuLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: neutral[400]
    }
});