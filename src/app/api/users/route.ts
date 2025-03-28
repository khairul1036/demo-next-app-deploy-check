import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect'; // Adjust the import path as needed
import User from '../../models/User'; // Adjust the import path as needed

// CREATE - POST /api/users
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const user = await User.create(body);
    
    return NextResponse.json({
      success: true,
      data: user
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}

// READ ALL - GET /api/users
export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({});
    

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}