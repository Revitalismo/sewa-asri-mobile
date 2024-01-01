import { StatusBar } from 'expo-status-bar';

import {
  Home,
  Welcome,
  Booking,
  Bookmark,
  BookingDetail,
  VillaDetail,
  VillaDetailDescription,
  SearchVilla,
  SearchResult,
  FeatureUnderDevelopment,
  Profile,
  ReviewsVilla,
  PaymentConfirmation,
  LoadingScreen
} from "./src/screens";

import { Login } from './src/screens/Auth/Login';
import { Register } from './src/screens/Auth/Register';
import { VerificationRegister } from './src/screens/Auth/VerificationRegister';
import { CreatePassword } from './src/screens/Auth/CreatePassword';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { neutral } from './src/constants/colors';

import { useEffect, useState } from 'react';

import { FilterContext, FilterProps } from './src/context/FilterContext';
import { PaymentContext, PaymentMethod } from './src/context/PaymentContext';
import { AuthContext, Auth } from './src/context/AuthContext';

import { auth } from './src/screens/Auth/auth';

const Stack = createNativeStackNavigator();
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ForgotPassword } from './src/screens/Auth/ForgotPassword';
import { VerificationForgotPassword } from './src/screens/Auth/VerificationForgotPassword';
import { ResetPassword } from './src/screens/Auth/ResetPassword';

interface ParamListBase {
  [routeName: string]: object | undefined;
}

function Layout() {
  const navigation:NativeStackNavigationProp<ParamListBase> = useNavigation();

  console.info("Layout")

  useEffect(() => {
    auth()
    .then((auth) => {
      console.info(auth)
      if (auth.authenticated) {
        navigation.navigate("home");
      } else {
        navigation.navigate("welcome");
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar />

      <Stack.Navigator 
          initialRouteName='loading-screen'

          screenOptions={{
            headerShown: false
          }}>

        <Stack.Screen name='loading-screen' component={LoadingScreen} />
        <Stack.Screen name='notification' component={FeatureUnderDevelopment} />
        <Stack.Screen name='message' component={FeatureUnderDevelopment} />
        <Stack.Screen name='profile' component={Profile} />
        
        <Stack.Screen name='villa-detail' component={VillaDetail} />
        <Stack.Screen name='villa-detail-description' component={VillaDetailDescription} />
        <Stack.Screen name='villa-reviews' component={ReviewsVilla} />

        <Stack.Screen name='search-villa' component={SearchVilla} />
        <Stack.Screen name='search-result' component={SearchResult} />

        <Stack.Screen name='booking' component={Booking} />
        <Stack.Screen name='booking-detail' component={BookingDetail} />
        <Stack.Screen name='payment-confirmation' component={PaymentConfirmation} />
        <Stack.Screen name='bookmark' component={Bookmark} />
        
        <Stack.Screen name='welcome' component={Welcome} />
        <Stack.Screen name='home' component={Home} />

        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='register' component={Register} />
        <Stack.Screen name='verification-register' component={VerificationRegister} />
        <Stack.Screen name='create-password' component={CreatePassword} />

        <Stack.Screen name='forgot-password' component={ForgotPassword} />
        <Stack.Screen name='verification-forgot-password' component={VerificationForgotPassword} />
        <Stack.Screen name='reset-password' component={ResetPassword} />

      </Stack.Navigator>

    </SafeAreaView>
  );
}

export default function App() {
    const [auth, setAuth] = useState<Auth>({
        authenticated: false,
        token: null
    });

    const [value, setFilter] = useState<FilterProps>({
        sortByPrice: "termurah",
        sortByLocation: "terdekat",
        sortByRooms: 2,
        searchHistory: []
    });

    const [payment, setPaymentMethod] = useState<PaymentMethod>({
        id: "d28bf8ca",
        name: "Bank BCA"
    });

    const theme = {
        dark: false,
        colors: {
            primary: neutral[400],
            background: neutral[0],
            card: neutral[400],
            text: neutral[400],
            border: neutral[400],
            notification: neutral[400]
        }
    }
  
    return (
        <>  
            <AuthContext.Provider value={{ auth, setAuth }}>
                <FilterContext.Provider value={{ value, setFilter }}>
                    <PaymentContext.Provider value={{ payment, setPaymentMethod }}>

                        <NavigationContainer theme={theme}>
                            <Layout />
                        </NavigationContainer>

                    </PaymentContext.Provider>
                </FilterContext.Provider>
            </AuthContext.Provider>
        </>
    );
}