"use client";

import { useState } from "react";

interface MatchSettingsProps {
  onSubmit: (data: { testing: boolean }) => void;
}

export default function MatchSettings({ onSubmit }: MatchSettingsProps) {
  const [distance, setDistance] = useState(5);
  const [pricing, setPricing] = useState<string[]>([]);
  const [category, setCategory] = useState("Any");
  const [testing, setTesting] = useState(false);

  const handlePricingChange = (value: string) => {
    if (pricing.includes(value)) {
      setPricing(pricing.filter((item) => item !== value));
    } else {
      setPricing([...pricing, value]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ testing });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Match Settings</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distance">
          Distance Range (miles):
        </label>
        <input
          type="number"
          id="distance"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={distance}
          onChange={(e) => setDistance(parseInt(e.target.value))}
        />
        <input
          type="range"
          min="1"
          max="20"
          value={distance}
          className="w-full"
          onChange={(e) => setDistance(parseInt(e.target.value))}
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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Testing logs:</label>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={testing}
              onChange={(e) => setTesting(e.target.checked)}
            />
            <span className="ml-2">Enable Testing</span>
          </label>
        </div>
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
