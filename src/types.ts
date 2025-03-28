// types for Customer
export interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    createdAt: string
}

export interface Orders {
    _id: string;
    customerName: string;
    customerEmail: string;
    customerLocation: string;
    productName: string;
    productPrice: number;
    totalPrice: number;
    totalQuantity: number;
    category: string;
    brand: string;
    orderDate: string;
    createdAt: string
}

export interface Products {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number
    stock: number
    category: string;
    brand: string;
    rating: number;
    reviews: number;
    warranty: string;
    return_policy: string;
    createdAt: string;
}

export interface Payments {
    _id: string;
    id: string;
    customerName: string;
    customerEmail: string;
    customerLocation: string;
    paybill: number;
    due: number;
    status: string;
    trxId: string;
    paymentMethod: string;
    paymentDate: string;
    createdAt: string;
}

export interface Suppliers {
    _id: string;
    name: string;
    contactEmail: string;
    phone: string;
    address: string;
    createdAt: string;
}

export interface Contacts {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: 'Active' | 'Inactive' | 'Prospect' | 'Customer';  // Enum 
    createdAt: string;  // Date when the contact was created
}