import type { StateCreator } from "zustand";

import type { Hotel } from "../types";
import { updateHotel } from "../services/HotelServices";

export type UpdateLoginSliceType = {
    updateHotel: (data: Partial<Hotel>) => Promise<void>;

}
export const updateLoginSlice:StateCreator<UpdateLoginSliceType> = (set,get,api) => ({

    updateHotel: async (data)=>{
        
        const updateDataHotel = await updateHotel(data);
    }

}) 