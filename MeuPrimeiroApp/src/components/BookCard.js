import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, Divider } from "react-native-paper";

export default function BookCard({ book, onFavorite, onRemove, onDetails }) {
  return (
    <Card style={styles.card}>
      <Card.Title title={book.title} subtitle={book.publisher} />
      <Card.Cover
        source={{ uri: book.thumbnail || "https://via.placeholder.com/150" }}
      />
      <Card.Content>
        <Text>Autores: {book.authors?.join(", ") || "Desconhecido"}</Text>
        <Text>Páginas: {book.pageCount || "Não informado"}</Text>
      </Card.Content>
      <Divider />
      <Card.Actions>
        {onFavorite && (
          <Button mode="contained" onPress={() => onFavorite(book)}>
            Favoritar ❤️
          </Button>
        )}
        {onRemove && (
          <Button mode="outlined" onPress={() => onRemove(book)}>
            Remover ❌
          </Button>
        )}
        {onDetails && (
          <Button mode="contained" onPress={() => onDetails(book)}>
            Detalhes ℹ️
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 20 },
});
