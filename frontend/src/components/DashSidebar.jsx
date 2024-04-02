import { Sidebar } from "flowbite-react"
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { GiPostStamp } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

const DashSidebar = () => {

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-60">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item active label={currentUser.isAdmin ? 'Admin' : 'User'} icon={FaUser}>
                    <Link to='/dashboard?tab=profile'>
                      Profile
                    </Link>
                </Sidebar.Item>
                <Sidebar.Item active icon={GiPostStamp}>
                    <div className="w-full cursor-pointer">
                      <Link to='/dashboard?tab=posts'>
                      Posts
                    </Link>
                    </div>
                </Sidebar.Item>
                <Sidebar.Item active icon={HiArrowNarrowRight}>
                    <span onClick={handleSignOut}>Sign Out</span>
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar