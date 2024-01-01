import { Pressable, Text, View, StyleSheet, Animated, Dimensions } from "react-native";
import { neutral, primary } from "../constants/colors";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type SnackBarProps = {
    label: string;
    navigateTo: string;
    actionLabel?: string | null;
    toggleSnackBar?: () => void;
};

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function SnackBar({ label, actionLabel, toggleSnackBar, navigateTo }:SnackBarProps) {
    const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const animations = Animated.sequence([
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }),     
        Animated.timing(fadeAnim, {
            toValue: 0,
            delay: 1000,
            duration: 500,
            useNativeDriver: true
        }),

    ]);

    useEffect(() => {
        animations.start(({ finished }) => {
            if (toggleSnackBar && finished) {
                toggleSnackBar();
            } 
        });
    }, []);

    return (
        <Animated.View  style={{
            opacity: fadeAnim
        }}>
        
        <Pressable  style={styles.container}
                    
                    onPress={() => {
                        animations.start(({ finished }) => {
                            if (toggleSnackBar && finished) {
                                toggleSnackBar();
                            } 
                        });
                    }}>

            <View   style={styles.snackbar}>

                <Text  style={styles.label}>
                    {label}
                </Text>

                <Pressable  onPress={() => {
                                if (toggleSnackBar) {
                                    navigation.navigate(navigateTo);
                                } 
                            }}>

                    <Text  style={styles.actionLabel}>
                        {actionLabel}
                    </Text>
                </Pressable>
            </View>
        </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: Dimensions.get('window').width - 32,

        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 150,
        zIndex: 10,
        // backgroundColor: 'red',
        
        flex: 1,
        justifyContent: 'flex-end'
    },

    snackbar: {
        paddingVertical: 10,
        paddingHorizontal: 16,

        height: 40,
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 16,

        backgroundColor: neutral[0],
        borderColor: neutral[200],
        borderWidth: 1,
        borderRadius: 30,
    },

    label: {
        fontSize: 13,
        color: neutral[500]
    },

    actionLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: primary[400]
    }
});