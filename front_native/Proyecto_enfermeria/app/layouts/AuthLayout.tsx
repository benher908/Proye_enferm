// frontend/layouts/AuthLayout.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native';

// Definimos un tipo para las props que recibe el componente
interface AuthLayoutProps {
  children: ReactNode; // children será el contenido que se pasará desde las pantallas
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.inner}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FAF3DD', // Fondo gris claro
},
    inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    marginHorizontal: 32,
    },
    scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40, // Para que los botones no queden tapados por el teclado
    },
});

export default AuthLayout;
