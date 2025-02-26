"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className={`text-3xl font-extrabold ${isScrolled ? "text-slate-800" : "text-white"}`}>
            Eagle's Nest
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#home" isScrolled={isScrolled}>
              Home
            </NavLink>
            <NavLink href="#menu" isScrolled={isScrolled}>
              Menu
            </NavLink>
            <NavLink href="#specials" isScrolled={isScrolled}>
              Specials
            </NavLink>
            <NavLink href="#delivery" isScrolled={isScrolled}>
              Delivery
            </NavLink>
            <Button variant="default" size="lg">
              Reserve Table
            </Button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${isScrolled ? "text-slate-800" : "text-white"}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <MobileNavLink href="#home">Home</MobileNavLink>
            <MobileNavLink href="#menu">Menu</MobileNavLink>
            <MobileNavLink href="#specials">Specials</MobileNavLink>
            <MobileNavLink href="#delivery">Delivery</MobileNavLink>
            <Button variant="default" size="lg" className="w-full">
              Reserve Table
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children, isScrolled }) {
  return (
    <Link
      href={href}
      className={`${isScrolled ? "text-slate-600" : "text-white"} hover:text-amber-500 transition-colors duration-300`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }) {
  return (
    <Link href={href} className="block px-3 py-2 text-slate-600 hover:text-amber-500 transition-colors duration-300">
      {children}
    </Link>
  )
}

