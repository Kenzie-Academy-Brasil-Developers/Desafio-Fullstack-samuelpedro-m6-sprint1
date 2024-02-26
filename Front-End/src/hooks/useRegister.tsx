import { useContext } from "react"
import { RegisterContext } from "../providers/UserProvider"

export const userAuthRegister = () => {
    const registerContext = useContext(RegisterContext)
    return registerContext
}