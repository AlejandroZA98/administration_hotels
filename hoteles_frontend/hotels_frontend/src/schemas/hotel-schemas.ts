import z from "zod";

export const HotelAPIResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    email: z.string(),
    phone: z.string(),
    url: z.string().url(),
  });

  export const HotelsAPIResponseSchema= z.array(HotelAPIResponseSchema)