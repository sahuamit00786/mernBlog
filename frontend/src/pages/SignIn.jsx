import { Link } from "react-router-dom"

const SignIn = () => {
  return (
    <>
      <div className="flex justify-center items-center">
       <div className=" mx-auto w-[400px] mt-[120px] border shadow-lg p-8">
        <form>
          <div className="flex flex-col py-2">
          <label className="py-1 font-medium" >Username</label>
          <input type="text" placeholder="Enter your username" className="py-1 px-2 rounded-[5px]" />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-1 font-medium">Password</label>
          <input type="password" placeholder="Enter your password" className="py-1 px-2 rounded-[5px]" />
        </div>
        <button className="w-full bg-gradient-to-r text-white from-indigo-400 via-purple-400 to-pink-400 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 border py-1 mt-2 rounded-[5px]">
          Sign In
        </button>
        <div className="text-center mt-4">
          <Link to='/signup'>
         <span className="text-sm text-pink-600 hover:underline">Dont have account</span>
        </Link>
        </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default SignIn