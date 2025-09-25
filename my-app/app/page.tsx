"use client";

import { useState, useEffect } from "react";
import { WeatherCard } from "@/components/weather-card"
  // ✅ default import
import {WeatherSearch }from "@/components/weather-search"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  uvIndex: number;
}

type CityKey = "san francisco" | "new york" | "london" | "tokyo";

// Mock weather data
const mockWeatherData: Record<CityKey, WeatherData> = {
  "san francisco": {
    location: "San Francisco, CA",
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 15,
    visibility: 10,
    feelsLike: 24,
    uvIndex: 4,
  },
  "new york": {
    location: "New York, NY",
    temperature: 18,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 8,
    visibility: 15,
    feelsLike: 20,
    uvIndex: 6,
  },
  london: {
    location: "London, UK",
    temperature: 12,
    condition: "Light Rain",
    humidity: 80,
    windSpeed: 12,
    visibility: 8,
    feelsLike: 10,
    uvIndex: 2,
  },
  tokyo: {
    location: "Tokyo, Japan",
    temperature: 25,
    condition: "Clear",
    humidity: 55,
    windSpeed: 6,
    visibility: 12,
    feelsLike: 27,
    uvIndex: 7,
  },
};

// 🔘 Theme Toggle
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

// 🔘 Loader
function Loader() {
  return (
    <div className="text-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      <p className="mt-2 text-muted-foreground">Loading weather data...</p>
    </div>
  );
}

// 🔘 Main Weather App
export default function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWeather = async (location: string) => {
    setIsLoading(true);
    setError(null);
    setWeather(null);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const normalizedLocation = location.toLowerCase() as CityKey;
    const weatherData = mockWeatherData[normalizedLocation];

    if (weatherData) {
      setWeather(weatherData);
    } else {
      setError(
        `Weather data not found for "${location}". Try: San Francisco, New York, London, or Tokyo.`
      );
    }

    setIsLoading(false);
  };

  const getCurrentLocationWeather = async () => {
    setIsLoading(true);
    setError(null);
    setWeather(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setWeather(mockWeatherData["san francisco"]);
    setIsLoading(false);
  };

  useEffect(() => {
    setWeather(mockWeatherData["san francisco"]);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      <ThemeToggle />

      <div className="container mx-auto max-w-2xl py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Weather App</h1>
          <p className="text-muted-foreground">
            Get current weather conditions for any city
          </p>
        </div>

        <div className="space-y-8">
          <WeatherSearch
            onSearch={searchWeather}
            onCurrentLocation={getCurrentLocationWeather}
            isLoading={isLoading}
          />

          {error && (
            <div className="text-center p-4 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}

          {isLoading && <Loader />}
          {weather && !isLoading && <WeatherCard weather={weather} />}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Try searching for: San Francisco, New York, London, or Tokyo</p>
        </div>
      </div>
    </div>
  );
}
