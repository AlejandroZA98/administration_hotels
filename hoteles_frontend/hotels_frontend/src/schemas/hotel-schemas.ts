import z from "zod";

export const HotelAPIResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    email: z.string(),
    phone: z.string(),
    administrador: z.string(),
    administrador_name: z.string(),
    created_at: z.string(), // formato ISO
    updated_at: z.string(),
    room_details: z.object({
      suites: z.number(),
      single_rooms: z.number(),
      double_rooms: z.number(),
    }),
    url: z.string().url(),
  });

  export const HotelsAPIResponseSchema= z.array(HotelAPIResponseSchema)