// app/api/productsAnalysis/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import ProductModel, { IProduct } from '../../models/ProductModel';

// Create a new product
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const newProduct = await ProductModel.create(body);
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 400 });
  }
}

// Get all products
export async function GET() {
  try {
    await dbConnect();
    
    const products = await ProductModel.find({});
    
    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}