import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Where Luxury Meets
          <span className="text-amber-500"> Culinary Excellence</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
          Experience fine dining at its peak with breathtaking city views
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button variant="default" size="lg" className="group">
            Explore Menu
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button variant="outline" size="lg">
            Make Reservation
          </Button>
        </div>
      </div>
    </div>
  )
}

