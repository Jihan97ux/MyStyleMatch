"use client"

import Link from "next/link"
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="bg-white border border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Button variant="outline" className="border border-gray-300">Chat</Button>
        <Link href="/">
          <h1 className="text-xl font-bold">MyStyleMatch</h1>
        </Link>
      </div>
    </header>
  )
}