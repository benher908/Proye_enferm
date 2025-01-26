import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import RegistroScreen from "../screen/RegistroScreen";
import { RootStackParamList } from "../types/navigation";
import Home from "../screen/Home" ;
import Perfil from "../screen/Perfil";
import Tratamiento from "../screen/Tratamiento";
import Configuracion from "../screen/Configuracion";

const Stack = createStackNavigator<RootStackParamList>(); // Aplica los tipos

const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegistroScreen"
                component={RegistroScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Tratamiento"
                component={Tratamiento}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Configuracion"
                component={Configuracion}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
