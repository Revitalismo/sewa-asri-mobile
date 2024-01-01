import { FlatList, StyleSheet, Text, View } from "react-native";
import { Header, SearchBar, Card, BottomNavigation, SnackBar } from "../components";
import { neutral } from "../constants/colors";

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import villaData from "./../../data.json";
import { AuthContext } from "../context/AuthContext";
// import { useFetchData } from "../hooks/useVillaHooks";

import { useState } from "react";
import { token } from "./Auth/auth";

export function Home() {
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

    console.info("Re-render Home.tsx");

    // token().then(token => console.info(token))
    
    return (
        <>
            <Header variant="home"
                    navigateTo="goBack" />
    
            <View   style={styles.container}
                    // onLayout={onLayoutRootView}
                    >
                    
                <View  style={styles.searchWrapper}>
    
                    <Text  style={styles.searchLabel}>Ayo temukan tempat menginap mu!</Text>
                    <SearchBar  placeholder="Cari villamu disini"
                                variant="link-navigation" 
                                />
                </View>
    
                <View  style={styles.newestVilla}>
    
                    <Text  style={styles.newestVillaLabel}>Villa terbaru</Text>
    
                    <FlatList   data={villaData.villa}
                                    
                                renderItem={({ item }) => (
    
                                    <Card   data={item} 
                                            variant="villa" 
    
                                            onPressHandler={() => {
                                                showSnackBar ? 
    
                                                setShowSnackBar(false)
                                                :
                                                setShowSnackBar(true);
                                            }}
                                    />
                                )}
    
                                keyExtractor={item => item.villaId}
    
                                ItemSeparatorComponent={() => <View style={{height: 16}} />}
    
                                style={styles.newestVillaList}
                                showsVerticalScrollIndicator={false}
                                />
                </View>
            </View>
    
                {
                    showSnackBar ? (
                        <SnackBar   label="Villa disimpan"
                                    actionLabel="Lihat"
                                    navigateTo="bookmark"
    
                                    toggleSnackBar={() => {
                                        showSnackBar ? 
    
                                        setShowSnackBar(false)
                                        :
                                        setShowSnackBar(true);
                                    }}
                                    />
                    ) : (
                        null
                    )
                }
    
            <BottomNavigation />
        </>
        );
    

    
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        // paddingTop: 32,
        paddingHorizontal: 16,
        
        backgroundColor: neutral[0],

        flex: 1,
        rowGap: 28
    },

    searchWrapper: {
        rowGap: 16
    },

    searchLabel: {
        fontSize: 25,
        // fontFamily: 'Kalnia-SemiBold',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 40,
        color: neutral[700]
    },

    newestVilla: {
        rowGap: 24
    },

    newestVillaLabel: {
        // fontFamily: 'Kalnia-Regular',
        fontSize: 20,
        fontWeight: '700',
        color: neutral[600]
    },

    newestVillaList: {
        height: 360,
        overflow: 'hidden'
    }
});