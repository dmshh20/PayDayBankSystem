import Dashboard from './Dashboard/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'
import ProtectedRoutes from './routes/ProtectedRoutes'

const App = () => {
  return (
    <>
    <BrowserRouter future={{
    v7_relativeSplatPath: true,
    v7_startTransition: true
  }}>
    <Routes>

     <Route element={<ProtectedRoutes>
          <Layout />    
            </ProtectedRoutes>}>

        <Route index element={<Dashboard></Dashboard>}/>
        <Route path='/inbox' element='' />
        <Route path='/wallets' element='' />
        <Route path='/help' element='' />
        <Route path='/settings' element='' />
     </Route>

        <Route path='/signup' element={<SignUp></SignUp>} />
        <Route path='/signin' element={<SignIn></SignIn>} />

    </Routes>

    </BrowserRouter>

    </>
  )
}

export default App