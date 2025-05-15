import { Upload } from "lucide-react"
import { Card, CardContent } from "./ui/card"

export default function FeaturesSection() {
  return (
    <section className="bg-gradient-to-r from-rose-50 to-teal-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border border-gray-300">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Koleksi</h3>
              <p className="text-gray-600">
                Upload gambar pakaian dari koleksi Anda untuk rekomendasi yang personal.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-gray-300">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-emerald-600"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Prompt AI</h3>
              <p className="text-gray-600">Jelaskan gaya dan kebutuhan Anda, AI akan memahami preferensi Anda.</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-300">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-600"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rekomendasi Cerdas</h3>
              <p className="text-gray-600">Dapatkan rekomendasi outfit yang sesuai dengan koleksi dan gaya Anda.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}