import { Alert, StatusBar, View } from "react-native";
import {
  type GooglePlaceData,
  type GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

interface Props {
  onLocationSelected: (
    data: GooglePlaceData,
    detail: GooglePlaceDetail
  ) => void;
}

export function Search({ onLocationSelected }: Props) {
  const GOOGLE_API_KEY = "AIzaSyD6Wp0ojlyu__5N1zfKXCD70AqHYLome-0";

  return (
    <GooglePlacesAutocomplete
      placeholder="Onde você quer ir?"
      onPress={(data, detail) => {
        if (detail !== null) {
          onLocationSelected(data, detail);
        } else {
          console.log("Erro ao buscar localização: detalhes nulos");
          Alert.alert("Erro ao buscar localização", "Detalhes nulos");
        }
      }}
      onFail={(err) => {
        console.log(err);
        Alert.alert("Erro ao buscar localização", err);
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: "pt-BR",
      }}
      fetchDetails
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: "absolute",
          top: StatusBar.currentHeight ?? 0 + 5,
          width: "100%",
        },
        textInputContainer: {
          flex: 1,
          backgroundColor: "transparent",
          height: 54,
          marginHorizontal: 20,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          height: 54,
          margin: 0,
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: {
            x: 0,
            y: 0,
          },
          shadowRadius: 15,
          borderWidth: 1,
          borderColor: "#DDD",
          fontSize: 18,
        },
        listView: {
          borderWidth: 1,
          borderColor: "#DDD",
          backgroundColor: "#FFF",
          marginHorizontal: 20,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: {
            x: 0,
            y: 0,
          },
          shadowRadius: 15,
          marginTop: 10,
        },
        description: {
          fontSize: 16,
        },
        row: {
          padding: 20,
          height: 58,
        },
      }}
    />
  );
}
