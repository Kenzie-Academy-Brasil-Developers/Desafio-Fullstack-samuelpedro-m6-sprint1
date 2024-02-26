import { Exclude } from "class-transformer"
import { randomUUID } from "node:crypto"

export class User {
    readonly id: string
    fullName: string
    email: string

    @Exclude()
    password: string
    telephone: string
    readonly createdAt: Date;

    constructor() {
        this.id = randomUUID()
    }
}