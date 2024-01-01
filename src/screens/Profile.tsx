import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { Header, BottomNavigation, Modal } from "../components";
import { additional, neutral } from "../constants/colors";

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState, useRef } from "react";
import { auth, setAuth } from "./Auth/auth";

import { userId } from "./Auth/auth";
import { useGetUser } from "../hooks/useUser";
import { useLogout } from "../hooks/useAuth";

interface ParamListBase {
    [routeName: string]: object | undefined;
}

type User = {
    name: string | null,
    email: string | null
}

type ConfirmLogout = {
    showConfirmLogout: boolean;
    logout: boolean;
}

export function Profile() {
    const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();
    const [confirmLogout, setConfirmLogout] = useState<ConfirmLogout>({
        showConfirmLogout: false,
        logout: false
    }); 

    const userRef = useRef<User>({
        name: null,
        email: null
    });

    const { data, trigger, isMutating } = useGetUser();
    const { trigger:logout } = useLogout();

    if (data) {
        userRef.current = {
            name: data.doc[0].name,
            email: data.doc[0].email
        }
    }

    function onLogout() {
        auth().then((value) => {
            if (value.token) {
                logout({ token: value.token })

                .then((response) => {
                    if (response.status === "success") {
                        setAuth({
                            token: null,
                            authenticated: false
                        });
                        navigation.navigate("welcome");
                    }
                })

                .catch((error) => {
                    console.info(error);
                });
            }
        });
    }
    
    useEffect(() => {
        userId().then((id) => {
            if (id) {
                console.info(id);
                trigger({ userId: id });
            }
        });
    }, []);

    return (
        <>
            <Header  variant="status"
                     label="Profil"
                     navigateTo="goBack" />

            <View  style={styles.container}>
                
                <View  style={styles.profile}>

                    <Image  source={require("./../../assets/default-profile.jpeg")}
                            style={styles.photo}
                            />

                    <View  style={styles.profileDetail} >

                        {
                            
                            !isMutating ? (
                                <>
                                    <Text  style={styles.name} >
                                        { userRef.current.name }
                                    </Text>

                                    <Text  style={styles.email} >
                                        { userRef.current.email }
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <View   style={styles.skelethon} />
                                    <View   style={styles.skelethon} />
                                </>
                            )
                        }
                    </View>
                </View>

                <View  style={styles.option} >

                    <View  style={styles.labelIconWrapper} >

                        <Image  source={require("./../../assets/icon/pen.png")} 
                                style={styles.icon}
                                />
                        
                        <Text  style={styles.label} >
                            Edit informasi pribadi
                        </Text>
                    </View>

                    <Pressable>
                        <Image  source={require("./../../assets/icon/chevron-right.png")}
                                style={styles.icon}
                                />
                    </Pressable>
                </View>

                <View  style={styles.option} >

                    <View  style={styles.labelIconWrapper} >

                        <Image  source={require("./../../assets/icon/settings.png")} 
                                style={styles.icon}
                                />
                        
                        <Text  style={styles.label} >
                            Pengaturan
                        </Text>
                    </View>

                    <Pressable>
                        <Image  source={require("./../../assets/icon/chevron-right.png")}
                                style={styles.icon}
                                />
                    </Pressable>
                </View>

                <View  style={styles.option} >

                    <View  style={styles.labelIconWrapper} >

                        <Image  source={require("./../../assets/icon/chat.png")}
                                style={styles.icon}
                                />
                        
                        <Text  style={styles.label} >
                            Pusat bantuan
                        </Text>
                    </View>

                    <Pressable>
                        <Image  source={require("./../../assets/icon/chevron-right.png")}
                                style={styles.icon}
                                />
                    </Pressable>
                </View>

                <View  style={styles.option} >

                    <View  style={styles.labelIconWrapper} >

                        <Image  source={require("./../../assets/icon/logout.png")}
                                style={styles.icon}
                                />
                        
                        <Text   style={[
                                    styles.label,
                                    { color: additional.error[0] }
                                ]} >

                            Keluar
                        </Text>
                    </View>

                    <Pressable  onPress={() => {
                                    setConfirmLogout({
                                        showConfirmLogout: true,
                                        logout: false
                                    });
                                }} >

                        <Image  source={require("./../../assets/icon/chevron-right.png")}
                                style={[
                                    styles.icon,
                                    { tintColor: additional.error[0] }
                                ]}
                                />
                    </Pressable>
                </View>

                <Modal  variant="default"
                        title="Keluar"
                        description="Apakah kamu ingin mengeluarkan akun mu dari perangkat ini?"
                        
                        action1Label="Iya, keluar"
                        action2Label="Tidak"

                        state={confirmLogout.showConfirmLogout}

                        action1Handler={() => {
                            setConfirmLogout({
                                showConfirmLogout: false,
                                logout: true
                            });

                            onLogout();
                        }}

                        action2Handler={() => {
                            setConfirmLogout({
                                showConfirmLogout: false,
                                logout: false
                            });
                        }}
                        />
                
            </View>

            <BottomNavigation />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        marginTop: 32,
        paddingHorizontal: 16,
        
        backgroundColor: neutral[0],

        flex: 1,
        rowGap: 28
    },

    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16
    },

    photo: {
        height: 80,
        width: 80,
        borderRadius: 80
    },

    profileDetail: {
        rowGap: 4
    },

    skelethon: {
        height: 15,
        width: 200,
        backgroundColor: neutral[200],
        borderRadius: 4
    },

    name: {
        fontSize: 13,
        fontWeight: '500',
        color: neutral[700]
    },

    email: {
        fontSize: 13,
        fontWeight: '400',
        color: neutral[500]
    },

    option: {
        paddingVertical: 14,
        paddingHorizontal: 24,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: neutral[0],
        borderRadius: 8,
        borderColor: neutral[100],
        borderWidth: 1
    },

    labelIconWrapper: {
        flexDirection: 'row',
        columnGap: 20,
        alignItems: 'center'
    },

    label: {
        fontSize: 13,
        fontWeight: '400',
        color: neutral[600]
    },

    icon: {
        height: 24,
        width: 24
    },
});