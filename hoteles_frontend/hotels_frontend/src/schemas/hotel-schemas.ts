import z from "zod";

export const HotelAPIResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    email: z.string(),
    phone: z.string(),
    url: z.string().url(),
    floors: z.number(),
  });

  export const HotelsAPIResponseSchema= z.array(HotelAPIResponseSchema)

  export const ClientSchema= z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  })

  export const RoomAPIResponseSchema= z.object({
    id: z.string(),
    room_type: z.string(),
    room_number: z.number(),
    status: z.string(),
    floor: z.number(),
  })
  
  export const RoomsAPIResponseSchema= z.array(RoomAPIResponseSchema)

  export const ReservationAPIResponseSchema = z.object({
    client: z.string(),
    hotel: z.string(),
    room: z.string(),
    floor: z.number(),
    check_in_date: z.string().datetime(),
    check_out_date: z.string().datetime(),
  })