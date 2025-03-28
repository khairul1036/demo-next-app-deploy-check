import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import LoyaltyPoints from '../../../models/LoyaltyPoints';

// GET User Loyalty Points - GET /api/loyalty/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const loyaltyPoints = await LoyaltyPoints.findOne({ userId: params.id });

    if (!loyaltyPoints) {
      return NextResponse.json({ success: false, error: 'No points found for this user' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: loyaltyPoints });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// ADD Loyalty Points - POST /api/loyalty/[id]
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { points, action } = await request.json();
    let loyaltyPoints = await LoyaltyPoints.findOne({ userId: params.id });

    if (!loyaltyPoints) {
      loyaltyPoints = await LoyaltyPoints.create({ userId: params.id, points: 0, history: [] });
    }

    loyaltyPoints.points += points;
    loyaltyPoints.history.push({ action, points, date: new Date() });

    await loyaltyPoints.save();

    return NextResponse.json({ success: true, data: loyaltyPoints });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
