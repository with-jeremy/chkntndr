export type MatchSettings = {
  matchId: string;
  lat: number;
  lng: number;
  radius: number;
};

export type Restaurant = {
  id: string;
  name: string;
  image_url: string;
  rating: number;
  address: string;
};
