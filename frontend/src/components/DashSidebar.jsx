import { Sidebar } from "flowbite-react"
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { GiPostStamp } from "react-icons/gi";


const DashSidebar = () => {
  return (
    <Sidebar className="w-full md:w-60">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item active label={'User'} icon={FaUser}>
                    <Link to='/dashboard?tab=profile'>
                      Profile
                    </Link>
                </Sidebar.Item>
                <Sidebar.Item active icon={GiPostStamp}>
                    <Link to='/dashboard?tab=posts'>
                      Posts
                    </Link>
                </Sidebar.Item>
                <Sidebar.Item active icon={HiArrowNarrowRight}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar