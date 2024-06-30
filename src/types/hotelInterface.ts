import mongoose from "mongoose"

interface Address {
  streetAddress: string
  landMark: string
  district: string
  city: string
  pincode: string
  country: string
}
interface OwnerInterface {
  name: string
  email: string
}

export interface RoomInterface {
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
  title: string
  price: number
  maxAdults: number
  maxChildren: number
  desc: string
  roomNumbers: { number: number; unavailableDates: Date[] }[]
}

// Hotel interface
export interface HotelInterface {
  _id: mongoose.Types.ObjectId
  name: string
  ownerId:OwnerInterface
  destination: string
  description: string
  propertyRules: string[]
  reservationType: string
  stayType: string
  amenities: string[]
  isBlocked: boolean
  isListed: boolean
  createdAt: Date
  updatedAt: Date
  imageUrls: string[]
  address: Address
  ownerDocument: string
  hotelDocument: string
  ownerPhoto: string
  unavailbleDates: Date[]
  rooms: RoomInterface[]
}
export type UserInterface = {
  _id: string
  name: string
  email: string
  password: string
  profilePic: string
  role: string
  isVerified: boolean
  isBlocked: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export type BookingInterface = {
  _id: string
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  hotelId: HotelInterface
  userId: UserInterface
  maxPeople: number
  checkInDate: string
  checkOutDate: string
  totalDays: number
  price: number
  paymentMethod: string
  paymentStatus: string
  bookingStatus: string
  bookingId: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface BookingResponse {
  bookings: BookingInterface
}
