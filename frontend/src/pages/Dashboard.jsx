import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashProfile from "../components/DashProfile"
import DashSidebar from "../components/DashSidebar"
import DashPosts from "./DashPosts"

const Dashboard = () => {
  const location = useLocation()
  const[tab,setTab] = useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')  // this give the tab=profile
    setTab(tabFromUrl)
    console.log(tabFromUrl)
  },[location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* sidebar */}
      <div>
        <DashSidebar/>
      </div>
      <div className="w-full">
        {
          tab === 'profile' && <DashProfile/> || tab === 'posts' && <DashPosts/>
        }
      </div>
    </div>
  )
}

export default Dashboard 