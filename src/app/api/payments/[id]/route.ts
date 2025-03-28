import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Payment from "../../../models/Payment";

// GET SINGLE PAYMENT - GET /api/payments/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id } = params;
    const payment = await Payment.findById(id);

    if (!payment) {
      return NextResponse.json(
        { success: false, error: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: payment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Invalid payment ID" },
      { status: 400 }
    );
  }
}
// UPDATE Payment - PUT /api/payments/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await request.json();

    const updatedPayment = await Payment.findByIdAndUpdate(id, body, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!updatedPayment) {
      return NextResponse.json(
        { success: false, error: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedPayment },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Invalid Payment ID or data" },
      { status: 400 }
    );
  }
}

// DELETE PAYMENT - DELETE /api/payments/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id } = params;
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return NextResponse.json(
        { success: false, error: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Payment deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Invalid Payment ID" },
      { status: 400 }
    );
  }
}
