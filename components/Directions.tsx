import MapViewDirections, { type MapDirectionsResponse } from "react-native-maps-directions";

interface Props {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  onReady: (...data: MapDirectionsResponse[]) => void
}

export function Directions({ destination, onReady, origin }: Props) {
  return (
    <MapViewDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey="AIzaSyAU8l6Wc6m4n5P1loHUIEYyYaGTrnsaw8A"
      strokeWidth={3}
      strokeColor="#222"
    />
  );
}
