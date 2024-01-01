import { useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { neutral, primary } from "../constants/colors";

type ChipsProps = {
    label: string;
    state: boolean;
    variant: "active" | "passive" | "filter";
    onSelect?: () => void;
};

export function Chips({ label, state, variant, onSelect }:ChipsProps) {
    
    const chips = [
        styles.chips,
        !state ? styles.stateActive : styles.stateSelected
    ];

    const chipsLabel = [
        styles.labelText,
        !state ? styles.labelTextActive : styles.labelTextSelected
    ]

    switch (variant) {
        case "active":
            return (
                <Pressable  onPress={() => {
                                if (onSelect && variant === "active") {
                                    onSelect();
                                }
                            }}

                            style={chips}>

                    <Text  style={chipsLabel}>{label}</Text>
                </Pressable>
            );

        case "passive":
            return (
                <Pressable  style={chips}>

                    <Text  style={chipsLabel}>{label}</Text>
                </Pressable>
            );
    
        case "filter":
            return (
                <Pressable  onPress={() => {
                                if (onSelect && variant === "filter") {
                                    onSelect();
                                }
                            }}

                            style={styles.chipsFilter}>

                    <Image  source={require("./../../assets/icon/filter-icon.png")} 
                            style={styles.filterIcon}
                            />

                    <Text  style={styles.labelTextActive}>Filter</Text>
                </Pressable>
            );
    }
}

const styles = StyleSheet.create({
    chips: {
        paddingVertical: 10,
        paddingHorizontal: 14,

        height: 40,
        minWidth: 70,

        borderRadius: 30,
        borderWidth: 2
    },

    chipsFilter: {
        height: 40,
        width: 100,

        paddingVertical: 8,
        paddingHorizontal: 12,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,

        borderRadius: 30,
        borderWidth: 1,
        borderColor: neutral[200],
        backgroundColor: neutral[0]
    },

    stateActive: {
        backgroundColor: neutral[0],
        borderColor: neutral[200],
        borderWidth: 1
    },

    stateSelected: {
        backgroundColor: primary[400],
        borderColor: primary[200],
        borderWidth: 1
    },

    labelText: {
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'center'
    },

    labelTextActive: {
        color: neutral[500]
    },

    labelTextSelected: {
       color: primary[0]
    },
    
    filterIcon: {
        height: 21.5,
        width: 17.5
    }
});