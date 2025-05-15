"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import UploadArea, { UploadItem } from "../../components/upload-area"
import OutfitResult from "../../components/outfit-result"
import Header from "../../components/header-main"
import Footer from "../../components/footer"
import FeaturesSection from "../../components/features-section"
import categoriesData from '../../app/outfit-category.json';
import { uploadOutfitsToBackend } from "@/api/upload_api"
import { getOutfitRecommendations, OutfitRecommendation } from "@/api/retrieve_api"
import {
            AlertDialog,
            AlertDialogAction,
            AlertDialogCancel,
            AlertDialogContent,
            AlertDialogDescription,
            AlertDialogFooter,
            AlertDialogHeader,
            AlertDialogTitle,
          } from "@/components/ui/alert-dialog"

export default function OutfitApp() {
  const [category, setCategory] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadItem[]>([])
  const [uploadAreaClearTrigger, setUploadAreaClearTrigger] = useState(0)

  const [activeTab, setActiveTab] = useState<string>("upload")
  const [showPromptAlert, setShowPromptAlert] = useState<boolean>(false)

  const [promptText, setPromptText] = useState<string>("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [loadingPrompt, setLoadingPrompt] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)

  const [outfitResults, setOutfitResults] = useState<OutfitRecommendation[]>([])
  
  // Function to handle form submission for outfit upload
  const handleSubmitOutfit = async () => {
    if (!category) {
      alert("Silakan pilih kategori terlebih dahulu")
      return
    }

    if (uploadedFiles.length === 0) {
      alert("Silakan upload minimal satu gambar")
      return
    }

    setLoadingUpload(true)

    try {
      const data = await uploadOutfitsToBackend(category, uploadedFiles.map(f => f.file))

      if ('status' in data && data.status === "success") {
        const failedImages = data.data.filter((item: any) => item.status === "failed")

        if (failedImages.length > 0) {
          const messages = failedImages.map((item: any) => `• ${item.filename}: ${item.reason}`).join("\n")
          alert(`Beberapa gambar gagal diunggah karena serupa dengan database:\n${messages}`)
        } else {
          setCategory("")
          setUploadedFiles([])
          setUploadAreaClearTrigger(prev => prev + 1)
          setShowPromptAlert(true)
        }

      } else {
        alert("Gagal mengunggah gambar, cek console log")
        console.error("Upload failed response:", data)
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengunggah gambar")
    } finally {
      setLoadingUpload(false)
    } 
  }
  
  // Function to handle category checkbox changes
  const handleCategoryChange = (categoryName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories(prev => [...prev, categoryName])
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== categoryName))
    }
  }
  
  // Function to handle prompt submission
  const handleSubmitPrompt = async () => {
    if (selectedCategories.length === 0) {
      alert("Silakan pilih minimal satu kategori")
      return
    }
    
    if (!promptText.trim()) {
      alert("Silakan masukkan prompt")
      return
    }

    console.log("Attempting to send request with:", { 
      prompt: promptText, 
      outfit_options: selectedCategories 
    });
    
    setLoadingPrompt(true)
    
    try {
      const data = await getOutfitRecommendations(promptText, selectedCategories)

      if (data.status === "success" && data.data.length > 0) {
        const mismatchIndexes: number[] = []

        // Bandingkan selectedCategories[i] === data.data[i].category
        for (let i = 0; i < selectedCategories.length; i++) {
          if (data.data[i]?.category !== selectedCategories[i]) {
            mismatchIndexes.push(i)
          }
        }

        // Kalau ada mismatch, kasih alert per item
        if (mismatchIndexes.length > 0) {
          mismatchIndexes.forEach(i => {
            alert(`Outfit option "${selectedCategories[i]}" tidak ditemukan di dalam dataset.`)
          })
        }

        // Hanya ambil item yang matching dengan selectedCategories (by index)
        const filteredResults = data.data.filter((item, index) => 
          item.category === selectedCategories[index]
        )

        if (filteredResults.length > 0) {
          setOutfitResults(filteredResults)
          setPromptText("")
          setSelectedCategories([])
          setActiveTab("result")
        } else {
          alert("Tidak ditemukan rekomendasi outfit yang sesuai kategori.")
        }

      } else {
        alert("Tidak ditemukan rekomendasi outfit.")
      }

    } catch (error: any) {
      alert(`Gagal mendapatkan rekomendasi:\n${error.message}`)
    } finally {
      setLoadingPrompt(false)
    }  
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 bg-gradient-to-r from-rose-50 to-teal-50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 shadow shadow-gray-300">
            <TabsTrigger value="upload" className="py-1 text-center hover:bg-white focus:bg-white [&[data-state='active']]:bg-white">
              Upload Outfit</TabsTrigger>
            <TabsTrigger value="prompt" className="py-1 text-center hover:bg-white focus:bg-white [&[data-state='active']]:bg-white">
              Rekomendasi AI</TabsTrigger>
            <TabsTrigger value="result" className="py-1 text-center hover:bg-white focus:bg-white [&[data-state='active']]:bg-white">
              Hasil Rekomendasi</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6 mx-3 ">
            <h3 className="text-2xl font-semibold mb-3 mx-4">Upload Koleksi Outfit Anda</h3>
            <p className="text-gray-600 mb-4 mx-4">Unggah setidaknya 2 item per kategori, semakin besar koleksi Anda, semakin baik AI dalam mengidentifikasinya.</p>
            <Card className="border-0 shadow-none ring-0">
              <CardContent>
                <div className="mb-7">
                  <label htmlFor="clothingCategory" className="block text-sm font-medium mb-2">
                    Kategori Pakaian
                  </label>
                  <select
                    id="clothingCategory"
                    className="w-full md:w-1/3 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Pilih Kategori</option>
                    {categoriesData.categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full mb-4">
                  <UploadArea 
                  onFilesChange={setUploadedFiles}
                  clearTrigger={uploadAreaClearTrigger} />
                </div>
                <Button 
                  className="w-full bg-black hover:bg-gray-800" 
                  onClick={handleSubmitOutfit}
                  disabled={loadingUpload}
                  >
                    {loadingUpload ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        <span>Loading...</span>
                      </span>
                    ) : (
                      <h4 className="text-white">Submit Koleksi Outfit Anda</h4>
                    )} 
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prompt" className="space-y-6 mx-3">
            <h3 className="text-2xl font-semibold mb-7">Minta Rekomendasi AI</h3>
            <Card className="border border-gray-300">
              <CardContent className="pt-3">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pilih Kategori</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
                      {categoriesData.categories.map((categoryName) => (
                        <div key={categoryName} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`category-${categoryName.toLowerCase()}`}
                            className="rounded border-gray-300 text-black focus:ring-black"
                            onChange={(e) => handleCategoryChange(categoryName, e.target.checked)}
                            checked={selectedCategories.includes(categoryName)}
                          />
                          <label htmlFor={`category-${categoryName.toLowerCase()}`} className="text-sm">
                            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium mb-2">
                      Prompt
                    </label>
                    <Textarea
                      id="prompt"
                      placeholder="Jelaskan outfit yang Anda inginkan. Contoh: Saya ingin outfit untuk jalan-jalan di mall dengan teman pada siang hari."
                      rows={10}
                      className="h-[130px] border border-gray-300"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full bg-black hover:bg-gray-800"
                    onClick={handleSubmitPrompt}
                    disabled={loadingPrompt}
                  >
                    {loadingPrompt ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        <span>Loading...</span>
                      </span>
                    ) : (
                      <h4 className="text-white">Dapatkan Rekomendasi Outfit</h4>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="result" className="mx-4">
            <h3 className="text-2xl font-semibold mb-7">Rekomendasi Outfit Anda</h3>
            {outfitResults.length > 0 ? (
              <OutfitResult results={outfitResults} />
            ) : (
              <p>
                Anda belum memiliki rekomendasi saat ini.
                <a onClick={() => setActiveTab("prompt")}
                  className="ml-1 text-rose-800 cursor-pointer">
                  Buat rekomendasi?
                </a>
              </p>
            )}
          </TabsContent>
        </Tabs>
      </section>

      <AlertDialog open={showPromptAlert} onOpenChange={setShowPromptAlert}>
            <AlertDialogContent className="bg-white border border-gray-200 shadow-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Minta Rekomendasi AI?</AlertDialogTitle>
                <AlertDialogDescription>
                  Anda telah selesai upload koleksi anda, lanjutkan ke Rekomendasi AI?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel 
                onClick={() => setShowPromptAlert(false)}
                className="bg-black text-white hover:bg-gray-800"
                  >
                  Decline
                </AlertDialogCancel>
                <AlertDialogAction 
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => {
                  setActiveTab("prompt")
                  setShowPromptAlert(false)
                }}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}