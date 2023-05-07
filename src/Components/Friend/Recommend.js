import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';

export default function Recommend(props) {
  const {isLoggedIn} = props
  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    apiGeneral({ url:`/api/user`})
    .then(data => {
      setNodes (data.data);
    })
    .catch(error =>{
      console.log(error);
    })
  },[])
  return (
    <div className='recommend text-slate-900'>
    {
      isLoggedIn ? 
      <div className='container py-10 '>
        <h5 className='text-center'>Recommend friends for you </h5>
        <div className='w-full md:w-3/4 mx-auto'>

        {
        nodes.map((node) => (
          <div className='item py-3'>
            <div className='flex justify-around '>
              <div className='flex'>
                <div>
                  <img src={"/images/" + node.avt} className="w-16 h-16 rounded-full border-2 border-solid border-slate-900" alt="" />
                </div>
                <div className='pl-4 mt-2'>
                  <p className='mb-1 font-bold'>{node.name}</p>
                  <p className=' text-slate-500'>{node.address}</p>
                </div>
              </div>
              <div className='mt-2 pb-2 text-center'>
                <button className='px-6 py-2 text-sm font-bold border-2 border-solid border-slate-900'>
                  + <span className='hidden  md:inline-block'> ADD FRIEND</span>
                </button>
              </div>
            </div>
            <div className='border-b-2 border-solid border-slate-400 w-full md:w-3/5 mx-auto'></div>
          </div>
        ))}

        </div>
      </div>
      :
      <AlertLogin/>
    }
    </div>
  )
}
