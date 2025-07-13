import z from "zod"

export const registerSchema = z.object({
  name: z.string({required_error:"Name is required"}).min(3,{message:"Name must be at least 3 characters long"}).trim(),
  email: z.string({required_error:"Email is required"}).email({message:"Invalid email"}),
  password: z.string({required_error:"Password is required"}).max(20).min(6,{message:"Password must be at least 6 characters long"})
})

export type RegisterSchemaType = z.infer<typeof registerSchema>