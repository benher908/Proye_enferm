import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform,
    TouchableOpacity,
    Text
} from "react-native";
import { launchCamera } from "react-native-image-picker";
import api from "../api";
import AuthLayout from "../layouts/AuthLayout";

const RegistroScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [edad, setEdad] = useState("");
    const [nss, setNss] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [telefono, setTelefono] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

    const requestCameraPermission = async () => {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Permiso para usar la cámara",
                    message: "Esta aplicación necesita acceso a la cámara para tomar fotos.",
                    buttonNeutral: "Preguntar más tarde",
                    buttonNegative: "Cancelar",
                    buttonPositive: "Aceptar",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS solicita permisos automáticamente
    };

    const handleTakePhoto = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            return Alert.alert("Permiso denegado", "No puedes usar la cámara sin permisos.");
        }

        launchCamera(
            {
                mediaType: "photo",
                cameraType: "front", // Usa la cámara frontal
            },
            (response) => {
                if (response.didCancel) {
                    Alert.alert("Operación cancelada", "No se tomó ninguna foto.");
                } else if (response.errorCode) {
                    Alert.alert("Error", response.errorMessage || "No se pudo abrir la cámara");
                } else if (response.assets && response.assets.length > 0) {
                    setFotoPerfil(response.assets[0].uri || null);
                }
            }
        );
    };

    const handleRegister = async () => {
        if (!nombreCompleto || !edad || !nss || !contrasena || !confirmarContrasena || !telefono) {
            return Alert.alert("Error", "Todos los campos son obligatorios, excepto la foto de perfil.");
        }

        if (nss.length !== 11) {
            return Alert.alert("Error", "El NSS debe tener exactamente 11 caracteres.");
        }

        const edadNum = parseInt(edad, 10);
        if (isNaN(edadNum) || edadNum <= 0) {
            return Alert.alert("Error", "La edad debe ser un número válido mayor a 0.");
        }

        if (contrasena !== confirmarContrasena) {
            return Alert.alert("Error", "Las contraseñas no coinciden.");
        }

        try {
            const newPaciente = {
                nss,
                contrasena,
                nombre_completo: nombreCompleto,
                telefono,
                edad: edadNum,
                foto_perfil: fotoPerfil || null, // Si no hay foto, se envía como null
            };

            const response = await api.post("/register", newPaciente);
            Alert.alert("Registro exitoso", response.data.message);
            navigation.navigate("LoginScreen");
        } catch (error) {
            console.error("Error en el registro:", error.response?.data || error.message);
            Alert.alert("Error", error.response?.data?.error || "No se pudo registrar el paciente.");
        }
    };

    return (
        <AuthLayout>
            <View style={styles.container}>
                <Text style={styles.title}>Regístrate en PillPal</Text>
                <TextInput
                    placeholder="Nombre Completo"
                    placeholderTextColor="#5E6472"
                    value={nombreCompleto}
                    onChangeText={setNombreCompleto}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Edad"
                    placeholderTextColor="#5E6472"
                    keyboardType="numeric"
                    value={edad}
                    onChangeText={setEdad}
                    style={styles.input}
                />
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
                <TextInput
                    placeholder="Confirmar Contraseña"
                    placeholderTextColor="#5E6472"
                    secureTextEntry
                    value={confirmarContrasena}
                    onChangeText={setConfirmarContrasena}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Teléfono"
                    placeholderTextColor="#5E6472"
                    keyboardType="phone-pad"
                    value={telefono}
                    onChangeText={setTelefono}
                    style={styles.input}
                />
                {fotoPerfil && <Image source={{ uri: fotoPerfil }} style={styles.image} />}
                <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                    <Text style={styles.photoButtonText}>Tomar Foto de Perfil (Opcional)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Registrar Paciente</Text>
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#5E6472",
        marginBottom: 20,
    },
    input: {
        width: 200,
        backgroundColor: "#B8F2E6",
        borderColor: "#AED9E0",
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        color: "#5E6472",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    photoButton: {
        width: "100%",
        backgroundColor: "#AED9E0",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
    },
    photoButtonText: {
        color: "#5E6472",
        fontSize: 16,
        fontWeight: "bold",
    },
    registerButton: {
        width: "100%",
        backgroundColor: "#5E6472",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    registerButtonText: {
        color: "#FAF3DD",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default RegistroScreen;
