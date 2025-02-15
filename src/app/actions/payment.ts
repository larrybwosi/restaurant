"use server"

import axios from "axios"

const DARAJA_API_URL = process.env.DARAJA_API_URL
const CONSUMER_KEY = process.env.DARAJA_CONSUMER_KEY
const CONSUMER_SECRET = process.env.DARAJA_CONSUMER_SECRET
const BUSINESS_SHORT_CODE = process.env.DARAJA_BUSINESS_SHORT_CODE!
const PASSKEY = process.env.DARAJA_PASSKEY
const CALLBACK_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa-callback`

export async function initiateMpesaPayment(phoneNumber: string, amount: number) {
  try {
    // Generate access token
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64")
    const tokenResponse = await axios.get(`${DARAJA_API_URL}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    const accessToken = tokenResponse.data.access_token

    // Generate timestamp
    const date = new Date()
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2)

    // Generate password
    const password = Buffer.from(BUSINESS_SHORT_CODE + PASSKEY + timestamp).toString("base64")

    // Initiate STK push
    const response = await axios.post(
      `${DARAJA_API_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: BUSINESS_SHORT_CODE,
        PhoneNumber: phoneNumber,
        CallBackURL: CALLBACK_URL,
        AccountReference: "Eagle's Nest Restaurant",
        TransactionDesc: "Payment for food order",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error("Error initiating M-Pesa payment:", error)
    throw new Error("Failed to initiate payment")
  }
}

