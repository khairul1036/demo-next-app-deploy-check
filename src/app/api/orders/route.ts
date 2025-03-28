import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Order from "../../models/Order";

// CREATE - POST /api/orders
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();

    const order = await Order.create(body);

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
// GET ALL PRODUCTS - GET /api/orders
export async function GET() {
  await dbConnect();

  try {
    const order = await Order.find({});
    return NextResponse.json({ success: true, data: order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
