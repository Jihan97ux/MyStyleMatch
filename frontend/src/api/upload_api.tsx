export interface UploadResponse {
  status: string
  data: any[]
}

export const uploadOutfitsToBackend = async (
  category: string,
  files: File[]
): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append("category", category)

  files.forEach(file => {
    formData.append("files", file)
  })

  try {
    const response = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const data: UploadResponse = await response.json()
    return data

  } catch (error) {
    console.error("Upload API error:", error)
    throw error
  }
}
