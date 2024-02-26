import { useContext } from "react"
import { DashboardContext } from "../providers/DashboardProvider"

export const userAuthDashboard = () => {
    const dashboardContext = useContext(DashboardContext)
    return dashboardContext
}