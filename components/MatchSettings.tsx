"use client";

import { useState } from "react";

type MatchSettings = {
  matchId: string;
  lat: number;
  lng: number;
  radius: number;
  pricing: string[];
  category: string;
};

export default function MatchSettings({ onSubmit }: { onSubmit: (settings: MatchSettings) => void }) {
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [radius, setRadius] = useState(5);
  const [pricing, setPricing] = useState<string[]>([]);
  const [category, setCategory] = useState("Any");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePricingChange = (value: string) => {
    if (pricing.includes(value)) {
      setPricing(pricing.filter((item) => item !== value));
    } else {
      setPricing([...pricing, value]);
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    // Dummy values for now
    setLat(37.7749);
    setLng(-122.4194);
  };

  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          setErrorMessage(`Error retrieving location: ${error.message}`);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create match was clicked");

    if (!lat || !lng) {
      console.log("Location is not available.");
      return;
    }
    const matchId = Math.floor(100 + Math.random() * 900).toString();
    const matchSettings = {
      matchId,
      lat,
      lng,
      radius,
      pricing,
      category,
    };

    onSubmit(matchSettings); // Pass matchSettings to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Match Settings</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="mb-4">
      <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold mb-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={getDeviceLocation}
        >
          Use My Location
        </button>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address:
          </label>
          <input
            type="text"
            id="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter address"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}          />
        </div>

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="radius">
          Distance Range (miles):
        </label>
        <input
          type="number"
          id="radius"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
        />
        <input
          type="range"
          min="1"
          max="20"
          value={radius}
          className="w-full"
          onChange={(e) => setRadius(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Pricing Range:</label>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              value="$"
              checked={pricing.includes("$")}
              onChange={() => handlePricingChange("$")}
            />
            <span className="ml-2">$</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              value="$$"
              checked={pricing.includes("$$")}
              onChange={() => handlePricingChange("$$")}
            />
            <span className="ml-2">$$</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              value="$$$"
              checked={pricing.includes("$$$")}
              onChange={() => handlePricingChange("$$$")}
            />
            <span className="ml-2">$$$</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              value="$$$$"
              checked={pricing.includes("$$$$")}
              onChange={() => handlePricingChange("$$$$")}
            />
            <span className="ml-2">$$$$</span>
          </label>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Dining Category:
        </label>
        <select
          id="category"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Any</option>
          <option>Sit-Down</option>
          <option>Drive-Thru</option>
          <option>Fancy</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Match
        </button>
      </div>
    </form>
  );
}