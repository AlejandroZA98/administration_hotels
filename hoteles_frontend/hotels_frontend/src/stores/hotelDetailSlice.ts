import type { StateCreator } from "zustand";
import type { Hotel } from "../types";
import { getHotel } from "../services/HotelServices";

export type HotelDetailSliceType = {
    hotel: Hotel
    fetchHotel: (id: Hotel['id']) => Promise<void>
    modal: boolean
    showModal: () => void
    hideModal: () => void
    loadHotelFromStorage: () => void
};

export const createHotelDetailSlice: StateCreator<HotelDetailSliceType> = (set,get) => ({
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
    localStorage.setItem("hotel", JSON.stringify(get().hotel));
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
loadHotelFromStorage: () => {
    const hotel = localStorage.getItem("hotel");
    if (hotel) {
        set({
            hotel: JSON.parse(hotel)
        })
    }

}
})