"use client"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">MyStyleMatch</h2>
              <p className="text-gray-400 max-w-md">
                Platform AI yang membantu Anda menemukan outfit terbaik dari koleksi pakaian Anda.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
              <p className="text-gray-400">info@mystylematch.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MyStyleMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}