export interface Note {
    content: string;
    createdBy: string;
    createdAt: Date;
  }
  
  export interface Contact {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status: 'Active' | 'Inactive' | 'Prospect' | 'Customer';
    inquiries?: Note[];
    followUps?: Note[];
    createdAt?: Date;
    lastUpdated?: Date;
  }
  
  export interface ContactFilters {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }
  
  export interface ContactPagination {
    currentPage: number;
    totalPages: number;
    totalContacts: number;
  }