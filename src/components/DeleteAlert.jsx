import { LoaderCircle } from 'lucide-react';
import { useState } from 'react'

const DeleteAlert = ({content, onDelete, setOpenDeleteAlert}) => {
  const [loading,setLoading] = useState(false);
  const handleDelete =async()=> {
    try {
        setLoading(true)
        const response = await onDelete();
        if(response?.status===200){
            setLoading(false)
        }
    }finally {
        setLoading(false)
    }
}

  return (
    <div>
        <p className='text-sm'>{content}</p>
         <div className='flex flex-row items-center-safe justify-end-safe gap-3 mt-6'>
            <button 
                className='bg-red-800 text-white cursor-pointer font-medium px-6 py-2 rounded-lg' 
                onClick={handleDelete} 
                type='button'>
                { loading ? (
                  <div className='flex flex-row items-center-safe gp-3'>
                    <LoaderCircle className='w-4 h-4 animate-spin'/>
                    Deleting...
                  </div> ) : (
                        <> Delete </>
                    )}

            </button>
            <button 
                className='bg-blue-800 cursor-pointer text-white font-medium rounded-lg px-6 py-2' 
                onClick={()=>setOpenDeleteAlert({show:false,data:null})}>
                Cancel
            </button>
        </div>
        
    </div>
  )
}

export default DeleteAlert