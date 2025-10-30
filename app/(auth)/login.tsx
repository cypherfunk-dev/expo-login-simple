import React, { useState } from "react";
import { useRouter } from "expo-router";
import {

View,
Text,
TextInput,
StyleSheet,
TouchableOpacity,
KeyboardAvoidingView,
Platform,
ActivityIndicator,
Alert,
} from "react-native";
import { useAuth } from "@/components/context";

type Props = {
navigation?: any;
onLoginSuccess?: (token: string) => void;
};

export default function LoginScreen({ navigation, onLoginSuccess }: Props): JSX.Element {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
const router = useRouter();
const { login } = useAuth();


const handleLogin = async () => {
    try {

        const success = await login(email, password);
        if (success) {
            router.replace("/(tabs)");
        } else {
            Alert.alert("Error", "Credenciales inválidas");
        }
    } catch (error) {
        Alert.alert("Error", "Credenciales inválidas");
    }
};

return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <View style={styles.card}>
            <Text style={styles.title}>Iniciar sesión</Text>

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="tucorreo@ejemplo.com"
                style={[styles.input, errors.email && styles.inputError]}
                editable={!loading}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <Text style={[styles.label, { marginTop: 12 }]}>Contraseña</Text>
            <View style={styles.row}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder="********"
                    style={[styles.input, { flex: 1 }, errors.password && styles.inputError]}
                    editable={!loading}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword((s) => !s)}
                    style={styles.showBtn}
                    disabled={loading}
                >
                    <Text style={styles.showBtnText}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
                </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
            </TouchableOpacity>

            {/* <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation?.navigate?.("Register")}>
                    <Text style={styles.link}>Crear cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Alert.alert("Recuperar contraseña", "Redirigir a recuperación")}
                >
                    <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    justifyContent: "center",
    padding: 20,
},
card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
},
title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
    textAlign: "center",
},
label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
},
input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    borderRadius: 8,
    fontSize: 16,
    color: "#111827",
},
inputError: {
    borderColor: "#ef4444",
},
errorText: {
    color: "#ef4444",
    marginTop: 6,
    fontSize: 12,
},
row: {
    flexDirection: "row",
    alignItems: "center",
},
showBtn: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
},
showBtnText: {
    color: "#2563eb",
    fontSize: 14,
},
button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 18,
},
buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
},
footer: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
},
link: {
    color: "#2563eb",
    fontSize: 14,
},
});