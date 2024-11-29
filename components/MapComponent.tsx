import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Fragment, useEffect, useRef, useState } from "react";
import { Search } from "./Search";
import type {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { Directions } from "./Directions";

import IconMarker from "@/assets/images/marker.png";

export function MapComponent() {
  const [region, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });

  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
    title: string;
  } | null>(null);

  const mapView = useRef<MapView>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão da localização negada");
        return;
      }

      const { coords: location } = await Location.getCurrentPositionAsync({
        mayShowUserSettingsDialog: true,
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setLocation({
        ...location,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
    }

    getCurrentLocation();
  }, []);

  if (region.latitude === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 20, color: "#fff" }}>
          Carregando...
        </Text>
      </View>
    );
  }

  function handleLocationSelected(
    data: GooglePlaceData,
    detail: GooglePlaceDetail
  ) {
    if (!detail.geometry || !detail.geometry.location) {
      Alert.alert("Erro ao buscar localização", "Detalhes nulos");
      setDestination(null);
      return;
    }

    const { lat, lng } = detail.geometry.location;

    setDestination({
      latitude: lat,
      longitude: lng,
      title: data.structured_formatting.main_text,
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{flex: 1}}
        region={region}
        showsUserLocation
        loadingEnabled
        loadingIndicatorColor="#000"
        provider="google"
        ref={mapView}
      >
        {destination && (
          <Fragment>
            <Directions
              origin={region}
              destination={destination}
              onReady={(result) => {
                mapView.current?.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    top: 25,
                    right: 25,
                    bottom: 25,
                    left: 25,
                  },
                });
              }}
            />
            <Marker
              coordinate={destination}
              anchor={{ x: 0, y: 0 }}
              image={IconMarker}
              style={{
                width: 100,
                height: 100,
              }}
            >
              <View
                style={[
                  {
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    flexDirection: "row",
                    width: 100,
                  },
                  Platform.select({
                    ios: {
                      marginTop: 20,
                    },
                    android: {
                      elevation: 3,
                      marginTop: 10,
                      marginLeft: 10,
                    },
                  }),
                ]}
              >
                <Text
                  style={{
                    width: "100%",
                    fontSize: 14,
                    marginHorizontal: 10,
                    marginVertical: 8,
                    color: "#000",
                  }}
                >
                  {destination.title}
                </Text>
              </View>
            </Marker>
            <Marker
              coordinate={region}
              anchor={{ x: 0, y: 0 }}
              image={IconMarker}
              style={{
                width: 100,
                height: 100,
              }}
            >
              <View
                style={[
                  {
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    flexDirection: "row",
                    width: 100,
                  },
                  Platform.select({
                    ios: {
                      marginTop: 20,
                    },
                    android: {
                      elevation: 3,
                      marginTop: 10,
                      marginLeft: 10,
                    },
                  }),
                ]}
              >
                <Text
                  style={{
                    width: "100%",
                    fontSize: 14,
                    marginHorizontal: 10,
                    marginVertical: 8,
                    color: "#000",
                  }}
                >
                  Você está aqui
                </Text>
              </View>
            </Marker>
          </Fragment>
        )}
      </MapView>
      <Search onLocationSelected={handleLocationSelected} />
    </View>
  );
}
