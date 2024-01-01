import { FlatList, StyleSheet, View } from "react-native";
import { BottomNavigation, Header, Card } from "../components";

import villaData from "./../../data.json";
import { neutral } from "../constants/colors";

export function Bookmark() {

    console.info("Re-render Bookmark.tsx");

    return (
        <>
            <Header variant="status"
                    label="Villa tersimpan"
                    navigateTo="goBack" />

            <View  style={styles.container}>

                <FlatList   data={villaData.villa}
                
                            renderItem={({ item }) => (
                                <Card   data={item} 
                                        variant="villa" 
                                        
                                        />
                            )} 

                            keyExtractor={item => item.villaId}

                            ItemSeparatorComponent={() => <View style={{height: 16}} />}

                            // style={styles.newestVillaList}
                            showsVerticalScrollIndicator={false}
                            />
            </View>

            <BottomNavigation />
        </>
    );    
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        paddingTop: 32,
        paddingBottom: 32,
        maxHeight: 620,
        paddingHorizontal: 16,
        
        backgroundColor: neutral[0],

        flex: 1,
    },
});