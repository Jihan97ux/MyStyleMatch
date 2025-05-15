"use client"

import Link from "next/link"
import { Button } from "../components/ui/button"
import Header from "../components/header"
import Footer from "../components/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-50 to-teal-50 py-16 min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">AI Women Outfit Recommender</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Upload koleksi outfit Anda, jelaskan kebutuhan dan perasaan anda, dan dapatkan rekomendasi outfit yang sempurna untuk gaya Anda.
          </p>
          <Link href="/main-app">
            <Button size="lg" className="bg-black hover:bg-gray-800">
              <h4 className="text-white">Try MyStyleMatch AI</h4>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}