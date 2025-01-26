import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const Perfil: React.FC = () => {
    const [nombre, setNombre] = useState("Usuario");
    const [telefono, setTelefono] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

    const handleUpdatePhoto = () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                maxWidth: 200,
                maxHeight: 200,
            },
            (response) => {
                if (response.didCancel) {
                    Alert.alert("Cancelado", "No seleccionaste ninguna foto.");
                } else if (response.errorCode) {
                    Alert.alert("Error", response.errorMessage || "No se pudo cargar la foto.");
                } else if (response.assets && response.assets.length > 0) {
                    setFotoPerfil(response.assets[0].uri || null);
                }
            }
        );
    };

    const handleUpdatePerfil = () => {
        Alert.alert("Perfil Actualizado", "Tu información ha sido guardada correctamente.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de Usuario</Text>
            {fotoPerfil && <Image source={{ uri: fotoPerfil }} style={styles.image} />}
            <Button title="Cambiar Foto de Perfil" onPress={handleUpdatePhoto} />

            <TextInput
                placeholder="Nombre Completo"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />
            <TextInput
                placeholder="Teléfono"
                keyboardType="phone-pad"
                value={telefono}
                onChangeText={setTelefono}
                style={styles.input}
            />
            <Button title="Guardar Cambios" onPress={handleUpdatePerfil} />
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: "90%",
    },
});

export default Perfil;
