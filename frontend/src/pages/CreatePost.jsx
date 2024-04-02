import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {TextInput,Select, FileInput, Button} from 'flowbite-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {

  const navigate = useNavigate();

  const[file,setFile] = useState()
  const[imageUploadProgress, setImageUploadProgress] = useState(null);
  const[imageUploadError, setImageUploadError] = useState(null)
  const[formData, setFormData] = useState({})
  const[publishError, setPublishError] = useState(null);

  console.log(formData)

  const handleUploadImage = async()=>{
    try {
      if(!file){
        return;
      }
      const storage = getStorage(app);
      const filename = new Date().getTime()+'-'+file.name;
      const storageRef = ref(storage,filename);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on('state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error)=>{
          console.log(error)
          setImageUploadError('Image upload failed')
          setImageUploadProgress(null);
        },()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageUploadProgress(null);
            setImageUploadError(null);
            console.log(downloadURL)
            setFormData({...formData,image:downloadURL})
          })
        }
      )

    } catch (error) {
      setImageUploadProgress(null);
      setImageUploadError('Image upload failed')
      console.log(error)
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const res = await fetch(`/api/createpost`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json();
      console.log(data)
      if(!res.ok)
      {
        setPublishError(data.message)
        return;
      }else{
        setPublishError(null)
        navigate(`/post/${data.slug}`)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
        <form className="flex flex-col gap-4">
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              <TextInput onChange={(e)=>setFormData({...formData, title:e.target.value})} type='text' placeholder='Title' required id='title' className='flex-1'/>
              <Select onChange={(e)=>setFormData({...formData, category:e.target.value})}>
                <option value='uncategorized'>Select a Category</option>
                <option value='javascript'>Javascript</option>
                <option value='react'>React</option>
              </Select>
            </div>
            <div className='flex gap-4 item-center justify-between border-4 my-3 border-gray-300 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
                <Button onClick={handleUploadImage} type='button' disabled={imageUploadProgress} size='sm' gradientDuoTone='purpleToBlue'>
                  {
                    imageUploadProgress ? 
                    <div className='w-14 h-14 text-center mx-auto items-center'>
                      <CircularProgressbar className='w-10 h-10' value={imageUploadProgress} text={`${imageUploadProgress}%`}/>
                      <span>Uploading ...</span>
                    </div> : 
                    'Upload image'
                  }
                </Button>
            </div>
            {
              imageUploadError && <div className="text-red-500 text-sm text-center">
                {imageUploadError}
              </div>
            }
            {
              formData.image && (
                <img src={formData.image} alt="upload" className='w-full h-72 object-contain' />
              )
            }
            <div>
              <ReactQuill onChange={(value)=>setFormData({...formData, content:value})} theme='snow' placeholder='Write Something' className='h-72 mb-3'/>
            </div>
            <button onClick={handleSubmit} className='bg-white my-8 text-black w-full rounded-[8px] py-1 border-2 border-transparent bg-gradient-to-r from-purple-400 to-blue-400 hover:bg-transparent hover:text-white hover:border-blue-600 transition-all duration-200'>Publish</button>
            {
              publishError && <div className="text-red-500 text-sm text-center">
                {publishError}
              </div>
            }
        </form>
    </div>
  )
}

export default CreatePost