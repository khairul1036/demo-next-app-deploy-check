import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import Referral from '../../models/Referral';
import { v4 as uuidv4 } from 'uuid';

// CREATE Referral Code - POST /api/referrals
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { referrerId } = await request.json();
    const referralCode = uuidv4().slice(0, 8); // Generate unique referral code

    const referral = await Referral.create({ referrerId, referralCode, rewardPoints: 50, status: 'pending' });

    return NextResponse.json({ success: true, data: referral });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// APPLY Referral Code - PUT /api/referrals
export async function PUT(request: NextRequest) {
  await dbConnect();

  try {
    const { referralCode, referredId } = await request.json();
    const referral = await Referral.findOne({ referralCode, status: 'pending' });

    if (!referral) {
      return NextResponse.json({ success: false, error: 'Invalid or expired referral code' }, { status: 400 });
    }

    referral.referredId = referredId;
    referral.status = 'completed';

    await referral.save();

    return NextResponse.json({ success: true, message: 'Referral applied successfully', data: referral });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
