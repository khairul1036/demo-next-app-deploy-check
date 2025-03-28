import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import Discount from '../../models/Discount';

// CREATE a discount code - POST /api/discounts
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const discount = await Discount.create(body);

    return NextResponse.json({ success: true, data: discount }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// READ all discount codes - GET /api/discounts
export async function GET() {
  await dbConnect();

  try {
    const discounts = await Discount.find({});
    return NextResponse.json({ success: true, count: discounts.length, data: discounts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
