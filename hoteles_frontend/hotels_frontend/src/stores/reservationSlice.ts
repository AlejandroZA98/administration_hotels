import type { StateCreator } from "zustand";
import type { Reservation } from "../types";
import { createReservation } from "../services/HotelServices";

export type ReservationType = {
    createReservation: (data: Reservation )=> Promise<void>;
}

export const createReservationSlice: StateCreator<ReservationType, [], [], ReservationType> = (set, get) => ({
createReservation: async (dataReservation) => {
    //console.log("Creando reservacion:", dataReservation);
    const data= await createReservation(dataReservation)
}


})