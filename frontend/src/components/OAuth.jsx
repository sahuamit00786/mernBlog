import { FaGoogle } from "react-icons/fa6";
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {

    const auth = getAuth(app);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})

        try {
            const resultFromGoogle = await signInWithPopup(auth,provider)
            console.log(resultFromGoogle)
            const res = await fetch('/api/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:resultFromGoogle.user.displayName,
                    email:resultFromGoogle.user.email,
                    googlePhotoUrl:resultFromGoogle.user.photoURL
                })
            })

            const data = await res.json()
            if(res.ok)
            {
                dispatch(signInSuccess(data))
                navigate('/')
            }
            
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <>
    <button onClick={handleGoogleClick} className="w-full flex justify-center items-center gap-1 bg-gradient-to-r text-white from-indigo-400 via-purple-400 to-pink-400 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 border py-1 mt-2 rounded-[5px]">
        <FaGoogle/>  Continue with google
    </button>
    </>
  )
}

export default OAuth