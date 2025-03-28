import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Customer from "../../../models/Customer";

// ADD an order to customer's history - POST /api/customers/orders
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { customerId, orderId, amount } = await request.json();

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    customer.orderHistory.push({ orderId, amount, date: new Date() });
    customer.frequency += 1;
    await customer.save();

    return NextResponse.json({ success: true, data: customer });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
