import {create} from 'zustand';
import {createHotelSlice} from './hotelSlice';
import type {HotelSliceType} from './hotelSlice';
import {createHotelDetailSlice} from './hotelDetailSlice';
import type {HotelDetailSliceType} from './hotelDetailSlice';
import {createModalRegisterSlice} from './modalRegisterSlice';
import type {ModalRegisterSliceType} from './modalRegisterSlice';
import type { NotificationSliceType } from './notificationSlice';
import { createNotificationSlice } from './notificationSlice';
import type { RoomsSliceType } from './RoomsSlice';
import { createRoomsSlice } from './RoomsSlice';
import { devtools } from "zustand/middleware";


export const useAppStore = create<HotelSliceType & HotelDetailSliceType & ModalRegisterSliceType &
 NotificationSliceType & RoomsSliceType>()(devtools((...a)=>({
    ...createHotelSlice(...a),
    ...createHotelDetailSlice(...a),
    ...createModalRegisterSlice(...a),
    ...createNotificationSlice(...a),
    ...createRoomsSlice(...a),

})))

