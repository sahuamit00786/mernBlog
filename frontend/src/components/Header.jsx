import { Navbar,TextInput,Button } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {

    const path = useLocation().pathname;

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
            <Button color='gray'>
                <FaMoon />
            </Button>
            <Link to='/signin'>
                <Button gradientDuoTone='purpleToBlue'>
                    Sign in
                </Button>
            </Link>
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