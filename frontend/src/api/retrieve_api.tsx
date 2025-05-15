export interface OutfitRecommendation {
  image_path: string
  score: number
  category: string
  prompt: string
}

export interface RecommendResponse {
  status: string
  data: OutfitRecommendation[]
}

export const getOutfitRecommendations = async (
  prompt: string,
  outfitOptions: string[]
): Promise<RecommendResponse> => {
  const payload = { prompt, outfit_options: outfitOptions }

  const response = await fetch("http://localhost:8000/recommend-outfit/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error("Retrieve outfit failed:", data)
    throw new Error(data.error || "Unknown error retrieving outfit")
  }

  return data
}
