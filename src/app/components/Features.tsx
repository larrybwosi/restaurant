import { ChefHat, MapPin, Star } from "lucide-react"

const features = [
  {
    icon: <ChefHat size={32} className="text-amber-600" />,
    title: "Master Chefs",
    description: "Our award-winning culinary team crafts extraordinary dishes with passion and precision",
  },
  {
    icon: <MapPin size={32} className="text-amber-600" />,
    title: "Scenic Location",
    description: "Dine with panoramic city views from our sophisticated top-floor venue",
  },
  {
    icon: <Star size={32} className="text-amber-600" />,
    title: "Premium Experience",
    description: "Immerse yourself in an atmosphere of elegance and exceptional service",
  },
]

export default function Features() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 group"
            >
              <div className="bg-amber-100 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

