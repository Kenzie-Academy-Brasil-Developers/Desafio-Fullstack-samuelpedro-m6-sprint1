import { randomUUID } from "node:crypto"

export class Contact {
    readonly id: string
    fullName: string
    email: string
    telephone: string
    user_id?: string
    readonly createdAt: Date;

    constructor() {
        this.id = randomUUID()
    }
}
