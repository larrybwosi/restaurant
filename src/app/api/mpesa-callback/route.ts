import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  // Here you would typically update your database with the payment status
  console.log("M-Pesa callback received:", body)

  // Implement your logic to update the order status based on the callback

  return NextResponse.json({ result: "OK", message: "Callback received successfully" })
}

