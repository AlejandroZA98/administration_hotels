import type { StateCreator } from "zustand";
import { createLogin } from "../services/HotelServices";
import {createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

type dataLoginType = {
    username: string;
    password: string;
}
export type LogInSliceType={
    login: (data: dataLoginType)=>Promise<{ access: string; refresh: string} >
}

export const logInSlice:StateCreator<LogInSliceType & NotificationSliceType,[],[],LogInSliceType>=(set,get,api)=>({
    login: async(data)=>{
        //console.log("Recibiendo data",data)
        const loginAccess= await createLogin(data)

        //console.log("DATOS LOGIN",loginAccess)
        if (loginAccess.access) { 
            //console.log("Login exitoso", loginAccess.access);
            localStorage.setItem("accessToken", loginAccess.access);
            localStorage.setItem("refreshToken", loginAccess.refresh);
            return loginAccess;

        }
        else{
          //  console.log("Login fallido", loginAccess);
            createNotificationSlice(set,get,api).showNotification({text:'Acceso denegado',error:true}) // Mostrar notificacion de que se elimino de favoritos
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
        return
        

    }
})