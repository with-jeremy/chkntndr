/**
 * MatchClient component handles the logic for a swipe-based matching system
 * where two users can swipe on a list of restaurants to find a mutual match.
 * 
 * @component
 * @param {MatchClientProps} props - The props for the MatchClient component.
 * @param {string} props.matchId - The unique identifier for the match session.
 * 
 * @returns {JSX.Element} The rendered MatchClient component.
 * 
 * @remarks
 * - This component uses localStorage to persist state and synchronize data across browser tabs.
 * - It fetches a list of restaurants and allows two users to swipe through them.
 * - If both users swipe "yes" on the same restaurant, it is considered a match.
 * 
 * @example
 * ```tsx
 * <MatchClient matchId="12345" />
 * ```
 * 
 * @interface Restaurants
 * Represents a restaurant object.
 * @property {string} id - The unique identifier for the restaurant.
 * 
 * @interface MatchClientProps
 * Represents the props for the MatchClient component.
 * @property {string} matchId - The unique identifier for the match session.
 * 
 * @function handleSwipe
 * Handles the swipe action for the current user.
 * @param {boolean} direction - The swipe direction (true for "yes", false for "no").
 * 
 * @remarks
 * - Updates the swipe state for the current user.
 * - Checks if there is a match between the two users.
 * 
 * @useEffect
 * - Loads persisted state from localStorage on mount.
 * - Fetches the list of restaurants and initializes swipe states.
 * - Persists state to localStorage whenever key state variables change.
 * - Listens for storage events to synchronize state across tabs.
 * 
 * @state {Restaurants[]} restaurants - The list of restaurants to swipe through.
 * @state {(boolean | undefined)[]} user1Swipes - The swipe decisions of user 1.
 * @state {(boolean | undefined)[]} user2Swipes - The swipe decisions of user 2.
 * @state {number} user1Index - The current index of user 1 in the restaurant list.
 * @state {number} user2Index - The current index of user 2 in the restaurant list.
 * @state {boolean} user1Finished - Whether user 1 has finished swiping.
 * @state {boolean} user2Finished - Whether user 2 has finished swiping.
 * @state {Restaurants | null} match - The matched restaurant, if any.
 * 
 * @dependencies
 * - `useState` and `useEffect` from React for state management and side effects.
 * - `useSearchParams` from Next.js for retrieving query parameters.
 * - `loadData` and `saveData` utilities for localStorage management.
 * - `fetchPlaces` for fetching the list of restaurants.
 * - `SwipeCardStack` component for rendering the swipeable cards.
 * 
 * @suggestions
 * - Extract state management logic into a custom hook (e.g., `useMatchState`) to centralize and reuse logic.
 * - Move localStorage persistence logic into a utility function or the custom hook to reduce duplication.
 * - Consider using a context provider to manage shared state across components if this logic needs to be reused elsewhere.
 * - Abstract the `handleSwipe` logic into a separate function or hook to simplify the component.
 * - Use a centralized data-fetching utility to handle `fetchPlaces` and other API calls.
 */
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
  const [match, setMatch] = useState<Restaurants | null>(null);
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
      match: Restaurants | null;
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
    console.log("Persisting user1Swipes:", JSON.stringify(user1Swipes, null, 2));
    console.log("Persisting user2Swipes:", JSON.stringify(user2Swipes, null, 2));
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

    // Check for a match
    
    if (
      (user === "creator" ? direction : user1Swipes[currentIndex]) === true &&
      (user === "joiner" ? direction : user2Swipes[currentIndex]) === true
    ) {
      setMatch(restaurants[currentIndex]);
    }
  };
  if (match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="flex flex-col items-center justify-center bg-green-100">
        <h1 className="text-4xl font-bold text-green-800 mb-4">It is a Match!</h1>
        <h2 className="text-2xl">{match.id}</h2>
        <h2 className="text-2xl">{match.id}:{match.id}</h2>
        <p>{match.id}</p>
        </div>
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
    </div>
  );
}
