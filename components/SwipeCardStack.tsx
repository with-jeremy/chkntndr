"use client";
import React from "react";
import TinderCard from "react-tinder-card";

interface Restaurants {
    id: string;
   
}

interface SwipeCardStackProps {
    restaurants: Restaurants[];
    onSwipe: (liked: boolean, restaurant: Restaurants) => void;
}

function SwipeCardStack({ restaurants, onSwipe }: SwipeCardStackProps) {
    const handleSwipe = (direction: string, restaurant: Restaurants) => {
        if (direction === "right") {
            onSwipe(true, restaurant);
            console.log("Swiped right on:", restaurant.id);
        } else if (direction === "left") {
            onSwipe(false, restaurant);
        }
    };

    return (
        <div className="relative h-full w-full">
            {restaurants.slice().reverse().map((restaurant) => ( // Reverse the array here
                <TinderCard
                    key={restaurant.id}
                    className="absolute w-full h-full swipe-target"
                    onSwipe={(dir) => handleSwipe(dir, restaurant)}
                    preventSwipe={["up", "down"]}
                    swipeThreshold={0.1} // Lowered for smoother swiping
                    flickOnSwipe={true} // Ensures the card flicks off the screen
                    swipeRequirementType="position"
                >
                    <div className="bg-white shadow-md rounded-lg overflow-hidden user-select-none">
                        {/* Replace with an actual image if available */}
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Image Placeholder</span>
                        </div>
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-2">{restaurant.id}</h2>
                            <p className="text-gray-700 text-base mb-2">{restaurant.id}</p>
                            <p className="text-gray-700 text-base mb-2">{restaurant.id}</p>
                            <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">Rating:</span>
                                <span>{restaurant.id}</span>
                            </div>
                        </div>
                    </div>
                </TinderCard>
            ))}
        </div>
    );
}

export default SwipeCardStack;
