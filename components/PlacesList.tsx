"use client";

import { useEffect, useState } from "react";
import { nearbySearch } from "@/utils/api";

export default function PlacesList() {
  const [placeIds, setPlaceIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const ids = await nearbySearch(37.7749, -122.4194, 5000); // Static location: San Francisco
        setPlaceIds(ids);
      } catch {
        setError("Failed to fetch places.");
      }
    };

    fetchPlaces();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Nearby Places</h2>
      <ul className="list-disc pl-5">
        {[...new Set(placeIds)].map((id) => (
          <li key={id}>qq{id}</li>
        ))}
      </ul>
    </div>
  );
}
