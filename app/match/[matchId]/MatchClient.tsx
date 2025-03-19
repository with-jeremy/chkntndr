"use client";

import SwipeCardStack from "@/components/SwipeCardStack";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loadData, saveData } from "@/utils/localStorageManager";
import { fetchPlaces } from "@/components/PlacesObject";

interface Restaurants {
  id: string;
}

interface MatchClientProps {
  matchId: string;
}

export default function MatchClient({ matchId }: MatchClientProps) {
  const STORAGE_KEY = `match-${matchId}`;
  const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
  const [user1Swipes, setUser1Swipes] = useState<(boolean | undefined)[]>([]);
  const [user2Swipes, setUser2Swipes] = useState<(boolean | undefined)[]>([]);
  const [user1Index, setUser1Index] = useState(0);
  const [user2Index, setUser2Index] = useState(0);
  const [user1Finished, setUser1Finished] = useState(false);
  const [user2Finished, setUser2Finished] = useState(false);
  const [match, setMatch] = useState<Restaurant | null>(null);
  const searchParams = useSearchParams();
  const user = searchParams.get("user") || "joiner"; 

  // Load persisted state on mount and initialize swipes if absent
  useEffect(() => {
    const persisted = loadData<{
      user1Swipes: (boolean | undefined)[];
      user2Swipes: (boolean | undefined)[];
      user1Index: number;
      user2Index: number;
      user1Finished: boolean;
      user2Finished: boolean;
      matchId: string;
      match: Restaurant | null;
    }>(STORAGE_KEY);

    fetchPlaces().then((fetchedRestaurants: Restaurants[]) => {
      if (fetchedRestaurants) {
        console.log("Fetched restaurants:", fetchedRestaurants);
        setRestaurants(fetchedRestaurants);
        console.log("Persisted data:", persisted);
        console.log("restaurants length:", fetchedRestaurants.length);
        console.log("restaurants:", fetchedRestaurants);
        if (persisted) {
          setUser1Swipes(persisted.user1Swipes || Array(fetchedRestaurants.length).fill(undefined));
          setUser2Swipes(persisted.user2Swipes || Array(fetchedRestaurants.length).fill(undefined));
          setUser1Index(persisted.user1Index || 0);
          setUser2Index(persisted.user2Index || 0);
          setUser1Finished(persisted.user1Finished || false);
          setUser2Finished(persisted.user2Finished || false);
       
          setMatch(persisted.match || null);
        } else {
          setUser1Swipes(Array(fetchedRestaurants.length).fill(undefined));
          setUser2Swipes(Array(fetchedRestaurants.length).fill(undefined));
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId, user]);

  // Persist state to localStorage whenever key state changes
  useEffect(() => {
    const data = {
      user1Swipes,
      user2Swipes,
      user1Index,
      user2Index,
      user1Finished,
      user2Finished,
   
      matchId,
      match,
    };
    saveData(STORAGE_KEY, data);
  }, [user1Swipes, user2Swipes, user1Index, user2Index, user1Finished, user2Finished,  matchId, match, STORAGE_KEY]);

  // Listen to storage events for cross-tab synchronization
  useEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const data = JSON.parse(e.newValue);
        setUser1Swipes(data.user1Swipes);
        setUser2Swipes(data.user2Swipes);
        setUser1Index(data.user1Index);
        setUser2Index(data.user2Index);
        setUser1Finished(data.user1Finished);
        setUser2Finished(data.user2Finished);
     
        setMatch(data.match);
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [STORAGE_KEY]);

  const handleSwipe = (direction: boolean): void => {
    const currentIndex = user === "creator" ? user1Index : user2Index;

    if (user === "creator") {
      const newUser1Swipes = [...user1Swipes];
      newUser1Swipes[currentIndex] = direction;
      setUser1Swipes(newUser1Swipes);
      if (currentIndex + 1 >= restaurants.length) {
        setUser1Finished(true);
      } else {
        setUser1Index(currentIndex + 1);
      }
    } else {
      const newUser2Swipes = [...user2Swipes];
      newUser2Swipes[currentIndex] = direction;
      setUser2Swipes(newUser2Swipes);
      if (currentIndex + 1 >= restaurants.length) {
        setUser2Finished(true);
      } else {
        setUser2Index(currentIndex + 1);
      }
    }
    if (
      (user === "creator" ? direction : user1Swipes[currentIndex]) === true &&
      (user === "joiner" ? direction : user2Swipes[currentIndex]) === true
    ) {
      setMatch(restaurants[currentIndex]);
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Match ID: {matchId}</h1>
      {restaurants.length > 0 ? (
        <>
          <SwipeCardStack
              restaurants={restaurants}
              onSwipe={(direction: boolean) => handleSwipe(direction)}
          />
        </>
      ) : (
        <p>Loading restaurants...</p>
      )}
    </div>
  );
}
