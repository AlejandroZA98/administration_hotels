import type { StateCreator } from "zustand";
import { getHotels } from "../services/HotelServices";
import type { Hotels } from "../types";

export type HotelSliceType = {
    hotels: Hotels

    fetchHotels: () => Promise<void>
}

export const createHotelSlice:StateCreator<HotelSliceType> = (set) => ({

hotels: [],
fetchHotels: async () => {
    console.log("Fetching hotels...");
    const hotels= await getHotels();
    set({
        hotels: hotels,
    })
},


})