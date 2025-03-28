import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Discount from '../../../models/Discount';

// APPLY a discount code - POST /api/discounts/apply
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { code, cartTotal } = await request.json();
    
    const discount = await Discount.findOne({ code, isActive: true });

    if (!discount) {
      return NextResponse.json({ success: false, error: 'Invalid or expired discount code' }, { status: 400 });
    }

    // Check expiration
    if (new Date(discount.expiresAt) < new Date()) {
      return NextResponse.json({ success: false, error: 'Discount code has expired' }, { status: 400 });
    }

    // Check usage limit
    if (discount.usageCount >= discount.usageLimit) {
      return NextResponse.json({ success: false, error: 'Discount usage limit reached' }, { status: 400 });
    }

    let discountAmount = 0;

    if (discount.discountType === 'percentage') {
      discountAmount = (cartTotal * discount.amount) / 100;
    } else {
      discountAmount = discount.amount;
    }

    const newTotal = cartTotal - discountAmount;

    // Increment usage count
    discount.usageCount += 1;
    await discount.save();

    return NextResponse.json({ success: true, discountAmount, newTotal });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
