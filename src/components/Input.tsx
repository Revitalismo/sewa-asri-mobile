import { Text, View, TextInput, Image, Pressable, StyleSheet } from "react-native";
import { additional, neutral } from "../constants/colors";
import { useRef, useState } from "react";

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ParamListBase {
    [routeName: string]: object | undefined;
}

type InputProps = {
    variant: "text" | "email" | "password" | "number";
    label?: string;
    required?: boolean;
    placeholder: string;
    showMessage?: boolean;
    message?: string;
    onInputHandler?: (text: string | number) => void;
    onPressHandler?: () => void;
}

export function Input({ 
        variant, 
        label = "label", 
        required = false,
        placeholder,
        showMessage = false,
        message,
        onInputHandler,
        onPressHandler
    }:InputProps) {
    const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();
    
    const inputRef = useRef<string | number>("");
    
    const [hidePassword, setHidePassword] = useState<boolean>(true);

    switch (variant) {
        case "text":
            return (
                <View  style={style.input}>

                    <View  style={style.labelOptionWrapper}>

                        <Text  style={style.labelText}>{label}</Text>

                        { 
                            required ? ( 
                                <Text style={style.labelText}>wajib</Text>
                            ) : ( 
                                <View style={style.invisibleShape} /> 
                            ) 
                        }
                        
                    </View>
        
                    <View   style={[
                                style.textField,
                                { 
                                    height: 150,
                                    alignItems: 'flex-start'
                                },
                            ]}>

                        <TextInput  placeholder={placeholder} 
                                    placeholderTextColor={neutral[400]}
                                    
                                    style={[
                                        // style.textInput,
                                        { height: '100%' }
                                    ]} 

                                    onChangeText={(text) => {
                                        if (onInputHandler) {
                                            onInputHandler(text);
                                        }
                                    }}

                                    onPressIn={() => {
                                        if (onPressHandler) {
                                            onPressHandler();
                                        }
                                    }}
                                    />
                    </View>
                    
                    {
                        showMessage ? (
                            <Text  style={style.message} >
                                Pesan: { message }
                            </Text>
                        ) : (
                            null
                        )
                    }
                </View>
            );       

        case "email":
            return (
                <View  style={style.input}>

                    <View  style={style.labelOptionWrapper}>

                        <Text  style={style.labelText}>Email</Text>

                        { 
                            required ? ( 
                                <Text style={style.optionText}>wajib</Text>
                            ) : ( 
                                <View style={style.invisibleShape} /> 
                            )
                        }
                    </View>
        
                    <View  style={style.textField}>

                    <TextInput  placeholder={placeholder} 
                                placeholderTextColor={neutral[400]} 
                                style={style.textInput}

                                onChangeText={(text) => {
                                    if (onInputHandler) {
                                        onInputHandler(text);
                                    }
                                }}

                                onPressIn={() => {
                                    if (onPressHandler) {
                                        onPressHandler();
                                    }
                                }}

                                inputMode="email"
                                />
                    </View>

                    {
                        showMessage ? (
                            <Text  style={style.message} >
                                Pesan: { message }
                            </Text>
                        ) : (
                            null
                        )
                    }
                </View>
            );       
    
        case "password":
            return (
                <View  style={style.input}>

                    <View  style={style.labelOptionWrapper}
                    >
                        <Text  style={style.labelText}>{label}</Text>

                        {
                            required ? (
                                <Text style={style.optionText}>wajib</Text>
                            ) : (
                                <Pressable  onPress={() => {
                                    navigation.navigate("forgot-password");
                                }}>
                                    <Text style={style.optionText}>lupa password</Text>
                                </Pressable>
                            )
                        }
                        
                    </View>
        
                    <View  style={style.textField}>
                        <TextInput  placeholder={placeholder} 
                                    placeholderTextColor={neutral[400]} 
                                    style={style.textInput}

                                    onChangeText={(text) => {
                                        if (onInputHandler) {
                                            onInputHandler(text);
                                        }
                                    }}

                                    onPressIn={() => {
                                        if (onPressHandler) {
                                            onPressHandler();
                                        }
                                    }}

                                    inputMode="text"

                                    secureTextEntry={hidePassword}
                                    />

                        <Pressable  onPress={() => {
                            hidePassword ? setHidePassword(false) : setHidePassword(true);
                        }}>
                            {
                                hidePassword ? (
                                    <Image  source={require("./../../assets/icon/eye-open-icon.png")} 
                                            style={style.icon}/>
                                ) : (
                                    <Image  source={require("./../../assets/icon/eye-closed-icon.png")} 
                                            style={style.icon} />
                                )
                            }

                        </Pressable>
                    </View>
                    
                    {
                        showMessage ? (
                            <Text  style={style.message} >
                                Pesan: { message }
                            </Text>
                        ) : (
                            null
                        )
                    }
                </View>
            );
            
        case "number":
            return (
                <View  style={style.input}>

                    <View  style={style.labelOptionWrapper}>

                        <Text style={style.labelText}>{label}</Text>

                        { 
                            required ? (
                                <Text style={style.optionText}>wajib</Text> 
                            ) : ( 
                                <View style={style.invisibleShape} /> 
                            )
                        }
                    </View>
        
                    <View  style={style.textField}>
                        <TextInput  placeholder={placeholder} 
                                    placeholderTextColor={neutral[400]} 
                                    style={style.textInput}
                                    
                                    inputMode="numeric"
                                    keyboardType="numeric"

                                    onChangeText={(text) => {
                                        if (onInputHandler) {
                                            onInputHandler(text);
                                        }
                                    }}

                                    onPressIn={() => {
                                        if (onPressHandler) {
                                            onPressHandler();
                                        }
                                    }}
                                    />
                    </View>
                    
                    {
                        showMessage ? (
                            <Text  style={style.message} >
                                Pesan: { message }
                            </Text>
                        ) : (
                            null
                        )
                    }
                </View>
            );
        
    }
}

const style = StyleSheet.create({
    input: {
        rowGap: 10,
        minHeight: 71,
    },

    labelOptionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    labelText: {
        color: neutral[700],
        fontSize: 13,
        fontWeight: '400'
    },

    optionText: {
        color: neutral[500],
        fontSize: 13,
        fontWeight: '400'
    },

    message: {
        color: additional.error[0],
        fontSize: 13,
        fontWeight: '400'
    },

    textField: {
        height: 45,
        paddingVertical: 10,
        paddingHorizontal: 14,

        borderRadius: 8,

        backgroundColor: neutral[100],
        borderColor: neutral[200],
        borderWidth: 1,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 16
    },

    textInput: {
        flex: 2,
        color: neutral[600],
        borderWidth: 0
    },

    invisibleShape: {
        height: 10,
        width: 10
    },

    icon: {
        flex: 1,
        height: 24,
        width: 24
    }
});