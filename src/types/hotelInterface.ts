interface Address {
  streetAddress: string;
  landMark: string;
  district: string;
  city: string;
  pincode: string;
  country: string;
}
  
  export type HotelInterface = {
    _id:string;
    name: string;
    destination: string;
    address: Address;
    stayType: string;
    description: string;
    room: number;
    bed: number;
    bathroom: number;
    guests: number;
    price: string;
    propertyRules: string[];
    amenities: string[];
    reservationType: string;
    imageUrls:string[];
    ownerPhoto:string;
    hotelDocument:string;
    isVerified:boolean;
    
  };
  


