import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"

const SignIn = () => {

  const navigate = useNavigate()

  const[formData,setFormData] = useState({});
  const[error,setError] = useState('')
  const[loading,setLoading] = useState(false);

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {
      setLoading(true)
      const res = await fetch('/api/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false)
      {
        setLoading(false)
        return setError(data.message)
      }
      if(res.ok)
      {
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center">
       <div className=" mx-auto w-[300px] mt-[120px] border shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
          <label className="py-1 font-medium" >Username</label>
          <input id="username" onChange={handleChange} type="text" placeholder="Enter your username" className="py-1 px-2 rounded-[5px]" />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-1 font-medium">Password</label>
          <input id="password" onChange={handleChange} type="password" placeholder="Enter your password" className="py-1 px-2 rounded-[5px]" />
        </div>
        <button disabled={loading} onClick={handleSubmit} className="w-full bg-gradient-to-r text-white from-indigo-400 via-purple-400 to-pink-400 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 border py-1 mt-2 rounded-[5px]">
          {
            loading?"loading..":"Sign In"
          }
        </button>
        <div className="text-center mt-4">
          <Link to='/signup'>
         <span className="text-sm text-pink-600 hover:underline">Dont have account</span>
        </Link>
        </div>
        {
          error && <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        }
        </form>
      </div>
      </div>
    </>
  )
}

export default SignIn