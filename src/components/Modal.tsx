import { StyleSheet, Text, View, Animated } from "react-native";
import { Button } from "./Button";
import { neutral } from "../constants/colors";
import { useEffect, useRef } from "react";

type Modal = {
    variant: "default" | "desctructive";
    title: string;
    state: boolean;
    description: string;
    action1Label: string;
    action2Label: string;
    action1Handler?: () => void;
    action2Handler?: () => void;
}

export function Modal({ 
        variant,
        title,
        description,
        action1Label,
        action2Label,
        action1Handler,
        action2Handler,
        state = false
    }: Modal) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    function fadeIn() {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    function fadeOut() {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        if (state) {
            fadeIn();
        } else {
            fadeOut();
        }
    }, [state]);

    return (
        <Animated.View  style={[
                            styles.modal,
                            { opacity: fadeAnim }
                        ]} >

            <View  style={styles.detail} >

                <Text  style={styles.title} >
                    { title }
                </Text>

                <Text  style={styles.description} >
                    { description }
                </Text>
            </View>

            {
                variant === "default" ? 
                    <View  style={styles.actions} >

                        <Button  behavior="hug-content" 
                                 size="medium"         
                                 variant="secondary"
                                 state="active"
                                 label={action1Label}
                                
                                 onPressHandler={() => {
                                    if (action1Handler) {
                                        action1Handler();
                                    }
                                 }}
                                 />

                        <Button  behavior="hug-content" 
                                 size="medium"         
                                 variant="primary"
                                 state="active"
                                 label={action2Label}
                                
                                 onPressHandler={() => {
                                    if (action2Handler) {
                                        action2Handler();
                                    }
                                 }}
                                 />
                    </View>
                :
                    <View  style={styles.actions} >

                        <Button  behavior="hug-content" 
                                 size="medium"         
                                 variant="destructive"
                                 state="active"
                                 label={action1Label}
                                
                                 onPressHandler={() => {
                                    if (action1Handler) {
                                        action1Handler();
                                    }
                                 }}
                                 />

                        <Button  behavior="hug-content" 
                                 size="medium"         
                                 variant="primary"
                                 state="active"
                                 label={action2Label}
                                
                                 onPressHandler={() => {
                                    if (action2Handler) {
                                        action2Handler();
                                    }
                                 }}
                                 />
                    </View>
            }
            
        </Animated.View>
    );
    
}

const styles = StyleSheet.create({
    modal: {
        paddingVertical: 24,
        paddingHorizontal: 16,

        rowGap: 24,

        backgroundColor: neutral[0],
        borderColor: neutral[200],
        borderWidth: 1,
        borderRadius: 8,
        
        position: "absolute",
        top: 50,
        left: 16,
        right: 16
    },

    detail: {
        rowGap: 10
    },

    title: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[700]
    },

    description: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 24,
        color: neutral[600]
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        columnGap: 10
    }

});