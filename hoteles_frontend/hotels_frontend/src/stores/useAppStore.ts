import {create} from 'zustand';
import {createHotelSlice} from './hotelSlice';
import type {HotelSliceType} from './hotelSlice';
import {createHotelDetailSlice} from './hotelDetailSlice';
import type {HotelDetailSliceType} from './hotelDetailSlice';

import { devtools } from "zustand/middleware";


export const useAppStore = create<HotelSliceType & HotelDetailSliceType>()(devtools((...a)=>({
    ...createHotelSlice(...a),
    ...createHotelDetailSlice(...a),

})))

