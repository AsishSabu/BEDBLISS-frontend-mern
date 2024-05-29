interface Address {
  streetAddress: string;
  landMark: string;
  district: string;
  city: string;
  pincode: string;
  country: string;
}
  
  export type HotelInterface = {
    name: string;
    place: string;
    address: Address;
    stayType: string;
    description: string;
    room: string;
    bed: string;
    bathroom: string;
    guests: string;
    price: number;
    propertyRules: string[];
    amenities: string[];
    reservationType: string;
  };
  


