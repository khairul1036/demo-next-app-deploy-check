import mongoose from 'mongoose';

// Define the schema for notes/follow-ups
const NoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

// Define the Contact Schema
const ContactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: { 
    type: String, 
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
  },
  company: { 
    type: String, 
    trim: true 
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Prospect', 'Customer'],
    default: 'Active'
  },
  inquiries: [NoteSchema],
  followUps: [NoteSchema],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true,
  methods: {
    addNote(type: 'inquiries' | 'followUps', content: string, createdBy: string) {
      this[type].push({
        content,
        createdBy,
        createdAt: new Date()
      });
      return this.save();
    }
  }
});

// Prevent re-compilation of the model
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;