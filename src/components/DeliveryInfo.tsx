"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Home, 
  Navigation, 
  Building, 
  Info, 
  Check, 
  Bike 
} from "lucide-react"

const DeliveryInfo: React.FC = () => {
  const [locationType, setLocationType] = useState<"address" | "pin">("address")
  const [locationDetails, setLocationDetails] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  
  const handleLocationVerify = () => {
    // Simulate location verification
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
          Delivery Information
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="full-name" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <User size={15} className="mr-1.5 text-indigo-500" />
              Full Name
            </Label>
            <div className="relative">
              <Input 
                id="full-name"
                type="text" 
                placeholder="Enter your full name" 
                className="pl-10 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400" 
              />
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <Phone size={15} className="mr-1.5 text-indigo-500" />
              Phone Number
            </Label>
            <div className="relative">
              <Input 
                id="phone"
                type="tel" 
                placeholder="Enter your phone number" 
                className="pl-10 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400" 
              />
              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              We'll send delivery updates to this number
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <MapPin size={15} className="mr-1.5 text-indigo-500" />
              Delivery Location
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Info size={15} className="text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-56 text-xs">Choose between entering your address manually or pinning your exact location on the map</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Tabs defaultValue="address" 
            value={locationType} 
            onValueChange={(v) => setLocationType(v as "address" | "pin")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="address" className="flex items-center">
                <Home size={16} className="mr-2" />
                Address
              </TabsTrigger>
              <TabsTrigger value="pin" className="flex items-center">
                <Navigation size={16} className="mr-2" />
                Pin Location
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="address" className="space-y-3">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Street Address" 
                  className="pl-10 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400" 
                />
                <Home className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Apartment, Suite, etc. (optional)" 
                    className="pl-10 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400" 
                  />
                  <Building className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <Input 
                  type="text" 
                  placeholder="City/Town" 
                  className="border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400" 
                />
              </div>
              
              <Textarea 
                placeholder="Additional directions or landmarks to help our driver (optional)" 
                className="resize-none border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 min-h-[80px]"
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
              />
            </TabsContent>
            
            <TabsContent value="pin" className="space-y-3">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg text-center p-4 h-[200px] flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-gray-600">
                <MapPin size={32} className="text-indigo-500 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Interactive map would be displayed here
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-indigo-600 border-indigo-300 hover:bg-indigo-50"
                >
                  <Navigation size={14} className="mr-1" />
                  Use Current Location
                </Button>
              </div>
              
              <Textarea 
                placeholder="Add details to help the driver find you (building name, landmarks, etc.)"
                className="resize-none border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 min-h-[80px]"
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
              />
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={handleLocationVerify} 
            variant="outline" 
            size="sm" 
            className="mt-1 text-indigo-600 border-indigo-300 hover:bg-indigo-50"
          >
            <Check size={14} className="mr-1" />
            Verify Location
          </Button>
          
          {showSuccessAlert && (
            <Alert className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30">
              <Check className="h-4 w-4 mr-2" />
              <AlertDescription>Location verified successfully!</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row items-center bg-indigo-50 dark:bg-indigo-900/20 rounded-b-xl p-4 gap-3">
        <div className="flex items-center text-indigo-600 dark:text-indigo-400">
          <Bike size={24} className="mr-3 animate-pulse" />
          <div>
            <p className="font-medium">Estimated Delivery Time</p>
            <p className="text-sm text-indigo-700 dark:text-indigo-300">30-45 minutes</p>
          </div>
        </div>
        <div className="flex-1"></div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
              >
                <Info size={14} className="mr-1" />
                How is this calculated?
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-56 text-xs">
                Delivery time is estimated based on your location, traffic conditions, and restaurant preparation time
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

export default DeliveryInfo