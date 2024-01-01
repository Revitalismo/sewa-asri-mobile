import { StyleSheet, View, Text } from "react-native";
import { Chips, Header, SearchBar } from "../components";

import { neutral } from "../constants/colors";

import { useRef, useState, useContext } from "react";
import { FilterContext } from "../context/FilterContext";

import { useRoute, RouteProp } from "@react-navigation/native";
import { BottomSheet } from "../components/BottomSheet";

type RouteParams = {
    searchQuery: string;
};

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export function SearchResult() {
    const query = useRef("");
    const route = useRoute<RouteProp<ParamListBase, string>>();

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [data, setData] = useState("DATA");
    
    const { value, setFilter } = useContext(FilterContext);

    const { searchQuery } = route.params as RouteParams;

    console.info("Re-render SearchResult.tsx");
    
    console.info(value.searchHistory);

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
                                query.current = text;
                            }}

                            defaultValue={searchQuery}

                            onSearchHandler={() => {
                                setFilter({
                                    searchHistory: [
                                        ...(value.searchHistory || []), 
                                        {
                                            id: `${Math.random()}`,
                                            history: query.current
                                        }
                                    ]
                                });
                            }}
                            />

                <Chips  label="Filter"
                        variant="filter"
                        state={true}
                        onSelect={() => {
                            setShowFilter(true);
                        }}
                        />

                <View  style={styles.labelTotalResultWrapper} >
                    
                    <Text  style={styles.label} >
                        Hasil pencarian
                    </Text>

                    <Text  style={styles.totalResultLabel} >
                        42 Hasil
                    </Text>
                    
                </View>
            </View>

            <BottomSheet  variant="filter"
                          state={showFilter}
                          
                          onCloseHandler={() => {
                            setShowFilter(false);
                          }}
                          />
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

    labelTotalResultWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 10
    },

    label: {
        fontSize: 20,
        fontWeight: '700',
        color: neutral[700]
    },

    totalResultLabel: {
        fontSize: 16,
        fontWeight: '400',
        color: neutral[600]
    },
});