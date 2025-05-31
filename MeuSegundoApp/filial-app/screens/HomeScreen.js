import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { FAB, Card, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";

const API_URL = "http://192.168.1.20:3000";

export default function HomeScreen() {
  const [branches, setBranches] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/branches`);
      const data = await res.json();
      setBranches(data);
    } catch (error) {
      console.error("Erro ao buscar filiais:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={branches}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Card.Title>{item.name}</Card.Title>
              <Paragraph>{item.description}</Paragraph>
            </Card.Content>
            {item.photo && (
              <Card.Cover
                source={{ uri: `${API_URL}/${item.photo}` }}
                style={styles.image}
              />
            )}
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("Adicione uma Filial")}
      />
      <FAB
        icon="map"
        style={styles.mapButton}
        onPress={() => navigation.navigate("Mapa")}
      />
    </View>
  );
}
