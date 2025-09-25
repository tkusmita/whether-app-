"use client";

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

export default function WeatherCard({ weather }: { weather: WeatherData }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">{weather.location}</h2>
      <p>🌡 Temperature: {weather.temperature}°C</p>
      <p>🌤 Condition: {weather.condition}</p>
      <p>💧 Humidity: {weather.humidity}%</p>
      <p>💨 Wind: {weather.windSpeed} km/h</p>
      <p>👀 Visibility: {weather.visibility} km</p>
      <p>🥵 Feels Like: {weather.feelsLike}°C</p>
      <p>🔆 UV Index: {weather.uvIndex}</p>
    </div>
  );
}
