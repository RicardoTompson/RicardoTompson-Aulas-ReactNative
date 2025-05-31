import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, ActivityIndicator } from "react-native";

const API_URL = "http://192.168.1.20:3000";

export default function MapScreen() {
  const [branches, setBranches] = useState([]);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/branches`); // Alteração do endpoint
        const data = await res.json();
        setBranches(data);

        if (data.length > 0) {
          const avgLat =
            data.reduce((sum, b) => sum + Number(b.latitude), 0) / data.length;
          const avgLng =
            data.reduce((sum, b) => sum + Number(b.longitude), 0) / data.length;

          setRegion({
            latitude: avgLat,
            longitude: avgLng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar filiais:", error);
      }
    };

    fetchData();
  }, []);

  if (!region) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={region}>
        {branches.map((b) => (
          <Marker
            key={b._id}
            coordinate={{
              latitude: Number(b.latitude),
              longitude: Number(b.longitude),
            }}
            title={b.name}
            description={b.description}
            pinColor="brown" // Cor personalizada para combinar com café!
          />
        ))}
      </MapView>
    </View>
  );
}
