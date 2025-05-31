import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Text, Button, TextInput, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import BookCard from "../components/BookCard";

export default function HomeScreen() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function fetchData() {
    if (!query.trim()) {
      setErrorMsg("Por favor, insira um título ou nome de autor.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`?q=${query}`);
      if (response.data.items) {
        const bookList = response.data.items.map((item) => ({
          title: item.volumeInfo.title || "Título Indisponível",
          authors: item.volumeInfo.authors || ["Autor não informado"],
          publisher: item.volumeInfo.publisher || "Editora desconhecida",
          pageCount: item.volumeInfo.pageCount || "N/A",
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
        }));

        setBooks(bookList);
        await AsyncStorage.setItem("@books", JSON.stringify(bookList));
        setErrorMsg("");
      } else {
        setErrorMsg("Nenhum livro encontrado. Tente outra pesquisa.");
      }
    } catch (error) {
      setErrorMsg("Erro ao buscar livros. Tente novamente.");
      console.error("Erro ao buscar livros:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadStoredData() {
    const storedData = await AsyncStorage.getItem("@books");
    if (storedData) {
      setBooks(JSON.parse(storedData));
    }
  }

  async function saveToFavorites(book) {
    try {
      const stored = await AsyncStorage.getItem("@favorites");
      const currentFavorites = stored ? JSON.parse(stored) : [];

      const alreadyExists = currentFavorites.find(
        (fav) => fav.title === book.title && fav.publisher === book.publisher
      );

      if (alreadyExists) {
        Alert.alert("Favorito", "Este livro já está nos favoritos.");
        return;
      }

      const updatedFavorites = [...currentFavorites, book];
      await AsyncStorage.setItem(
        "@favorites",
        JSON.stringify(updatedFavorites)
      );
      Alert.alert("Favorito", "Livro adicionado aos favoritos!");
    } catch (error) {
      console.error("Erro ao salvar favorito:", error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Digite o título ou autor"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button mode="contained" onPress={fetchData}>
        Buscar Livros
      </Button>
      {/* <Button mode="outlined" onPress={loadStoredData}>
        Carregar Dados Salvos
      </Button> */}

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
      {loading && <ActivityIndicator size="large" style={styles.loading} />}

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {books.map((book, index) => (
          <BookCard key={index} book={book} onFavorite={saveToFavorites} />
        ))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="refresh"
        onPress={fetchData}
        label="Atualizar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  fab: { position: "absolute", right: 16, bottom: 16 },
  input: { marginBottom: 10 },
  error: { color: "red", marginTop: 10, textAlign: "center" },
  loading: { marginVertical: 20 },
});
