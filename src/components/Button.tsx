import { Text, Pressable, StyleSheet, ViewStyle, Animated, Image, Easing  } from "react-native";
import { primary, neutral, additional } from "../constants/colors";
import { useState, useEffect, useRef } from "react";

// Component button ready ✅

type ButtonProps = {
    size: "small" | "medium" | "large";
    behavior?: "hug-content" | "fill-container" | 'center';
    state: "active" | "pressed" | "disabled";
    variant: "primary" | "secondary" | "tertiary" | "destructive";
    icon?: "default";
    label: string;
    isLoading?: boolean;
    onPressHandler?: () => void;
}

// type ButtonPropsType = {
//     size: "nhỏ" | "trung bình" | "lớn";
//     state: "hoạt động" | "được nhấn" | "vô hiệu hóa";
//     variant: "chính" | "phụ" | "thứ ba" | "phá hủy";
//     icon?: "mặc định";
//     label: string;
// }

export function Button({ 
        behavior = "hug-content",
        size, 
        state, 
        variant, 
        label, 
        onPressHandler,
        isLoading = false
    }:ButtonProps) {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const [isPressed, setIsPressed] = useState<boolean>(false);
    
    let buttonSize, labelTextColor, buttonVariant, buttonBehavior: ViewStyle;

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const animatedStyle = {
        transform: [{
        rotate: rotateInterpolate
        }]
    }

    switch (size) {
        case "small":
            buttonSize = styles.small;
            break;

        case "medium":
            buttonSize = styles.medium;
            break;

        case "large":
            buttonSize = styles.large;
            break;
    }

    switch (behavior) {
        case "fill-container":
            buttonBehavior = { alignSelf: 'stretch' };
            break;

        case "center":
            buttonBehavior = { alignSelf: 'center' };
            break;
    
        default:
            buttonBehavior = { alignSelf: 'flex-start' };
            break;
    }

    switch (variant) {
        case "primary":
            if (isPressed) {
                buttonVariant = { backgroundColor: primary[500] };
                labelTextColor = { color: neutral[100] };
            } else {
                buttonVariant = { backgroundColor: primary[400] };
                labelTextColor = { color: neutral[0] };
            }
            break;

        case "secondary":
            if (isPressed) {
                buttonVariant = { 
                    backgroundColor: neutral[0],
                    borderWidth: 1,
                    borderColor: primary[500]
                };

                labelTextColor = { color: primary[500] };

            } else {
                buttonVariant = { 
                    backgroundColor: neutral[0],
                    borderWidth: 1,
                    borderColor: primary[400]
                };
                
                labelTextColor = { color: primary[400] };
            }
            break;

        case "tertiary":
            if (isPressed) {
                buttonVariant = { backgroundColor: primary[500] };
                labelTextColor = { color: neutral[100] };
            } else {
                buttonVariant = { backgroundColor: neutral[0] };
                labelTextColor = { color: primary[400] };
            }
            break;

        case "destructive":
            if (isPressed) {
                buttonVariant = { backgroundColor: neutral[0] };
                labelTextColor = { color: "#CA0000" };
            } else {
                buttonVariant = { backgroundColor: neutral[0] };
                labelTextColor = { color: additional.error[0] };
            }
            break;
    }

    useEffect(() => {
        if (isLoading) {
            Animated.loop(
                Animated.timing(
                    rotateAnim,
                    {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                    }
                )
                ).start();
        }
    }, [isLoading]);

    return (
        <Pressable onPress={() => {
                        if ((onPressHandler && state === "active") && !isLoading) {
                            onPressHandler();
                        }
                   }}

                   onPressIn={() => setIsPressed(true)}
                   onPressOut={() => setIsPressed(false)}

                   style={[
                    styles.button,
                    buttonSize,
                    buttonVariant,
                    buttonBehavior
                   ]}>

            <Text style={[
                    styles.labelText,
                    labelTextColor
                  ]}
                >{label}</Text>

            { 
                isLoading && 
                <Animated.View  style={{
                    ...animatedStyle
                }}>

                    <Image  source={require("./../../assets/icon/spinner.png")}
                            style={styles.spinnerIcon} />
                </Animated.View>
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    // button container
    button: {
        minWidth: 100,
        maxWidth: 180,

        flexDirection: 'row',
        columnGap: 8,
        alignItems: "center",
        justifyContent: "center",
        
        borderRadius: 30
    },

    // size
    small: {
        height: 32,
        paddingVertical: 4,
        paddingHorizontal: 12
    },

    medium: {
        height: 38,
        paddingVertical: 6,
        paddingHorizontal: 14,
    },

    large: {
        height: 44,
        maxWidth: '100%',
        paddingVertical: 10,
        paddingHorizontal: 16
    },

    // label text
    labelText: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center'
    },

    spinnerIcon: {
        height: 15,
        width: 15
    }
});