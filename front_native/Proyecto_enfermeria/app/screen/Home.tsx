import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "@/components/ui/card";

const UserHome: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Text style={styles.welcomeText}>¡Bienvenido/a!</Text>
                <Text style={styles.descriptionText}>Selecciona una opción para continuar:</Text>
            </Card>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.profileButton]}
                    onPress={() => navigation.navigate("Perfil")}
                >
                    <Text style={styles.buttonText}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.treatmentsButton]}
                    onPress={() => navigation.navigate("Tratamiento")}
                >
                    <Text style={styles.buttonText}>Tratamientos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.settingsButton]}
                    onPress={() => navigation.navigate("Configuracion")}
                >
                    <Text style={styles.buttonText}>Configuración</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f0f4f8",
    },
    card: {
        marginBottom: 20,
        padding: 30,
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    descriptionText: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 15,
    },
    button: {
        width: "80%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    profileButton: {
        backgroundColor: "#4CAF50",
    },
    treatmentsButton: {
        backgroundColor: "#2196F3",
    },
    settingsButton: {
        backgroundColor: "#FF9800",
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "600",
    },
});

export default UserHome;
