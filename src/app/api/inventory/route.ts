import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Product from "../../models/Product";

// GET All Products - GET /api/inventory
export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find().populate("supplierId").lean();

    // Attach stock status manually
    const productsWithStatus = products.map((product) => ({
      ...product,
      stockStatus:
        product.stock === 0
          ? "Out of Stock"
          : product.stock < product.restockThreshold
          ? "Low Stock"
          : "In Stock",
    }));

    return NextResponse.json({ success: true, data: productsWithStatus });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// ADD a New Product - POST /api/inventory
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { name, sku, stock, restockThreshold, supplierId } =
      await request.json();

    if (
      !name ||
      !sku ||
      stock === undefined ||
      !restockThreshold ||
      !supplierId
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log({ name, sku, stock, restockThreshold, supplierId });

    const product = await Product.create({
      name,
      sku,
      stock,
      restockThreshold,
      supplierId,
    });

    console.log("hhhh" + product);

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
