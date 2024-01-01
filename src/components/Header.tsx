import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import { neutral } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Component header on progress ✅
type HeaderPropsType = {
    label?: string;
    variant: "status" | "home" | "navigation";
    navigateTo: string;
}

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function Header({ 
        variant, 
        label = "label", 
        navigateTo
    }:HeaderPropsType) {

    const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();

    switch (variant) {
        case "status":
            return (
                <View style={styles.header}>
                    <View  style={styles.invisibleShape} />

                    <Text  style={styles.label}>{label}</Text>

                    <View  style={styles.invisibleShape} />
                </View>
            );

        case "home":
            return (
                <View  style={styles.header}>
                    <Image  source={require("./../../assets/logo-small.png")}
                            />

                    <View style={styles.actions}>

                        <Pressable  onPress={() => {
                            navigation.navigate("notification");
                        }}>

                            <Image  source={require("./../../assets/icon/bell-icon.png")}
                                    style={styles.iconSmall} />
                        </Pressable>

                        <Pressable  onPress={() => {
                            navigation.navigate("message");
                        }}>

                            <Image  source={require("./../../assets/icon/message-icon.png")}
                                    style={styles.iconSmall} />
                        </Pressable>
                    </View>
                </View>
            );

        case "navigation":
            return (
                <View style={styles.header}>

                    <Pressable  onPress={() => {
                        if (navigateTo === "goBack") {
                            navigation.goBack();

                        } else {
                            navigation.navigate(navigateTo);
                        }
                    }}>

                        <Image  source={require("../../assets/icon/chevron-left.png")}
                                style={styles.iconLarge} />
                    </Pressable>

                    <Text  style={styles.label}>{label}</Text>

                    <View  style={styles.invisibleShape} />
                </View>
            );
    }
    
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        width: '100%',
        backgroundColor: neutral[0],
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomColor: neutral[100],
        borderBottomWidth: 1
    },
    
    iconLarge: {
        height: 36,
        width: 36
    },

    iconSmall: {
        height: 28,
        width: 28
    },

    invisibleShape: {
        height: 36,
        width: 36
    },

    actions: {
        flexDirection: 'row',
        columnGap: 16
    },

    label: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,

        color: neutral[600]
    }
});