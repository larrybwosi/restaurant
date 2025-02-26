import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const specialsData = [
  {
    name: "Grilled Mountain Salmon",
    price: "$28",
    description: "Fresh salmon with herbs, served with roasted vegetables",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80",
  },
  {
    name: "Eagle's Signature Steak",
    price: "$35",
    description: "Premium cut with garlic butter and truffle mash",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&q=80",
  },
  {
    name: "Summit Seafood Platter",
    price: "$45",
    description: "Daily catch selection with premium sides",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80",
  },
]

export default function Specials() {
  return (
    <div id="specials" className="py-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Today's Specials</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Indulge in our chef's carefully curated selection of exceptional dishes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialsData.map((special, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={special.image || "/placeholder.svg"}
                  alt={special.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-slate-800">{special.name}</h3>
                  <span className="text-amber-500 font-bold text-xl">{special.price}</span>
                </div>
                <p className="text-slate-600 mb-6">{special.description}</p>
                <Button variant="default" size="lg" className="w-full group">
                  Order Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

