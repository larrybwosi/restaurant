import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Delivery() {
  return (
    <div id="delivery" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Bringing the <span className="text-amber-500">Eagle's Nest</span> Experience Home
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Enjoy our exceptional cuisine in the comfort of your home. Fast, reliable delivery within 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button variant="default" size="lg" className="group">
                Order Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button variant="outline" size="lg">
                View Menu
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80"
              alt="Delivery"
              className="w-full h-[500px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

