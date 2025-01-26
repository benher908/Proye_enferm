import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Card } from "@/components/ui/card";

const Tratamiento: React.FC = () => {
    const [treatmentStatus, setTreatmentStatus] = useState("En proceso");

    const handleEndTreatment = () => {
        Alert.alert(
            "Confirmación",
            "¿Estás seguro de que deseas terminar el tratamiento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Aceptar",
                    onPress: () => setTreatmentStatus("Terminado"),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Text style={styles.title}>Detalles del Tratamiento</Text>
                <Text style={styles.detailText}>Descripción del tratamiento:</Text>
                <Text style={styles.description}>Aquí va la información detallada del tratamiento.</Text>

                <Text style={styles.status}>Estado: {treatmentStatus}</Text>

                {treatmentStatus === "En proceso" && (
                    <Button title="Terminar Tratamiento" onPress={handleEndTreatment} />
                )}
            </Card>
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
        padding: 20,
        borderRadius: 15,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        width: "90%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    detailText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#555",
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
        color: "#666",
    },
    status: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 15,
    },
});

export default Tratamiento;
