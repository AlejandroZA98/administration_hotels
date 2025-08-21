import type { StateCreator } from "zustand";
import type { Client, Hotel, Reservation } from "../types";
import { acceptReservation, canceledReservation, createReservation, getAllReservations } from "../services/HotelServices";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

export type ReservationType = {
    createReservation: (data: Reservation )=> Promise<void>
    clientInfo: Client
    hotel: Hotel
    getReservations: (status: string)=>Promise<void>
    reservations: Reservation[]
    acceptReservation: (reservationId: Reservation['id']) => Promise<void>
    canceledReservation: (reservationId: Reservation['id']) => Promise<void>

}

export const createReservationSlice: StateCreator<ReservationType&NotificationSliceType, [], [], ReservationType> = (set, get,api) => ({
 clientInfo: {
        id: '',
        name: '',
        email: '',
        phone: ''
    },
    hotel:{
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    url: "",
    floors: 0,
   
},
reservations: [],
createReservation: async (dataReservation) => {
    //console.log("Creando reservacion:", dataReservation);
   
    const data= await createReservation(dataReservation)
    if (data.id) {
        set({
                clientInfo:{
                    id: '',
                    name: '',
                    email: '',
                    phone: ''
                }
            })
        set({
            hotel: {
                id: "",
                name: "",
                address: "",
                email: "",
                phone: "",
                url: "",
                floors: 0,
            }
        })
        localStorage.setItem("hotel", JSON.stringify(get().hotel));
        localStorage.setItem("clientInfo", JSON.stringify(get().clientInfo));
        createNotificationSlice(set,get,api).showNotification({text:'Reservacion creada correctamente',error:false}) // Mostrar notificacion de que se elimino de favoritos
         setTimeout(() => {
                
                    set({
                        notification: {
                            show: false,
                            text: "",
                            error: false
                        }
                    })
             
                }, 3000)
        

    }
},
getReservations: async (status) => {
    const hotelId = localStorage.getItem("hotel_id");
    if (!hotelId) {
        createNotificationSlice(set,get,api).showNotification({text:'No existe un hotel',error:false}) // Mostrar notificacion de que se elimino de favoritos
        return;
    }
    const allReservations= await getAllReservations(hotelId, status);
    set({
        reservations: allReservations,
    })
    //console.log(allReservations);
    return allReservations ;
},
acceptReservation: async (reservationId) => {
    console.log("Aceptando reservacion desde slice:", reservationId);
    const acceptReservationService= await acceptReservation(reservationId);
   //console.log("Resultado de aceptar reservacion:", acceptReservationService['status']);
    if (acceptReservationService['status'] === 'aproved') {
        console.log("Reservacion aceptada correctamente");
        createNotificationSlice(set,get,api).showNotification({text:'Reservacion aceptada correctamente',error:false}) // Mostrar notificacion de que se elimino de favoritos
        setTimeout(() => {
            set({
                notification: {
                    show: false,
                    text: "",
                    error: false
                }
            })
        }, 3000)
    } else {
        createNotificationSlice(set,get,api).showNotification({text:'Error al aceptar la reservacion',error:true}) // Mostrar notificacion de que se elimino de favoritos
    }
},
canceledReservation: async (reservationId) => {
    console.log("Calcelando reservacion desde slice:", reservationId);
    const canceledReservationService= await canceledReservation(reservationId);
   //console.log("Resultado de aceptar reservacion:", acceptReservationService['status']);
    if (canceledReservationService['status'] === 'canceled') {
        console.log("Reservacion canceled correctamente");
        createNotificationSlice(set,get,api).showNotification({text:'Reservacion cancelada correctamente',error:false}) // Mostrar notificacion de que se elimino de favoritos
        setTimeout(() => {
            set({
                notification: {
                    show: false,
                    text: "",
                    error: false
                }
            })
        }, 3000)
    } else {
        createNotificationSlice(set,get,api).showNotification({text:'Error al aceptar la reservacion',error:true}) // Mostrar notificacion de que se elimino de favoritos
    }
}

})