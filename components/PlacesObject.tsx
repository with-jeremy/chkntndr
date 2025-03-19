"use client";

import { useEffect, useState } from "react";
import { nearbySearch } from "@/utils/api";

export async function fetchPlaces() {
  try {
    const ids = await nearbySearch(37.7749, -122.4194, 5000); // Static location: San Francisco
    // Map the place IDs to the desired object structure
    return ids.map((id: string) => ({
      id,
      
    }));
  } catch {
    throw new Error("Failed to fetch places.");
  }
}

export default function PlacesObject() {
  interface Place {
    id: string;
    
  }

  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetPlaces = async () => {
      try {
        const fetchedPlaces = await fetchPlaces();
        setPlaces(fetchedPlaces);
      } catch {
        setError("Failed to fetch places.");
      }
    };

    fetchAndSetPlaces();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <ul>
      {places.map((place) => (
        <li key={place.id}>
          {place.id}
        </li>
      ))}
    </ul>
  );
}
