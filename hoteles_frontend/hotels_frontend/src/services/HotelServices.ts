import axios from "axios";
import {HotelAPIResponseSchema, HotelsAPIResponseSchema, RoomsAPIResponseSchema} from "../schemas/hotel-schemas";
import type { Hotel } from "../types";

export async function getHotels() {
    const url='http://127.0.0.1:8000/hotels/hotels-list/'
    const data=await axios.get(url)
    const result=HotelsAPIResponseSchema.safeParse(data.data)
    // console.log("DATOS",data)
    // console.log("DATOS2",data.data)
    // console.log("RESULT",result)
    if (result.success) {
        return result.data;
    }

}

export async function getHotel(id: string) {
    const url=`http://127.0.0.1:8000/hotels/hotel-detail/${id}/`
    const data=await axios.get(url)
    const result=HotelAPIResponseSchema.safeParse(data.data)
    // console.log("DATOS",data)
    // console.log("DATOS2",data.data)
    // console.log("RESULT",result)
    if (result.success) {
        return result.data;
    }
}

export async function registerClient(dataClient: any) {
    //console.log("Registering user...", dataClient);
    const url='http://127.0.0.1:8000/clients/register/'
    try{
        const response=await axios.post(url, dataClient)
        //console.log("DATOS",response)
        return response.data
    }catch (error:any) {
        //console.log("Error registering user", error)
        return error.response.data 
        }
}

export async function getRooms(hotelId: Hotel["id"]) {
//console.log("Buscando cuartos...", hotelId);
    const url=`http://127.0.0.1:8000/hotels/rooms-list/${hotelId}/`
    const data=await axios.get(url)
    const result=RoomsAPIResponseSchema.safeParse(data.data)
    // console.log("DATOS",data)
    // console.log("DATOS2",data.data)
    // console.log("RESULT",result)
    if (result.success) {
       // console.log("CUARTOS CORRECTOS", result.data)
        return data.data;
    }
    
}

export async function createReservation(data: any) {
    //console.log("Creando RESERVA:", data);
    const url=`http://127.0.0.1:8000/reservations/reservation-create/`
    try {
        const response = await axios.post(url, data);
      //  console.log("DATOS", response.data);

        return response.data;
    } catch (error: any) {
        //console.error("Error creating reservation", error);
        return error.response.data;
    }
    
}

export async function createLogin(data: any) {
    //console.log("Creando LOGIN:", data);
    const url=`http://127.0.0.1:8000/users/api/token/`
    try{
        const response = await axios.post(url, data);
        //console.log("DATOS", response.data);
        return response.data;
    }
    catch (error: any) {
      //  console.error("Error creating login", error);
        return error.response.data;
    }
}

export async function getHotelInfo(data: any) {
  //console.log("Obteniendo información del hotel con tokens:", data);
  const { access, refresh,hotel} = data;
  console.log("HOTEL ID",hotel);
  const makeRequest = async (token: string) => {
    return await fetch(`http://127.0.0.1:8000/hotels/hotel-detail/${hotel}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  // 1. Intenta obtener la info con el access token
  let response = await makeRequest(access);

  // 2. Si el token expiró, intenta refrescar
  if (response.status === 401) {
    const refreshResponse = await fetch("http://127.0.0.1:8000/users/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    if (refreshResponse.ok) {
      const refreshData = await refreshResponse.json();
      const newAccess = refreshData.access;

      // Guarda el nuevo access token
      localStorage.setItem("accessToken", newAccess);

      // Reintenta la petición original con el nuevo token
      response = await makeRequest(newAccess);
    } else {
      throw new Error("No se pudo refrescar el token");
    }
  }

  if (response.ok) {
    const hotelData = await response.json();
  //  console.log("Información del hotel:", hotelData);
    return hotelData;
  } else {
    throw new Error("Error al obtener información del hotel");
  }
}
