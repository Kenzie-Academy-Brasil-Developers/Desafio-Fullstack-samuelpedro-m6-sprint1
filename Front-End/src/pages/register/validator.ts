import { z } from "zod"


export const schema = z.object({
    fullName: z.string().min(1),
    email: z.string().email("Necessita ser um email válido"),
    password: z.string().min(1),
    telephone: z.string().min(8).max(15).refine((value) => isValidPhoneNumber(value), {
        message: "O número de telefone deve conter pelo menos 8 dígitos.",
    }),
})

function isValidPhoneNumber(value: string): boolean {
    return /^\d+$/.test(value);
}

export type RegisterData = z.infer<typeof schema>