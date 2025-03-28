import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Discount from '../../../models/Discount';

// UPDATE a discount code - PUT /api/discounts/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await request.json();

    const updatedDiscount = await Discount.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDiscount) {
      return NextResponse.json({ success: false, error: 'Discount code not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedDiscount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE a discount code - DELETE /api/discounts/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const deletedDiscount = await Discount.findByIdAndDelete(id);

    if (!deletedDiscount) {
      return NextResponse.json({ success: false, error: 'Discount code not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Discount code deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
