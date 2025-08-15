import type { StateCreator } from "zustand";
import type {Hotel, Rooms } from "../types";
import { createRoom, getRooms } from "../services/HotelServices";



export type RoomsSliceType = {
    rooms: Rooms
    fetchRooms: (hotelID : Hotel['id']) => Promise<void>
    fetchCreateRoom: (data: any) => Promise<void>
}
export const createRoomsSlice: StateCreator<RoomsSliceType> = (set) => ({
    rooms: [],
    fetchRooms: async (hotelID) => {
        const rooms = await getRooms(hotelID)
       set({
            rooms: rooms
        })
    },
    fetchCreateRoom: async (data) => {
        const creatingRoom = await createRoom(data)
        return creatingRoom
    }
})