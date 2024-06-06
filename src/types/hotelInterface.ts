// import mongoose from "mongoose"
export interface Address {
  streetAddress: string;
  landMark: string;
  district: string;
  city: string;
  pincode: string;
  country: string;
}

export type HotelInterface={
  _id: string;
  name: string;
  ownerId: string;
  destination: string;
  address: Address;
  stayType: string;
  description: string;
  propertyRules: string[];
  room: number;
  bed: number;
  bathroom: number;
  guests: number;
  amenities: string[];
  isBlocked: boolean;
  isListed: boolean;
  imageUrls: string[];
  reservationType: string;
  isVerified: boolean;
  hotelDocument: string;
  ownerPhoto: string;
  unavailableDates: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  price: string;
}

export type UserInterface ={
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePic: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type BookingInterface={
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  hotelId: HotelInterface;
  userId: UserInterface;
  maxPeople: number;
  checkInDate: string;
  checkOutDate: string;
  totalDays: number;
  price: number;
  paymentMethod: string;
  paymentStatus: string;
  bookingStatus: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface BookingResponse {
  bookings: BookingInterface;
}