import { ScrollView, View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Chips, Header, ReviewsPanel, ReviewsCard, ReviewsBottomBar, Button } from "../components";
import { neutral } from "../constants/colors";

type SortReviewsBy = "newest" | "lastest" | "best" | "worst";

import reviews from "./../../data/reviews.json";
import { useState } from "react";
import { BottomSheet } from "../components/BottomSheet";

export function ReviewsVilla() {
    const [showReviewsSheet, setShowReviewsSheet] = useState<boolean>(false);
    const [sortReviewsBy, setSortReviewsBy] = useState<SortReviewsBy>("newest");

    return (
        <>
            <Header  variant="navigation"
                     label="Ulasan"
                     navigateTo="goBack" />

            <View  style={styles.container} >

                <ReviewsPanel  data={reviews.overallRatting} />

                <View  style={styles.reviews} >

                    <Text  style={styles.label} >
                        Daftar ulasan
                    </Text>

                    <ScrollView     horizontal={true} 
                                    // style={{ height: 45 }} 
                                    contentContainerStyle={{ alignItems: 'center' }}
                                    >

                        <Chips  label="Terbaru"
                                variant="active"
                                state={sortReviewsBy === "newest" ? true : false}
                                
                                onSelect={() => {
                                    setSortReviewsBy("newest");
                                }}
                                />
                        <View  style={{ width: 12 }} />

                        <Chips  label="Terlama"
                                variant="active"
                                state={sortReviewsBy === "lastest" ? true : false}

                                onSelect={() => {
                                    setSortReviewsBy("lastest");
                                }}
                                />
                        <View  style={{ width: 12 }} />

                        <Chips  label="Terbaik"
                                variant="active"
                                state={sortReviewsBy === "best" ? true : false}

                                onSelect={() => {
                                    setSortReviewsBy("best");
                                }}
                                />
                        <View  style={{ width: 12 }} />

                        <Chips  label="Terburuk"
                                variant="active"
                                state={sortReviewsBy === "worst" ? true : false}

                                onSelect={() => {
                                    setSortReviewsBy("worst");
                                }}
                                />
                    </ScrollView>

                    <FlatList   data={reviews.reviews}
                                style={{ height: 250 }}
                                    
                                renderItem={({ item }) => (
                                    <ReviewsCard  data={item} />
                                )}

                                keyExtractor={item => item.id}

                                ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
                                showsVerticalScrollIndicator={false}
                                />
                    
                    <Button     size="large"
                                label="Beri ulasan"
                                variant="primary"
                                state="active"
                                behavior="fill-container"

                                onPressHandler={() => {
                                    setShowReviewsSheet(true);
                                }}
                                />
                </View>
            </View>

            <BottomSheet    variant="reviews"
                            state={showReviewsSheet}

                            onCloseHandler={() => {
                                setShowReviewsSheet(false);
                            }}
                            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        paddingHorizontal: 16,
        rowGap: 24
    },

    label: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[700]
    },

    reviews: {
        rowGap: 16
    }
});