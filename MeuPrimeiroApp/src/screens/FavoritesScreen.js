import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import BookCard from "../components/BookCard";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const stored = await AsyncStorage.getItem("@favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  }

  async function removeFavorite(book) {
    try {
      const stored = await AsyncStorage.getItem("@favorites");
      const currentFavorites = stored ? JSON.parse(stored) : [];

      const updatedFavorites = currentFavorites.filter(
        (fav) => fav.title !== book.title && fav.publisher !== book.publisher
      );

      await AsyncStorage.setItem(
        "@favorites",
        JSON.stringify(updatedFavorites)
      );
      setFavorites(updatedFavorites);
      Alert.alert("Favorito", "Livro removido dos favoritos.");
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  }

  function showDetails(book) {
    navigation.navigate("BookDetailsScreen", { book });
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Meus Favoritos ❤️</Text>
      {favorites.length === 0 && (
        <Text style={styles.empty}>Nenhum favorito ainda.</Text>
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {favorites.map((book) => (
          <BookCard
            key={book.title}
            book={book}
            onRemove={removeFavorite}
            onDetails={showDetails}
          />
        ))}
      </ScrollView>

      <Button mode="contained" onPress={loadFavorites}>
        Atualizar Lista
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  empty: { textAlign: "center", marginTop: 20, fontSize: 18 },
});
