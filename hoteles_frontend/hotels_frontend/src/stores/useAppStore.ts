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
import {createReservationSlice} from './reservationSlice';
import type { ReservationType } from './reservationSlice';
import { logInSlice} from './logInSlice';
import type { LogInSliceType } from './logInSlice'; 
import { devtools } from "zustand/middleware";


export const useAppStore = create<HotelSliceType & HotelDetailSliceType & ModalRegisterSliceType &
 NotificationSliceType & RoomsSliceType & ReservationType & LogInSliceType>()(devtools((...a)=>({
    ...createHotelSlice(...a),
    ...createHotelDetailSlice(...a),
    ...createModalRegisterSlice(...a),
    ...createNotificationSlice(...a),
    ...createRoomsSlice(...a),
    ...createReservationSlice(...a),
    ...logInSlice(...a)

})))

