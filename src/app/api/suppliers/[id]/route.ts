import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Supplier from '../../../models/Supplier';

// GET a Single Supplier - GET /api/suppliers/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const supplier = await Supplier.findById(params.id);

    if (!supplier) {
      return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: supplier });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// UPDATE a Supplier - PUT /api/suppliers/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const body = await request.json();

    const updatedSupplier = await Supplier.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSupplier) {
      return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedSupplier });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE a Supplier - DELETE /api/suppliers/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(params.id);

    if (!deletedSupplier) {
      return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Supplier deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
