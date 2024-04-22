export interface RoomType {
    type: string;
    hotelId: string;
  }
  
  export interface Booking {
    name: string;
    email: string;
    phone: number;
    roomType: RoomType;
    checkInDate: Date;
    checkOutDate: Date;
  }