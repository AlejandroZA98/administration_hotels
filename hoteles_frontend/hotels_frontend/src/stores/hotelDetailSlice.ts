import type { StateCreator } from "zustand";
import type { Hotel } from "../types";
import { getHotel } from "../services/HotelServices";

export type HotelDetailSliceType = {
    hotel: Hotel
    fetchHotel: (id: string) => Promise<void>
};

export const createHotelDetailSlice: StateCreator<HotelDetailSliceType> = (set) => ({
hotel:{
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    url: "",
   
},
fetchHotel: async (id: Hotel['id']) => {
    //console.log("Renderizando Hotel...", id)
    const hotel= await getHotel(id);
    //console.log("Hotel", hotel)
    set({
        hotel: hotel,
    })
},



})