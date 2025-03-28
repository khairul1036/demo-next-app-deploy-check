import { NextRequest, NextResponse } from 'next/server';
import Contact from '../../models/Contact';
import dbConnect from '../../lib/dbConnect';

// Create a new contact
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Validate input
    const { name, email, phone, company, status } = body;
    
    // Create new contact
    const newContact = new Contact({
      name,
      email,
      phone,
      company,
      status
    });
    
    const savedContact = await newContact.save();
    
    return NextResponse.json({
      message: 'Contact created successfully',
      contact: savedContact
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Error creating contact',
      error: error.message
    }, { status: 400 });
  }
}

// Get all contacts with filtering and pagination
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    
    // Filtering options
    const filter: any = {};
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Sorting
    const sortField = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('order') || 'desc';
    
    const contacts = await Contact.find(filter)
      .sort({ [sortField]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Contact.countDocuments(filter);
    
    return NextResponse.json({
      contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Error fetching contacts',
      error: error.message
    }, { status: 400 });
  }
}