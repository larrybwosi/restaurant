"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Phone, Shield, AlertCircle, Check } from "lucide-react"
import { initiateMpesaPayment } from "@/app/actions/payment"
import { z } from "zod"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "./ui/card"
import {
  IconBrandVisa,
  IconBrandMastercard,
  IconBrandPaypal,
  IconDeviceMobile
} from "@tabler/icons-react";

interface PaymentSummaryProps {
  subtotal: number
  tax: number
  tip: number
  tipAmount: number
  total: number
  onPayment: (method: "card" | "mpesa") => void
}

// Zod schema for phone number validation
const phoneSchema = z
  .string()
  .min(9, "Phone number is too short")
  .max(15, "Phone number is too long")
  .refine((val) => /^(?:\+?254|0)?[17]\d{8}$/.test(val), {
    message: "Please enter a valid Kenyan phone number",
  })

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ subtotal, tax, tip, tipAmount, total, onPayment }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(false)
  const [showSuccessIndicator, setShowSuccessIndicator] = useState(false)

  // Format and validate phone number
  useEffect(() => {
    if (!phoneNumber) {
      setValidationError(null)
      setIsValid(false)
      setFormattedPhoneNumber("")
      return
    }

    let formatted = phoneNumber.trim()
    
    // Handle different input formats and convert to +254 format
    if (formatted.startsWith("0")) {
      formatted = "+254" + formatted.substring(1)
    } else if (formatted.startsWith("7") || formatted.startsWith("1")) {
      formatted = "+254" + formatted
    } else if (formatted.startsWith("254")) {
      formatted = "+" + formatted
    }

    try {
      phoneSchema.parse(formatted)
      setIsValid(true)
      setValidationError(null)
      setFormattedPhoneNumber(formatted)
      setShowSuccessIndicator(true)
      setTimeout(() => setShowSuccessIndicator(false), 2000)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationError(err.errors[0].message)
      }
      setIsValid(false)
    }
  }, [phoneNumber])

  const handleMpesaPayment = async () => {
    if (!isValid) return
    
    setIsLoading(true)
    setError(null)
    try {
      const response = await initiateMpesaPayment(formattedPhoneNumber, total)
      console.log("M-Pesa payment initiated:", response)
      onPayment('mpesa')
    } catch (error) {
      setError("Failed to initiate payment. Please try again.")
      console.error("Error initiating M-Pesa payment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800 dark:text-gray-200 flex items-center">
        <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
        Payment Summary
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-gray-600 dark:text-gray-400 flex items-center cursor-help">
                  Tip ({tip}%)
                  <AlertCircle size={14} className="ml-1 text-gray-400" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-56">Customary tip for excellent service</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="font-semibold text-gray-800 dark:text-gray-200">${tipAmount.toFixed(2)}</span>
        </div>
        
        <motion.div 
          className="border-t pt-4 mt-2"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Total</span>
            <span className="font-bold text-xl text-indigo-700 dark:text-indigo-400">${total.toFixed(2)}</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 space-y-5">
        <Button
          onClick={() => onPayment('card')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 h-auto rounded-lg transition-all duration-300 transform hover:scale-102 flex items-center justify-center shadow-md hover:shadow-lg"
        >
          <CreditCard size={18} className="mr-2 opacity-90" />
          Pay with Card
        </Button>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1 flex items-center">
            <Phone size={16} className="mr-2 text-gray-500" />
            M-Pesa Phone Number
          </p>
          
          <div className="relative">
            <Input
              type="tel"
              placeholder="e.g. 07XXXXXXXX or 254XXXXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full pl-10 pr-10 transition-all ${
                validationError 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                  : isValid 
                    ? "border-green-300 focus:border-green-500 focus:ring-green-200" 
                    : "border-gray-300 dark:border-gray-600"
              }`}
            />
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            
            <AnimatePresence>
              {showSuccessIndicator && isValid && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Check className="text-green-500" size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {formattedPhoneNumber && isValid && (
            <p className="text-xs text-green-600 dark:text-green-400 ml-1">
              Will send to: {formattedPhoneNumber}
            </p>
          )}
          
          {validationError && (
            <p className="text-xs text-red-500 ml-1">{validationError}</p>
          )}
          
          <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            Enter your M-Pesa registered number with or without country code
          </p>
        </div>

        <Button
          onClick={handleMpesaPayment}
          disabled={isLoading || !isValid}
          className={`w-full py-3 h-auto rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg ${
            isValid && !isLoading
              ? "bg-green-600 hover:bg-green-700 text-white transform hover:scale-102"
              : "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Phone size={18} className="mr-2 opacity-90" />
          )}
          Pay with M-Pesa
        </Button>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        <div className="flex items-center justify-center space-x-5 mb-3">
          <IconBrandVisa size={32} className="opacity-70 hover:opacity-100 transition-opacity" />
          <IconBrandMastercard size={32} className="opacity-70 hover:opacity-100 transition-opacity" />
          <IconBrandPaypal size={32} className="opacity-70 hover:opacity-100 transition-opacity text-purple-600" />
          <img src="/api/placeholder/32/21" alt="Discover" className="opacity-70 hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-center justify-center text-xs">
          <Shield size={14} className="mr-1 text-green-600" />
          Secure payment processing. Your data is protected.
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentSummary