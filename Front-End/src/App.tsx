import "./styles/index.scss"
import { RoutesMain } from './routes'
import { AuthProvider } from './providers/AuthProvider'
import { RegisterProvider } from "./providers/UserProvider"
import { MainPageProvider } from "./providers/DashboardProvider"


function App() {

  return (
    <>
      <RegisterProvider>
        <AuthProvider>
          <MainPageProvider>
            <RoutesMain />
          </MainPageProvider>
        </AuthProvider>
      </RegisterProvider>
    </>
  )
}

export default App
