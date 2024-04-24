export interface RoomCategory {
  category: string;
  hotelId: string;
}

export interface Booking {
  name: string;
  email: string;
  phone: number;
  roomCategory: string;
  roomNumber: number;
  checkInDate: Date;
  checkOutDate: Date;
}

export interface Room {
  number: number;
  category: string | undefined;
  hotelId: string;
  status: "AVAILABLE" | "BOOKED";
}

export interface AssignCategoryToRooms {
  category: string;
  roomNumbers: Array<number>;
}
