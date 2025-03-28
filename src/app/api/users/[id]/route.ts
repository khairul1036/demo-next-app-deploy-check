import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Adjust the import path as needed
import User from '../../../models/User'; // Adjust the import path as needed

// READ SINGLE - GET /api/users/[id]
export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const user = await User.findById(params.id);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}

// UPDATE - PUT /api/users/[id]
export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const body = await request.json();
    const user = await User.findByIdAndUpdate(
      params.id, 
      body, 
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}

// DELETE - DELETE /api/users/[id]
export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const user = await User.findByIdAndDelete(params.id);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {}
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}