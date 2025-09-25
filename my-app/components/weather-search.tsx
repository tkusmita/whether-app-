"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

interface WeatherSearchProps {
  onSearch: (location: string) => void
  onCurrentLocation: () => void
  isLoading?: boolean
}

export function WeatherSearch({ onSearch, onCurrentLocation, isLoading }: WeatherSearchProps) {
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location.trim())
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !location.trim()}>
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <div className="text-center">
        <Button variant="outline" onClick={onCurrentLocation} disabled={isLoading} className="w-full bg-transparent">
          <MapPin className="h-4 w-4 mr-2" />
          Use Current Location
        </Button>
      </div>
    </div>
  )
}
