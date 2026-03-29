import Dashboard from './Dashboard/Dashboard'
import Sidebar from './Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'

const App = () => {
  return (
    <>
    <BrowserRouter future={{
    v7_relativeSplatPath: true,
    v7_startTransition: true
  }}>
    <Routes>

     <Route path='/' element={<Layout />}>
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