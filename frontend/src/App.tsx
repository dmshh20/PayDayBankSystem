import Dashboard from './Dashboard/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Inbox from './Inbox/Inbox'
import InboxLetter from './Inbox/InboxLetter/InboxLetter'
import Wallets from './components/Wallets/Wallets'

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
        <Route path='/inbox' element={<Inbox></Inbox>} />
        <Route path='/wallets' element={<Wallets></Wallets>} />
        <Route path='/help' element='' />
        <Route path='/settings' element='' />
        <Route path='/inbox/:mailId' element={<InboxLetter></InboxLetter>}></Route>
     </Route>

        <Route path='/signup' element={<SignUp></SignUp>} />
        <Route path='/signin' element={<SignIn></SignIn>} />

    </Routes>

    </BrowserRouter>

    </>
  )
}

export default App