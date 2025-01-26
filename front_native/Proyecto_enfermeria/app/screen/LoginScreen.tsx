import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image
} from "react-native";
import api from "../api";
import AuthLayout from "../layouts/AuthLayout";

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [nss, setNss] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleLogin = async () => {
        try {
            const response = await api.post("/login", { nss, contrasena });
            Alert.alert("Login exitoso", `Bienvenido, ${response.data.nombre_completo}`);
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Error", error.response?.data?.error || "Credenciales incorrectas");
        }
    };

    return (
        <AuthLayout>
            <View style={styles.container}>
                <Image source={require("../../assets/images/Logo.jpg")} style={styles.logo} />
                <Text style={styles.title}>PillPal</Text>
                <TextInput
                    placeholder="NSS (Número de Seguridad Social)"
                    placeholderTextColor="#5E6472"
                    value={nss}
                    onChangeText={setNss}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#5E6472"
                    secureTextEntry
                    value={contrasena}
                    onChangeText={setContrasena}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("RegistroScreen")}
                    style={styles.registerLink}
                >
                    <Text style={styles.registerText}>¿No tienes cuenta? Regístrate aquí</Text>
                </TouchableOpacity>
            </View>
        </AuthLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAF3DD",
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#5E6472",
        marginBottom: 20,
    },
    input: {
        width: 150,
        backgroundColor: "#B8F2E6",
        borderColor: "#AED9E0",
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        color: "#5E6472",
    },
    loginButton: {
        width: "100%",
        backgroundColor: "#5E6472",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    loginButtonText: {
        color: "#FAF3DD",
        fontSize: 16,
        fontWeight: "bold",
    },
    registerLink: {
        marginTop: 20,
    },
    registerText: {
        color: "#5E6472",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});

export default LoginScreen;
