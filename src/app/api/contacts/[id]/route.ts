import { NextRequest, NextResponse } from 'next/server';
import Contact from '../../../models/Contact';
import dbConnect from '../../../lib/dbConnect';

// Update a contact
export async function PUT(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    const body = await req.json();
    
    // Prevent updating email
    const { email, ...updateData } = body;
    
    // Add last updated timestamp
    updateData.lastUpdated = new Date();
    
    const updatedContact = await Contact.findByIdAndUpdate(
      id, 
      updateData, 
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!updatedContact) {
      return NextResponse.json({
        message: 'Contact not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      message: 'Contact updated successfully',
      contact: updatedContact
    });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Error updating contact',
      error: error.message
    }, { status: 400 });
  }
}

// Delete a contact
export async function DELETE(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return NextResponse.json({
        message: 'Contact not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      message: 'Contact deleted successfully',
      contact: deletedContact
    });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Error deleting contact',
      error: error.message
    }, { status: 400 });
  }
}

// Add a note to a contact
export async function PATCH(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    const { type, content, createdBy } = await req.json();
    
    // Validate input
    if (!['inquiries', 'followUps'].includes(type)) {
      return NextResponse.json({
        message: 'Invalid note type'
      }, { status: 400 });
    }
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return NextResponse.json({
        message: 'Contact not found'
      }, { status: 404 });
    }
    
    // Add note to the specified type
    contact[type].push({
      content,
      createdBy,
      createdAt: new Date()
    });
    
    // Save the updated contact
    const updatedContact = await contact.save();
    
    return NextResponse.json({
      message: `${type} note added successfully`,
      contact: updatedContact
    });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Error adding note',
      error: error.message
    }, { status: 400 });
  }
}