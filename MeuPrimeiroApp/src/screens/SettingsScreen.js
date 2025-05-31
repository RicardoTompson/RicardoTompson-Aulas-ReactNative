import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, List } from 'react-native-paper';

export default function SettingsScreen() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <List.Section>
        <List.Subheader>Notificações</List.Subheader>
        <List.Item
          title="Ativar Notificações"
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
        />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
