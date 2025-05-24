import type { StateCreator } from "zustand";
import type { Hotel } from "../types";
import { getHotel } from "../services/HotelServices";

export type HotelDetailSliceType = {
    hotel: Hotel
    fetchHotel: (id: Hotel['id']) => Promise<void>
    modal: boolean
    showModal: () => void
    hideModal: () => void
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
modal: false,
fetchHotel: async (id) => {
    //console.log("Renderizando Hotel...", id)
    const hotel= await getHotel(id);
    //console.log("Hotel", hotel)
    set({
        hotel: hotel,
    })
},
showModal: () => {
    set((state) => ({
        modal: true,
    }))
},
hideModal: () => {
    set((state) => ({
        modal: false,
    }))
},


})