// app/api/productsAnalysis/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import ProductModel from '../../../models/ProductModel';

// Get a single product by ID
export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const product = await ProductModel.findById(params.id);
    
    if (!product) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

// Update a product
export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      params.id, 
      body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 400 });
  }
}

// Delete a product
export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const deletedProduct = await ProductModel.findByIdAndDelete(params.id);
    
    if (!deletedProduct) {
      return NextResponse.json({
        success: false,
        message: 'Product not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}