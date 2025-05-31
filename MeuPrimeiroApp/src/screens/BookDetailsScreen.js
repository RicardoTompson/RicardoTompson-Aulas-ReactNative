import React from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

// export default function BookDetailsScreen({ route }) {
//   const { book } = route.params;

//   return (
//     <ScrollView style={styles.container}>
//       <Text variant="titleLarge" style={styles.title}>
//         {book.title}
//       </Text>
//       {book.thumbnail && (
//         <Image source={{ uri: book.thumbnail }} style={styles.image} />
//       )}
//       <Text style={styles.text}>Autores: {book.authors.join(", ")}</Text>
//       <Text style={styles.text}>Editora: {book.publisher}</Text>
//       <Text style={styles.text}>Páginas: {book.pageCount}</Text>
//     </ScrollView>
//   );
// }

export default function BookDetailsScreen({ route }) {
  const book = route.params?.book;

  if (!book) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Livro não encontrado.
      </Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {book.title}
      </Text>
      {book.thumbnail && (
        <Image source={{ uri: book.thumbnail }} style={styles.image} />
      )}
      <Text style={styles.text}>
        Autores: {book.authors?.join(", ") || "Desconhecido"}
      </Text>
      <Text style={styles.text}>
        Editora: {book.publisher || "Não informado"}
      </Text>
      <Text style={styles.text}>
        Páginas: {book.pageCount || "Não especificado"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { marginBottom: 10, textAlign: "center" },
  image: { height: 300, resizeMode: "contain", marginVertical: 16 },
  text: { marginVertical: 5, fontSize: 16 },
});
