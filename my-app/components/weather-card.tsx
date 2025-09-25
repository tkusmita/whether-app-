"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Eye, Droplets, Thermometer } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  feelsLike: number
  uvIndex: number
}

interface WeatherCardProps {
  weather: WeatherData
}

const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase()
  if (lowerCondition.includes("sunny") || lowerCondition.includes("clear")) {
    return <Sun className="h-16 w-16 text-yellow-500" />
  } else if (lowerCondition.includes("rain")) {
    return <CloudRain className="h-16 w-16 text-blue-500" />
  } else if (lowerCondition.includes("snow")) {
    return <CloudSnow className="h-16 w-16 text-blue-300" />
  } else {
    return <Cloud className="h-16 w-16 text-gray-500" />
  }
}

const getConditionColor = (condition: string) => {
  const lowerCondition = condition.toLowerCase()
  if (lowerCondition.includes("sunny") || lowerCondition.includes("clear")) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
  } else if (lowerCondition.includes("rain")) {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  } else if (lowerCondition.includes("snow")) {
    return "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
  } else {
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-balance">{weather.location}</CardTitle>
        <div className="flex items-center justify-center mt-4">{getWeatherIcon(weather.condition)}</div>
        <div className="mt-4">
          <div className="text-4xl font-bold text-primary">{weather.temperature}°C</div>
          <Badge className={`mt-2 ${getConditionColor(weather.condition)}`}>{weather.condition}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <div className="text-muted-foreground">Feels like</div>
              <div className="font-medium">{weather.feelsLike}°C</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <div className="text-muted-foreground">Humidity</div>
              <div className="font-medium">{weather.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <div className="text-muted-foreground">Wind</div>
              <div className="font-medium">{weather.windSpeed} km/h</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <div className="text-muted-foreground">Visibility</div>
              <div className="font-medium">{weather.visibility} km</div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">UV Index</span>
            <Badge variant={weather.uvIndex > 6 ? "destructive" : "secondary"}>{weather.uvIndex}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
