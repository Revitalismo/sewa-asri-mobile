import { Text, View, StyleSheet } from "react-native";
import { neutral } from "../constants/colors";
import { ActivityIndicator } from 'react-native';

export function LoadingScreen() {
    return (
        <View   style={styles.container}>
            <ActivityIndicator size="large" color={neutral[400]} />
            <Text>
                Loading...
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        paddingTop: 32,
        paddingHorizontal: 16,
        
        backgroundColor: neutral[0],

        flex: 1,
        rowGap: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});