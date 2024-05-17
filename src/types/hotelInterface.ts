export type HotelInterface={
    _id:string;
    name:string;
    email:string;
    image:string;
    description:string;
    isBlocked:boolean;
    amenities:Array<string>;
    rooms:Array<Object>
    propertyRules:Array<string>
    aboutPropery:string;
    createdAt:Date;
};