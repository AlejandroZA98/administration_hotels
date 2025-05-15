import {create} from 'zustand';
import {createHotelSlice} from './hotelSlice';
import type {HotelSliceType} from './hotelSlice';

import { devtools } from "zustand/middleware";


export const useAppStore = create<HotelSliceType>()(devtools((...a)=>({
    ...createHotelSlice(...a),

})))

