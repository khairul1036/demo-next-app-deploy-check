import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Product from "../../models/Product";

// CREATE - POST /api/products
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const product = await Product.create(body);

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// GET ALL PRODUCTS - GET /api/products
export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}