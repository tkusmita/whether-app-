"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WeatherSearchProps {
  onSearch: (location: string) => void;
  onCurrentLocation: () => void;
  isLoading: boolean;
}

export default function WeatherSearch({
  onSearch,
  onCurrentLocation,
  isLoading,
}: WeatherSearchProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city (e.g., London)"
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        Search
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={onCurrentLocation}
        disabled={isLoading}
      >
        Use Current Location
      </Button>
    </form>
  );
}
