import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './pages/PrivateRoute'
import CreatePost from './pages/CreatePost'
import OnlyAdminPrivate from './pages/OnlyAdminPrivate'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        <Route element={<OnlyAdminPrivate/>}>
          <Route path='/createpost' element={<CreatePost/>} />
        </Route>
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/createpost' element={<CreatePost/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App