export type RoomInterface = {
    roomType: string;
    price: number;
  };
  
  export type HotelInterface = {
    _id: string;
    name: string;
    email: string;
    image: string;
    place: string;
    description: string;
    isBlocked: boolean;
    amenities: Array<string>;
    rooms: Array<RoomInterface>;
    propertyRules: Array<string>;
    aboutProperty: string;
    createdAt: Date;
  };
  