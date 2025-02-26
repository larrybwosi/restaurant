import { Instagram, Facebook, Twitter, Clock, Phone, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Eagle's Nest</h3>
            <p className="text-gray-400 mb-6">Elevating your dining experience to new heights</p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Instagram size={24} />} />
              <SocialLink href="#" icon={<Facebook size={24} />} />
              <SocialLink href="#" icon={<Twitter size={24} />} />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Hours</h4>
            <div className="space-y-4">
              <FooterInfo icon={<Clock size={20} />} text="Mon-Fri: 11:00 AM - 10:00 PM" />
              <FooterInfo icon={<Clock size={20} />} text="Sat-Sun: 10:00 AM - 11:00 PM" />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <FooterInfo icon={<Phone size={20} />} text="(555) 123-4567" />
              <FooterInfo icon={<MapPin size={20} />} text="123 Skyview Drive, Cityville" />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates about special events and exclusive offers.
            </p>
            <div className="flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 text-white border-slate-700 focus:ring-amber-500"
              />
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Eagle's Nest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }) {
  return (
    <a href={href} className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
      {icon}
    </a>
  )
}

function FooterInfo({ icon, text }) {
  return (
    <div className="flex items-center text-gray-400 hover:text-amber-500 transition-colors duration-300">
      {icon}
      <span className="ml-3">{text}</span>
    </div>
  )
}

