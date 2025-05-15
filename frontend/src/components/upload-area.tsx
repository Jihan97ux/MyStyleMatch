"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Upload, X, Check } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

export type UploadItem = {
  url: string
  name: string
  file: File  // Store the actual file object for later submission
}

interface UploadAreaProps {
  onFilesChange: (files: UploadItem[]) => void
  clearTrigger?: number
}

export default function UploadArea({ onFilesChange, clearTrigger }: UploadAreaProps) {
  const [files, setFiles] = useState<UploadItem[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setFiles([])
  }, [clearTrigger])

  // Update parent component whenever files change
  useEffect(() => {
    onFilesChange(files)
  }, [files, onFilesChange])

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const imageFiles = Array.from(selectedFiles).filter(file =>
      file.type.startsWith("image/")
    )

    const imageUrls = imageFiles.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file: file, // Store the actual file for later submission
    }))

    setFiles(prevFiles => [...prevFiles, ...imageUrls])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    e.target.value = ""
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    URL.revokeObjectURL(newFiles[index].url)
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  return (
    <Card className="border border-gray-300">
      <CardContent className="p-4">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
        />

        {files.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group text-center">
                  <div className="flex flex-col items-center">
                    <div className="h-40">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                  </div>

                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>

                  <div className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-1 shadow">
                    <Check className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full border border-gray-300" onClick={openFileDialog}>
              <Upload className="h-4 w-4 mr-2" />
              Add More Outfit
            </Button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
              isDragging ? "border-gray-200 bg-gray-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 mb-1">Drag & drop atau klik untuk upload</p>
            <p className="text-xs text-gray-400">JPG, PNG, WEBP (Max 5MB)</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}