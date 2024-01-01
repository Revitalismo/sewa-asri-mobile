import { Image, Pressable, Text, View, StyleSheet } from "react-native";

import villaData from "./../../data.json"
import { neutral } from "../constants/colors";

type ManagerProps = {
    managerId: string | undefined;
};

export function Manager({ managerId }: ManagerProps) {

    const manager = villaData.manager.find(
        (manager) => manager.managerId === managerId
    );
    
    return (
        <View  style={styles.manager}>

            <Text  style={styles.label}>Pengelola</Text>

            <View  style={styles.profile}>

                <View  style={styles.content}>

                    <Image  source={{ uri: manager?.photo }}
                            style={styles.image}
                            />

                    <View  style={styles.detail}>

                        <Text  style={styles.name}>{manager?.name}</Text> 

                        <Text  style={styles.role}>{manager?.role}</Text>
                    </View>
                </View>

                <Pressable  onPress={() => {
                    console.info(managerId);
                }}>

                    <Image  source={require("./../../assets/icon/dialog-icon.png")} 
                            style={styles.dialogIcon}
                            />
                
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    manager: {
        rowGap: 14
    },

    label: {
        fontSize: 16,
        fontWeight: '500',
        color: neutral[600]
    },

    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',

        columnGap: 14
    },

    detail: {
        rowGap: 4
    },

    image: {
        height: 50,
        width: 50,
        borderRadius: 50
    },

    name: {
        fontSize: 13,
        color: neutral[700],
    },

    role: {
        fontSize: 13,
        color: neutral[600],
    },

    dialogIcon: {
        height: 40,
        width: 40
    }
});