interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  priceLevel?: number;
}

export const getMockRestaurants = (): Restaurant[] => {
  return [
    {
      id: "1",
      name: "The Tasty Burger",
      address: "123 Main St",
      rating: 4.5,
      priceLevel: 2,
    },
    {
      id: "2",
      name: "Pizza Palace",
      address: "456 Oak Ave",
      rating: 4.2,
      priceLevel: 1,
    },
    {
      id: "3",
      name: "Sushi Spot",
      address: "789 Pine Ln",
      rating: 4.8,
      priceLevel: 3,
    },
    {
      id: "4",
      name: "Taco Town",
      address: "101 Elm St",
      rating: 4.0,
      priceLevel: 1,
    },
    {
      id: "5",
      name: "Pasta Place",
      address: "222 Maple Dr",
      rating: 4.3,
      priceLevel: 2,
    },
    {
      id: "6",
      name: "Steak House",
      address: "333 Birch Rd",
      rating: 4.6,
      priceLevel: 4,
    },
    {
      id: "7",
      name: "BBQ Joint",
      address: "444 Cedar Ave",
      rating: 4.1,
      priceLevel: 2,
    },
    {
      id: "8",
      name: "Seafood Shack",
      address: "555 Willow St",
      rating: 4.7,
      priceLevel: 3,
    },
    {
      id: "9",
      name: "Vegan Village",
      address: "666 Oak Ln",
      rating: 4.4,
      priceLevel: 2,
    },
    {
      id: "10",
      name: "Ice Cream Parlor",
      address: "777 Pine St",
      rating: 4.9,
      priceLevel: 1,
    },
  ];
};

export async function nearbySearch(lat: number, lng: number, radius: number) {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  if (!googleApiKey) {
    throw new Error("Google API key is not defined in environment variables.");
  }

  const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': googleApiKey,
      'X-Goog-FieldMask': 'places.id',
    },
    body: JSON.stringify({
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: radius,
        },
      },
      languageCode: 'en',
    }),
  });

  const data = await response.json();
  return data.places.slice(0, 5).map((place: { id: string }) => place.id);
}