import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Payment from "../../models/Payment";

// CREATE - POST /api/payments
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();

    const payment = await Payment.create(body);

    return NextResponse.json({ success: true, data: payment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
// GET ALL PRODUCTS - GET /api/payments
export async function GET() {
  await dbConnect();

  try {
    const payment = await Payment.find({});
    return NextResponse.json({ success: true, data: payment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
