export interface RoomCategory {
  category: string;
  hotelId: string;
  noOfRooms?: number;
}

export interface Booking {
  hotelId: string;
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
  bookedBy: string;
  dateBooked: Date;
}

export interface AssignCategoryToRooms {
  category: string;
  roomNumbers: Array<number>;
}
