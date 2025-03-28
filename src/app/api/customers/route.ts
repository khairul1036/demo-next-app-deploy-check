import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Customer from "../../models/Customer";

// CREATE a new customer - POST /api/customers
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const customer = await Customer.create(body);

    return NextResponse.json(
      { success: true, data: customer },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    // Extract query parameters for filtering
    //   const { name, product, location, days } = request.nextUrl.searchParams;

    // Use URLSearchParams to extract query parameters
    const url = new URL(request.url);
    const name = url.searchParams.get("name");
    const product = url.searchParams.get("product");
    const location = url.searchParams.get("location");
    const days = url.searchParams.get("days");

    let filter: any = {};

    // Apply search filter for 'name' (case-insensitive)
    if (name) {
      filter.name = { $regex: new RegExp(name, "i") }; // Search name (case-insensitive)
    }

    // Apply search filter for 'product' (searching orderId in orderHistory)
    if (product) {
      filter["orderHistory.orderId"] = { $regex: new RegExp(product, "i") }; // Search product in orderHistory
    }

    // Apply filter for 'location' (case-insensitive search)
    if (location) {
      filter.location = { $regex: new RegExp(location, "i") }; // Search location (case-insensitive)
    }

    // Apply filter for 'days' (filter orders in the last N days)
    if (days) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(days)); // Subtract days
      filter["orderHistory.date"] = { $gte: daysAgo }; // Filter by orderHistory.date
    }

    // Find customers matching the filter criteria
    const customers = await Customer.find(filter);

    // If no data is found, return a message
    if (customers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No customers found with the specified filters.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}


// Example Requests:
// No Filters (All Customers):
// /api/customers will return all customers.

// Filtering by Name:
// /api/customers?name=Nahid will return customers whose name contains "Nahid" (case-insensitive).

// Filtering by Product (Order ID):
// /api/customers?product=ORD125 will return customers who have made an order with orderId "ORD125".

// Filtering by Location:
// /api/customers?location=Dhaka will return customers whose location contains "Dhaka" (case-insensitive).

// Filtering by Days:
// /api/customers?days=7 will return customers who have placed orders within the last 7 days.