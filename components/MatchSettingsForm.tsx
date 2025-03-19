'use client';

import { useState } from 'react';
import { useMatchStore } from '@/state/matchStore';
import { MatchSettings } from '@/types/global';

export default function MatchSettingsForm() {
    const { setMatchSettings } = useMatchStore();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [radius, setRadius] = useState(1000);
    const [errorMessage] = useState('');
    const [address, setAddress] = useState('');
    const [pricing, setPricing] = useState<string[]>([]);
    const [category, setCategory] = useState('Any');

    const handleAddressChange = (value: string) => {
        setAddress(value);
    };

    const handlePricingChange = (value: string) => {
        setPricing((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const getDeviceLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              console.error(`Error retrieving location: ${error.message}`);
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const matchId = Math.floor(1000 + Math.random() * 9000).toString(); // Generate random 4-digit matchId
        const settings: MatchSettings = { lat: latitude, lng: longitude, radius, matchId };
        setMatchSettings(settings); // Update Zustand store with matchId
        console.log('MatchSettingsForm:34 - Match settings:', settings);
        console.log('MatchId: ', matchId);
        console.log('Zustand store: ', useMatchStore.getState().matchSettings);
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