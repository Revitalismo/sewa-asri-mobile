import { Image, View, Text, StyleSheet, Dimensions } from "react-native";
import { additional, neutral } from "../constants/colors";
import { useState } from "react";

type ReviewsPanelProps = {
    data: {
        overallRatingDetail: number,
        totalReviews: number,

        total_rating_1: number,
        total_rating_2: number,
        total_rating_3: number,
        total_rating_4: number,
        total_rating_5: number
    }
}

type ReviewCardProps = {
    data: {
        id: string;
        user: {
            name: string,
            photo: string
        }
        date: string;
        rating: number;
        comment: string;
    }
}

export function ReviewsPanel( { data }: ReviewsPanelProps ) {
    const { 
        overallRatingDetail,
        totalReviews,
        total_rating_1,
        total_rating_2,
        total_rating_3,
        total_rating_4,
        total_rating_5,
    } = data;

    const [barContainerWidth, setBarContainerWidth] = useState(50);

    return (
        <View  style={reviewsPanel.container} >

            <View  style={reviewsPanel.overallRating} >

                <View  style={reviewsPanel.pointStarWrapper} >

                    <Image  source={require("./../../assets/icon/star-icon.png")} 
                            style={reviewsPanel.pointStarWrapper} 
                            />

                    <Text  style={reviewsPanel.overallRatingDetail} >
                        { overallRatingDetail }
                    </Text>
                </View>

                <Text  style={reviewsPanel.totalReviews} >
                    { totalReviews } Ulasan
                </Text>

            </View>

            <View  style={reviewsPanel.reviewsList} >

                <View   style={reviewsPanel.reviewsContainer} 
                        
                        onLayout={({ nativeEvent }) => {
                            setBarContainerWidth(nativeEvent.layout.width);
                        }}>

                    <View  style={reviewsPanel.pointStarWrapper} >

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                style={reviewsPanel.pointStarIcon} 
                                />
                        
                        <Text  style={reviewsPanel.pointLabel} >
                            5
                        </Text>

                        <View   style={[
                                    reviewsPanel.barContainer,
                                    { width: barContainerWidth - 120 }
                                ]} >

                            <View   style={[
                                        reviewsPanel.bar,
                                        { width: (total_rating_5 / totalReviews) * barContainerWidth }
                                    ]} />
                        </View>
                    </View>

                    <Text  style={reviewsPanel.reviewsDetail} >
                        { total_rating_5 } Ulasan
                    </Text>
                </View>

                <View   style={reviewsPanel.reviewsContainer} >

                    <View  style={reviewsPanel.pointStarWrapper} >

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                style={reviewsPanel.pointStarIcon} 
                                />
                        
                        <Text  style={reviewsPanel.pointLabel} >
                            4
                        </Text>

                        <View   style={[
                                    reviewsPanel.barContainer,
                                    { width: barContainerWidth - 120 }
                                ]} >

                            <View   style={[
                                        reviewsPanel.bar,
                                        { width: (total_rating_4 / totalReviews) * barContainerWidth }
                                    ]} />
                        </View>
                    </View>

                    <Text  style={reviewsPanel.reviewsDetail} >
                        { total_rating_4 } Ulasan
                    </Text>
                </View>

                <View   style={reviewsPanel.reviewsContainer} >

                    <View  style={reviewsPanel.pointStarWrapper} >

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                style={reviewsPanel.pointStarIcon} 
                                />
                        
                        <Text  style={reviewsPanel.pointLabel} >
                            3
                        </Text>

                        <View   style={[
                                    reviewsPanel.barContainer,
                                    { width: barContainerWidth - 120 }
                                ]} >

                            <View   style={[
                                        reviewsPanel.bar,
                                        { width: (total_rating_3 / totalReviews) * barContainerWidth }
                                    ]} />
                        </View>
                    </View>

                    <Text  style={reviewsPanel.reviewsDetail} >
                        { total_rating_3 } Ulasan
                    </Text>
                </View>

                <View   style={reviewsPanel.reviewsContainer} >

                    <View  style={reviewsPanel.pointStarWrapper} >

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                style={reviewsPanel.pointStarIcon} 
                                />
                        
                        <Text  style={reviewsPanel.pointLabel} >
                            2
                        </Text>

                        <View   style={[
                                    reviewsPanel.barContainer,
                                    { width: barContainerWidth - 120 }
                                ]} >

                            <View   style={[
                                        reviewsPanel.bar,
                                        { width: (total_rating_2 / totalReviews) * barContainerWidth }
                                    ]} />
                        </View>
                    </View>

                    <Text  style={reviewsPanel.reviewsDetail} >
                        { total_rating_2 } Ulasan
                    </Text>
                </View>

                <View   style={reviewsPanel.reviewsContainer} >

                    <View  style={reviewsPanel.pointStarWrapper} >

                        <Image  source={require("./../../assets/icon/star-icon.png")} 
                                style={reviewsPanel.pointStarIcon} 
                                />
                        
                        <Text  style={reviewsPanel.pointLabel} >
                            1
                        </Text>

                        <View   style={[
                                    reviewsPanel.barContainer,
                                    { width: barContainerWidth - 120 }
                                ]} >

                            <View   style={[
                                        reviewsPanel.bar,
                                        { width: (total_rating_1 / totalReviews) * barContainerWidth }
                                    ]} />
                        </View>
                    </View>

                    <Text  style={reviewsPanel.reviewsDetail} >
                        { total_rating_1 } Ulasan
                    </Text>
                </View>

            </View>
        </View>
    );
}

