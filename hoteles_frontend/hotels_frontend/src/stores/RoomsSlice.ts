import type { StateCreator } from "zustand";
import type {Hotel, Rooms } from "../types";
import { getRooms } from "../services/HotelServices";



export type RoomsSliceType = {
    rooms: Rooms
    fetchRooms: (hotelID : Hotel['id']) => Promise<void>
}
export const createRoomsSlice: StateCreator<RoomsSliceType> = (set) => ({
    rooms: [],
    fetchRooms: async (hotelID) => {
        const rooms = await getRooms(hotelID)
       set({
            rooms: rooms
        })
    },
})