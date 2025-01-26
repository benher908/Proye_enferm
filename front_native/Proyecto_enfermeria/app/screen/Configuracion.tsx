import React, { useState } from "react";
import { View, Text, Switch, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Configuracion: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notificationSound, setNotificationSound] = useState("default");

    const handleSaveSettings = () => {
        Alert.alert("Configuración Guardada", "Tus ajustes han sido actualizados.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración</Text>

            <View style={styles.settingItem}>
                <Text style={styles.label}>Modo Oscuro:</Text>
                <Switch
                    value={darkMode}
                    onValueChange={setDarkMode}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={styles.label}>Sonido de Notificación:</Text>
                <Picker
                    selectedValue={notificationSound}
                    style={styles.picker}
                    onValueChange={(itemValue) => setNotificationSound(itemValue)}
                >
                    <Picker.Item label="Predeterminado" value="default" />
                    <Picker.Item label="Campana" value="bell" />
                    <Picker.Item label="Silbido" value="whistle" />
                    <Picker.Item label="Alarma" value="alarm" />
                </Picker>
            </View>

            <Button title="Guardar Cambios" onPress={handleSaveSettings} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: "#555",
    },
    picker: {
        height: 40,
        width: 150,
    },
});

export default Configuracion;
