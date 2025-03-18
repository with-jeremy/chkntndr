"use client";

import RestaurantCard from "@/components/RestaurantCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMockRestaurants } from "@/utils/api";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  photoUrl: string;
  rating: number;
  priceLevel?: number;
}

export default function Match({ params }: { params: { matchId: string } }) {
  const { matchId } = params;
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [user1Swipes, setUser1Swipes] = useState<(boolean | undefined)[]>([]);
  const [user2Swipes, setUser2Swipes] = useState<(boolean | undefined)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [match, setMatch] = useState<Restaurant | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch mock restaurant data
    const mockRestaurants = getMockRestaurants();
    setRestaurants(mockRestaurants);
    setUser1Swipes(Array(mockRestaurants.length).fill(undefined));
    setUser2Swipes(Array(mockRestaurants.length).fill(undefined));
  }, []);

  const handleSwipe = (direction: boolean) => {
    // For now, simulate both users swiping in the same direction
    const newUser1Swipes = [...user1Swipes];
    newUser1Swipes[currentIndex] = direction;
    setUser1Swipes(newUser1Swipes);

    const newUser2Swipes = [...user2Swipes];
    newUser2Swipes[currentIndex] = direction;
    setUser2Swipes(newUser2Swipes);

    // Check for a match
    if (direction) {
      if (newUser1Swipes[currentIndex] === true && newUser2Swipes[currentIndex] === true) {
        setMatch(restaurants[currentIndex]);
        return;
      }
    }

    if (currentIndex < restaurants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // No match found
      alert("No match found!");
      router.push("/");
    }
  };

  const handleReturnHome = () => {
    router.push("/");
  };

  if (match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
        <h1 className="text-4xl font-bold text-green-800 mb-4">It is a Match!</h1>
        <h2 className="text-2xl">{match.name}</h2>
        <p>{match.address}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleReturnHome}
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Match ID: {matchId}</h1>
      {restaurants.length > 0 ? (
        <>
          <RestaurantCard restaurant={restaurants[currentIndex]} />
          <div className="flex space-x-4 mt-4">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSwipe(false)}
            >
              Swipe Left
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSwipe(true)}
            >
              Swipe Right
            </button>
          </div>
        </>
      ) : (
        <p>Loading restaurants...</p>
      )}
    </div>
  );
}
