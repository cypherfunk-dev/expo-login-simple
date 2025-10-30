import React, { JSX } from "react";
import {
View,
Text,
Image,
TouchableOpacity,
StyleSheet,
ScrollView,
      } from "react-native";
import { SafeAreaView } from  
'react-native-safe-area-context';

import { useAuth } from '@/components/context';
import { Redirect, useRouter } from 'expo-router';

type User = {
name: string;
username: string;
bio: string;
email: string;
phone: string;
location: string;
avatar: string;
followers: number;
following: number;
posts: number;
interests: string[];
};

const hardcodedUser: User = {
name: "María López",
username: "@marialopez",
bio: "Desarrolladora front-end. Amante del café y las buenas interfaces.",
email: "maria.lopez@example.com",
phone: "+34 612 345 678",
location: "Madrid, España",
avatar: "https://i.pravatar.cc/300?img=50",
followers: 1240,
following: 312,
posts: 87,
interests: ["UX", "React", "TypeScript", "Fotografía"],
};

export default function Perfil(): JSX.Element {
const u = hardcodedUser;
const { user, logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.replace('/(auth)/login');
}

if(!user) {
  return <Redirect href="/(auth)/login" />;
}

return (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Image source={{ uri: u.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>


      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{u.followers}</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{u.following}</Text>
          <Text style={styles.statLabel}>Siguiendo</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{u.posts}</Text>
          <Text style={styles.statLabel}>Publicaciones</Text>
        </View>
      </View>

      <View style={styles.contact}>
        <Text style={styles.contactLabel}>Correo</Text>
        <Text style={styles.contactValue}>{user.email}</Text>
        <Text style={[styles.contactLabel, { marginTop: 10 }]}>Teléfono</Text>
      </View>



      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.buttonPrimaryText}>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutline} activeOpacity={0.8} onPress={handleLogout}>
          <Text style={styles.buttonOutlineText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}

const AVATAR_SIZE = 96;

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#FFF",
},
scroll: {
  padding: 20,
},
header: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 12,
},
avatar: {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  borderRadius: AVATAR_SIZE / 2,
  marginRight: 16,
  backgroundColor: "#eee",
},
headerText: {
  flex: 1,
},
name: {
  fontSize: 20,
  fontWeight: "700",
  color: "#111",
},
username: {
  color: "#666",
  marginTop: 4,
},
location: {
  color: "#888",
  marginTop: 6,
  fontSize: 13,
},
bio: {
  fontSize: 14,
  color: "#333",
  marginBottom: 16,
  lineHeight: 20,
},
stats: {
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "#f7f7f7",
  paddingVertical: 12,
  paddingHorizontal: 10,
  borderRadius: 8,
  marginBottom: 16,
},
statItem: {
  alignItems: "center",
  flex: 1,
},
statNumber: {
  fontSize: 18,
  fontWeight: "700",
  color: "#111",
},
statLabel: {
  color: "#666",
  marginTop: 4,
  fontSize: 12,
},
contact: {
  marginBottom: 16,
},
contactLabel: {
  color: "#888",
  fontSize: 12,
},
contactValue: {
  color: "#222",
  fontSize: 14,
  marginTop: 4,
},
interests: {
  marginBottom: 20,
},
sectionTitle: {
  fontWeight: "700",
  fontSize: 16,
  marginBottom: 8,
  color: "#111",
},
tags: {
  flexDirection: "row",
  flexWrap: "wrap",
},
tag: {
  backgroundColor: "#eef6ff",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 16,
  marginRight: 8,
  marginBottom: 8,
},
tagText: {
  color: "#0366d6",
  fontSize: 13,
  fontWeight: "600",
},
actions: {
  marginTop: 8,
},
buttonPrimary: {
  backgroundColor: "#0366d6",
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: "center",
  marginBottom: 10,
},
buttonPrimaryText: {
  color: "#fff",
  fontWeight: "700",
},
buttonOutline: {
  borderWidth: 1,
  borderColor: "#ddd",
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: "center",
},
buttonOutlineText: {
  color: "#444",
  fontWeight: "600",
},
})