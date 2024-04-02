import {useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage' 
import { updateStart,updateSuccess,updateFailure } from '../redux/user/userSlice'
import { deleteStart,deleteSuccess ,signOutSuccess,deleteFailure } from '../redux/user/userSlice'
import { useDispatch} from 'react-redux'
import { app } from '../firebase'
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Alert, Modal, Button } from 'flowbite-react'

const DashProfile = () => {

  const navigate = useNavigate()
  const {currentUser} = useSelector((state)=>state.user)
  const[imageFile, setImageFile] = useState(null);
  const[imageFileUrl, setImageFileUrl] = useState(null);
  const[uploadProgress, setUploadProgress] = useState(null);
  const[formData, setFormData] = useState({});
  const[updateUserSuccess,setUpdateUserSuccess] = useState(null)
  const[updated,setupdated] = useState(false)
  const[modal,setShowModal] = useState(false);
  console.log(formData);
  const dispatch = useDispatch()

  console.log(uploadProgress,imageFileUrl)

  const fileRef = useRef()

  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    if(file)
    {
      setImageFile(file)
      // setImageFileUrl(URL.createObjectURL(file))
    }
  }

   useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);


  const uploadImage = async()=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,imageFile)  // now the file is uploaded
    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;  // upload progress
        setUploadProgress(progress.toFixed(0))   // 10.244543234
      },(error)=>{
        console.log(error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          console.log(downloadURL)
          setImageFileUrl(downloadURL)
          setFormData({...formData,image:downloadURL})  
        })
      }
    )
 }

 const handleChange = async(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
 }

 const handleSubmit = async(e)=>{
  e.preventDefault();

  try {
      dispatch(updateStart())
      const res = await fetch(`/api/update/${currentUser._id}`,{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
      });

      const data = await res.json()
      if(!res.ok)
      {
        dispatch(updateFailure(data.message))
        updateFailure(data.message);
      }else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User's profile updated successfully")
        setupdated(true)
      }

  } catch (error) {
      dispatch(updateFailure(error.message))
  }

 }

 const handleDeleteUser = async()=>{
  setShowModal(false)
  dispatch(deleteStart())
  try {
    const res = await fetch(`/api/delete/${currentUser._id}`,{
      method:'DELETE',
    })
    const data = await res.json()
    console.log(res)
    console.log(data)
    if(!res.ok)
    {
      dispatch(deleteFailure(data.message))
    }else{
      dispatch(deleteSuccess(data))
      navigate('/signin')
    }
  } catch (error) {
    console.log(error)
  }
 }

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
    <div className='flex flex-col mt-8 md:mt-[120px] items-center min-h-screen'>
    <div>
        <h1 className='text-center text-xl font-bold pb-3'>Profile</h1>
          <input hidden type="file" accept='image/*' ref={fileRef} onChange={handleImageChange} />
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col items-center gap-2'>
          <img className='w-[100px] h-[100px] p-2 my-3 border rounded-full object-contain' onClick={()=>fileRef.current.click()} src={imageFileUrl || currentUser.profilePicture} alt="profileImage" />
          <input id='username' className='w-[350px] rounded-[8px] text-black' onChange={handleChange} type="text" defaultValue={currentUser.username}/>
          <input id='email' className='w-[350px] rounded-[8px] text-black' onChange={handleChange} type="email" defaultValue={currentUser.email}/>
          <input id='password' className='w-[350px] rounded-[8px] text-black' onChange={handleChange} type="password" placeholder='Password'/>
          <button onClick={handleSubmit} className='bg-white text-black w-full rounded-[8px] py-1 border-2 border-transparent bg-gradient-to-r from-purple-400 to-blue-400 hover:bg-transparent hover:text-white hover:border-blue-600 transition-all duration-200'>Update</button>
          {
            currentUser.isAdmin && 
            <Link to='/createpost' className='bg-white text-black text-center w-full rounded-[8px] py-1 border-2 border-transparent bg-gradient-to-r from-purple-400 to-blue-400 hover:bg-transparent hover:text-white hover:border-blue-600 transition-all duration-200'>
              Create Post
            </Link>
          }
          <div className='text-red-400 hover:text-red-500 cursor-pointer pt-2 flex flex-row w-[300px] justify-between'>
            <div>
              <span onClick={()=>setShowModal(true)}>Delete Account</span>
            </div>
            <div>
              <span onClick={handleSignOut}>Sign out</span>
            </div>
            
          </div>
        </div>
      </form>
      {updated && (
        <Alert color='success' className='mt-4'>
          {updateUserSuccess}
        </Alert>
      ) }

        <Modal show={modal} onClose={()=>setShowModal(false)} popup size='md'>
          <Modal.Header />
            <Modal.Body>
              <div className='text-center items-center'>
                <AiOutlineExclamationCircle size={40} className='mx-auto' />
                <h1 className='mt-4'>Are yourself sure you want to delete your <br /> account </h1>
                  <Button onClick={handleDeleteUser} className=' bg-purple-500 mx-auto mt-4 hover:bg-purple-700'>Yes, sure</Button>
              </div>
            </Modal.Body>
        </Modal>

    </div>
    </div>
  )
}

export default DashProfile