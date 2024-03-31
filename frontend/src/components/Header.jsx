import { Navbar,TextInput,Button,Avatar, Dropdown } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const Header = () => {

    const path = useLocation().pathname;
    const dispatch = useDispatch()
    const{currentUser} = useSelector(state=>state.user)
    console.log(currentUser)

  return (
    <>
       <Navbar className="border-b-2">
          <Link to='/'>
            <span className="font-bold pl-2 py-1 bg-gradient-to-r text-white from-indigo-400 via-purple-400 to-pink-400 rounded-lg text-lg">write </span>
            <span className="font-bold text-lg px-1">yourself</span>
          </Link>
          <form>
            <TextInput 
                type="text" 
                placeholder="search"
                rightIcon={FaSearch}
                className="hidden lg:inline"/>
          </form>
          <Button className="bg-white lg:hidden border border-gray-200">
            <FaSearch color="gray"/>
          </Button>
          <div className="flex flex-row gap-3">
            <Button onClick={()=>dispatch(toggleTheme())} color='gray'>
                <FaMoon />
            </Button>
            {
              currentUser?
              <Dropdown inline label={<Avatar rounded alt="user" img={currentUser.profilePicture}/>} arrowIcon={false}>
                <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link to={'/dashboard?tab=profile'}>
                    Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>Log Out</Dropdown.Item>
              </Dropdown>
              :
              <Link to='/signin'>
                  <Button gradientDuoTone='purpleToBlue'>
                      Sign in
                  </Button>
              </Link>
            }
            <Navbar.Toggle />
          </div>

          <Navbar.Collapse color="gray">
            <Navbar.Link active={path === '/'}>
                <Link className="text-lg" to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/project'}>
                <Link className="text-lg" to='/project'>Project</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'}>
                <Link className="text-lg" to='/about'>About</Link>
            </Navbar.Link>
          </Navbar.Collapse>

       </Navbar>
    </>
  )
}

export default Header