import { View, TextInput, Image, StyleSheet, Pressable, Text } from "react-native";
import { neutral, primary } from "../constants/colors";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type SearchProps = {
    variant: "link-navigation" | "search";
    placeholder: string;
    defaultValue?: string;
    onChangeHandler?: (text: string) => void;
    onSearchHandler?: () => void;
}

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function SearchBar({ 
        placeholder, 
        variant, 
        onChangeHandler, 
        onSearchHandler,
        defaultValue = ""
    }:SearchProps) {

    const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();

    switch (variant) {
        case "link-navigation":
            return (
                <Pressable  style={style.searchBar} 
                            
                            onPress={() => {
                                navigation.navigate("search-villa");
                            }}>
        
                    <Text  style={style.placeholderLabel} >
                        { placeholder }
                    </Text>
        
                    <Image  source={require("./../../assets/icon/search-icon.png")}
                            style={style.icon} 
                            />
                </Pressable>
            );
            

        case "search":
            return (
                <View  style={style.searchBar}>
        
                    <TextInput  style={style.textInput}
                                
                                placeholder={placeholder}
                                placeholderTextColor={neutral[300]}
                                
                                defaultValue={defaultValue}

                                inputMode="text"
                                keyboardType="web-search"
                                
                                returnKeyType="search"

                                onChangeText={(text) => {
                                    if (onChangeHandler) {
                                        onChangeHandler(text);
                                    }
                                }}

                                onSubmitEditing={() => {
                                    if (onSearchHandler) {
                                        onSearchHandler();
                                    }
                                }}
                                />
                   
                    <Image  source={require("./../../assets/icon/search-icon.png")}
                            style={style.icon} 
                            />
                    
                </View>
            );
    
    }
}

const style = StyleSheet.create({
    searchBar: {
        height: 50,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 50,
        overflow: 'hidden',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 16,

        backgroundColor: neutral[0],
        borderWidth: 1,
        borderColor: neutral[200],
    },

    placeholderLabel: {
        fontSize: 13,
        color: neutral[300]
    },

    textInput: {
        flex: 2,

        fontSize: 13,
        color: neutral[600],

        borderWidth: 0,
    },

    icon: {
        height: 18,
        width: 18
    }
});