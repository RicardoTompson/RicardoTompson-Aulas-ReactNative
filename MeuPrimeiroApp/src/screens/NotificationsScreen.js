import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, List, Divider } from 'react-native-paper';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <List.Section>
        <List.Item title="Notificação 1" description="Detalhe da notificação 1" left={(props) => <List.Icon {...props} icon="bell" />} />
        <Divider />
        <List.Item title="Notificação 2" description="Detalhe da notificação 2" left={(props) => <List.Icon {...props} icon="bell" />} />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
