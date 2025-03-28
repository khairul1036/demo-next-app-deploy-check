import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import Supplier from '../../models/Supplier';

// GET All Suppliers - GET /api/suppliers
export async function GET() {
  await dbConnect();

  try {
    const suppliers = await Supplier.find();
    return NextResponse.json({ success: true, data: suppliers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// ADD a New Supplier - POST /api/suppliers
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { name, contactEmail, phone, address } = await request.json();

    if (!name || !contactEmail || !phone || !address) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const supplier = await Supplier.create({ name, contactEmail, phone, address });

    return NextResponse.json({ success: true, data: supplier }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
