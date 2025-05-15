"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Share2, Heart } from "lucide-react"
import { useState } from "react"

interface OutfitResultProps {
  results: {
    image_path: string
    score: number
    category: string
    prompt: string
  }[]
}

export default function OutfitResult({ results }: OutfitResultProps) {
  const [likedOutfits, setLikedOutfits] = useState<number[]>([])
  
  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
  
  const toggleLike = (index: number) => {
    setLikedOutfits(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    )
  }
  
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-6 justify-start">
        {results.map((outfit, index) => (
          <div key={index} className="flex-1 min-w-[250px]">
            <Card className="overflow-hidden border border-gray-300">
              <div className="relative">
                <img
                  src={outfit.image_path || "/placeholder.svg"}
                  alt={`${capitalizeFirstLetter(outfit.category)} recommendation`}
                  className="w-full h-80 object-contain"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 rounded-full p-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleLike(index)}
                >
                  <Heart 
                    className={`h-5 w-5 ${likedOutfits.includes(index) ? "fill-red-500 text-red-500" : "text-gray-500"}`} 
                  />
                </Button>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {capitalizeFirstLetter(outfit.category)}
                </h3>
                <p className="text-gray-600">{capitalizeFirstLetter(outfit.prompt)}</p>
              </CardContent>

              <CardFooter className="px-6 py-4 flex justify-center">
                <Button variant="outline" size="sm" className="border border-gray-300">
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}