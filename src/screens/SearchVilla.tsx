import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Chips, Header, SearchBar } from "../components";

import { neutral } from "../constants/colors";

import { useRef, useContext } from "react";
import { FilterContext } from "../context/FilterContext";

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function SearchVilla() {
    const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();
    const searchQuery = useRef("");
    const { value, setFilter } = useContext(FilterContext);

    console.info("Re-render SearchVilla.tsx");

    return (
        <>
            <Header  variant="navigation"
                     navigateTo="goBack"
                     label="Cari villa" 
                     />

            <View  style={styles.container} >

            
                <SearchBar  variant="search"
                            placeholder="Masukan nama villa"
                            
                            onChangeHandler={(text) => {
                                searchQuery.current = text;
                            }}
                            
                            onSearchHandler={() => {
                                navigation.navigate('search-result', { searchQuery: searchQuery.current });
                                
                                setFilter({
                                    sortByPrice: "termurah",
                                    sortByLocation: "terdekat",
                                    sortByRooms: 2,

                                    searchHistory: [
                                        ...(value.searchHistory || []), 
                                        {
                                            id: `${Math.random()}`,
                                            history: searchQuery.current
                                        }
                                    ]
                                });
                                
                            }}
                            />

                <View  style={styles.searchHistory} >
                    
                    <Text  style={styles.historyLabel} >
                        History pencarian
                    </Text>

                    <FlatList   data={value.searchHistory}
                                
                                renderItem={({ item }) => (

                                    <Chips  label={item.history} 
                                            state={false} 
                                            variant="passive"
                                            />
                                )}

                                keyExtractor={(item) => item.id}

                                columnWrapperStyle={styles.historyList}
                                numColumns={2}

                                ItemSeparatorComponent={() => (
                                    <View  style={{height: 10}} />
                                )}
                                />
                    
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        paddingTop: 32,
        paddingHorizontal: 16,
        
        backgroundColor: neutral[0],

        flex: 1,
        rowGap: 28
    },

    searchHistory: {
        rowGap: 12
    },

    historyLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[600]
    },

    historyList: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        columnGap: 10
    }
});