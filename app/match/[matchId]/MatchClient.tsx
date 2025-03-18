"use client";

import LogTable from "@/components/LogTable";
import SwipeCardStack from "@/components/SwipeCardStack";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMockRestaurants } from "@/utils/api";
import { loadData, saveData, clearData } from "@/utils/localStorageManager";
import { useLog } from "@/contexts/LogContext";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  priceLevel?: number;
}

interface MatchClientProps {
  matchId: string;
}

export default function MatchClient({ matchId }: MatchClientProps) {
  const STORAGE_KEY = `match-${matchId}`;
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [user1Swipes, setUser1Swipes] = useState<(boolean | undefined)[]>([]);
  const [user2Swipes, setUser2Swipes] = useState<(boolean | undefined)[]>([]);
  const [user1Index, setUser1Index] = useState(0);
  const [user2Index, setUser2Index] = useState(0);
  const [user1Finished, setUser1Finished] = useState(false);
  const [user2Finished, setUser2Finished] = useState(false);
  const [user1Present, setUser1Present] = useState(false);
  const [user2Present, setUser2Present] = useState(false);
  const [match, setMatch] = useState<Restaurant | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("user") || "joiner"; 
  const testing = searchParams.get("testing") || "false";

  const { logAction } = useLog();

  // Load persisted state on mount and initialize swipes if absent
  useEffect(() => {
    const persisted = loadData<{
      user1Swipes: (boolean | undefined)[];
      user2Swipes: (boolean | undefined)[];
      user1Index: number;
      user2Index: number;
      user1Finished: boolean;
      user2Finished: boolean;
      user1Present: boolean;
      user2Present: boolean;
      matchId: string;
      match: Restaurant | null;
    }>(STORAGE_KEY);

    const mockRestaurants = getMockRestaurants();
    setRestaurants(mockRestaurants);
    if (persisted) {
      setUser1Swipes(persisted.user1Swipes || Array(mockRestaurants.length).fill(undefined));
      setUser2Swipes(persisted.user2Swipes || Array(mockRestaurants.length).fill(undefined));
      setUser1Index(persisted.user1Index || 0);
      setUser2Index(persisted.user2Index || 0);
      setUser1Finished(persisted.user1Finished || false);
      setUser2Finished(persisted.user2Finished || false);
      setUser1Present(persisted.user1Present || false);
      setUser2Present(persisted.user2Present || false);
      setMatch(persisted.match || null);
    } else {
      setUser1Swipes(Array(mockRestaurants.length).fill(undefined));
      setUser2Swipes(Array(mockRestaurants.length).fill(undefined));
      logAction(`User ${user} arrived on match screen with matchId: ${matchId}`);
      if (user === "creator") {
        setUser1Present(true);console.log("user is creator");
      } else if (user === "joiner") {
        setUser2Present(true);console.log("user is joiner");
      } else {
        console.error(`Invalid user type: ${user}`);
      }
      if (mockRestaurants.length) {
        logAction(`Loaded ${mockRestaurants.length} restaurants`);
      }
    }
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
      user1Present,
      user2Present,
      matchId,
      match,
    };
    saveData(STORAGE_KEY, data);
  }, [user1Swipes, user2Swipes, user1Index, user2Index, user1Finished, user2Finished, user1Present, user2Present, matchId, match, STORAGE_KEY]);

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
        setUser1Present(data.user1Present);
        setUser2Present(data.user2Present);
        setMatch(data.match);
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [STORAGE_KEY]);

  const handleSwipe = (direction: boolean): void => {
    const currentIndex = user === "creator" ? user1Index : user2Index;
    if (restaurants[currentIndex]) {
      logAction(`User ${user} swiped ${direction ? "right" : "left"} on ${restaurants[currentIndex].name}: ${restaurants[currentIndex].id}`);
    } else {
      logAction(`User ${user} swiped ${direction ? "right" : "left"} on an unknown restaurant`);
    }
    
    if (user === "creator") {
      const newUser1Swipes = [...user1Swipes];
      newUser1Swipes[currentIndex] = direction;
      setUser1Swipes(newUser1Swipes);
      logAction(`Creator swipe updated: index ${currentIndex} set to ${direction}`);
      if (currentIndex + 1 >= restaurants.length) {
        setUser1Finished(true);
      } else {
        setUser1Index(currentIndex + 1);
      }
    } else {
      const newUser2Swipes = [...user2Swipes];
      newUser2Swipes[currentIndex] = direction;
      setUser2Swipes(newUser2Swipes);
      logAction(`Joiner swipe updated: index ${currentIndex} set to ${direction}`);
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
      logAction(`Match found on restaurant: ${restaurants[currentIndex]?.name} by user: ${user}`);
      setMatch(restaurants[currentIndex]);
      return;
    }

    if (user1Finished && user2Finished && !match) {
      logAction(`No match found after swiping all restaurants.`);
    }
  };

  const handleStartOver = () => {
    setUser1Swipes(Array(restaurants.length).fill(undefined));
    setUser2Swipes(Array(restaurants.length).fill(undefined));
    setUser1Index(0);
    setUser2Index(0);
    setUser1Finished(false);
    setUser2Finished(false);
    setMatch(null);
    clearData(STORAGE_KEY);
    logAction(`User ${user} started over with matchId: ${matchId}`);
  };

  const handleReturnHome = () => {
    router.push("/");
  };

  if (match) {
    return (
      <div className="flex flex-col items-center justify-center bg-green-100">
        <h1 className="text-4xl font-bold text-green-800 mb-4">It is a Match!</h1>
        <h2 className="text-2xl">{match.name}:{match.id}</h2>
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

  if (user1Finished && user2Finished && !match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">No Match Found</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleStartOver}
        >
          Start Over
        </button>
      </div>
    );
  }

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
      {testing === "true" ? (
            <div className="mt-16 w-full max-w-4xl absolute bottom-0 left-0 right-0 mx-auto p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-2">User 1 Swipes</h2>
              <LogTable />
            </div>
          ) : null}
    </div>
  );
}