export function ReviewsCard( { data }: ReviewCardProps ) {
    const { user, date, rating, comment } = data;

    return (
        <View  style={reviewsCard.container} >

            <Image  source={{ uri: user.photo }} 
                    style={reviewsCard.profile} 
                    />

            <View  style={reviewsCard.detail} >

                <View  style={reviewsCard.usernameDateWrapper} >
                    
                    <Text  style={reviewsCard.username} >
                        { user.name }
                    </Text>

                    <Text  style={reviewsCard.date} >
                        { date }
                    </Text>
                </View>

                <View  style={reviewsCard.rating} >

                    <View  style={reviewsCard.stars} >

                        <Image  source={require("./../../assets/icon/star-icon.png")}
                                style={[
                                    reviewsCard.starIcon,
                                    { tintColor: rating >= 1 ? additional.yellow[0] : neutral[300] }
                                ]}
                                 />

                        <Image  source={require("./../../assets/icon/star-icon.png")}
                                style={[
                                    reviewsCard.starIcon,
                                    { tintColor: rating >= 2 ? additional.yellow[0] : neutral[300] }
                                ]}
                                 />

                        <Image  source={require("./../../assets/icon/star-icon.png")}
                                style={[
                                    reviewsCard.starIcon,
                                    { tintColor: rating >= 3 ? additional.yellow[0] : neutral[300] }
                                ]}
                                 />
                        <Image  source={require("./../../assets/icon/star-icon.png")}
                                style={[
                                    reviewsCard.starIcon,
                                    { tintColor: rating >= 4 ? additional.yellow[0] : neutral[300] }
                                ]}
                                 />

                        <Image  source={require("./../../assets/icon/star-icon.png")}
                                style={[
                                    reviewsCard.starIcon,
                                    { tintColor: rating >= 5 ? additional.yellow[0] : neutral[300] }
                                ]}
                                 />

                    </View>

                    <Text  style={reviewsCard.ratingPoint} >
                        { rating }
                    </Text>
                </View>

                <Text  style={reviewsCard.comment} >
                    { comment }
                </Text>

            </View>
        </View>
    );
}

const reviewsPanel = StyleSheet.create({
    container: {
        width: '100%',
        rowGap: 24,
        alignItems: 'center'
    },

    overallRating: {
        rowGap: 10
    },

    pointStarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },

    overallRatingDetail: {
        fontSize: 25,
        fontWeight: '500',
        color: neutral[700]
    },

    overallRatingIcon: {
        height: 30,
        width: 28.5
    },

    totalReviews: {
        fontSize: 16,
        color: neutral[500]
    },

    reviewsList: {
        width: '100%',
        rowGap: 6
    },

    reviewsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: 16,
        width: '100%'
    },

    reviewsDetail: {
        fontSize: 13,
        color: neutral[500],
        height: 20
    },

    pointBarWrapper: {
        width: '100%',
        flexDirection: 'row',
        columnGap: 8
    },
    
    pointLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: neutral[700]
    },

    pointStarIcon: {
        height: 16,
        width: 15.9
    },

    barContainer: {
        height: 10,
        backgroundColor: neutral[200],

        borderRadius: 8,
        overflow: 'hidden'
    },

    bar: {
        height: 10,
        backgroundColor: neutral[400],

        borderTopRightRadius: 4,
        borderBottomRightRadius: 4
    }

});

const reviewsCard = StyleSheet.create({
    container: {
        height: 150,
        width: Dimensions.get("screen").width - 32,
        overflow: 'hidden',
        flexDirection: 'row',
        columnGap: 14
    },

    profile: {
        height: 60,
        width: 60,
        borderRadius: 60
    },

    detail: {
        width: Dimensions.get("screen").width - 106,
        rowGap: 8
    },

    usernameDateWrapper: {
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 10
    },

    username: {
        fontSize: 13,
        color: neutral[600],
        flexDirection: 'row',
    },

    date: {
        fontSize: 10,
        color: neutral[500],
    },

    rating: {
        flexDirection: 'row',
        columnGap: 10
    },

    stars: {
        flexDirection: 'row',
        columnGap: 4
    },

    ratingPoint: {
        fontSize: 13,
        color: neutral[500]
    },

    starIcon: {
        height: 16,
        width: 15.2
    },

    comment: {
        textAlign: 'justify',
        fontSize: 13,
        lineHeight: 24,
        color: neutral[500]
    }
});