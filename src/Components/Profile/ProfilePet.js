import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';

export default function ProfilePet(props) {
  const {isLoggedIn} = props
  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    const str = document.cookie;
    const params = str.substring(3);  
    apiGeneral({ url:`/api/pet/${params}`})
    .then(data => {
      setNodes (data.data);
    })
    .catch(error =>{
      console.log(error);
    })
  },[])

  return (
    <div>
    {
      isLoggedIn ? 
      <div className='profilepet bg-slate-900 text-white'>
      {
        nodes.map((node) => (
        <div className='container pt-24 md:pt-32 pb-4' key={node.idpet}>
          <div className='py-4 bg-slate-800 rounded-md'>
            <img src={"/images/" + node.pet.img} className='w-24 h-24 md:w-32 md:h-32 rounded-full ml-10 -mt-16 border-solid border-4 border-white' alt="" />
            <div className='block md:flex justify-between px-12'>

              <div className=' pt-5'>
                <div>
                  <h4>{node.pet.name}</h4>
                  <p>{node.pet.desc}</p>
                </div>
                <div className=''>
                  <button type="submit" className='px-4 py-1 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400'>Follow <i className="fa-solid fa-plus"></i></button>
                </div>
              </div>

              <div className='flex pt-5 md:block'>
                <div className='hover:bg-slate-900 px-2 md:px-10 py-3'>
                  <p className='mb-0'>0 Follower</p>
                </div>
                <div className='hover:bg-slate-900 px-2 md:px-10 py-3'>
                  <p className='mb-0'>10 Like</p>
                </div>
              </div>

            </div>
          </div>
          <div className='bg-slate-800 border-solid border-2 border-slate-900 mt-5 py-8 rounded-md px-8 md:px-12 '>
            <div className='flex'>
              <img src={"/images/" + node.pet.img} className='w-16 h-16 mb-5 rounded-full' alt=""  />
              <div className='pl-8 font-bold pt-5'><p>{node.pet.name}</p></div>
            </div>
            <div className='text-sm md:text-base'>
              <p>
              Hello! My name is <span>{node.pet.name}</span>. I'm a <span>{node.pet.type}</span>. My weight is <span>{node.pet.weight}</span>. Now, I'm <span>{node.pet.age}</span> 
              </p>
            </div>
        
           
            <div className='bg-slate-900 py-16 rounded-md'>
              <img src="/images/bgprofilepet.png" className='m-auto' alt=""/>
              <img src={"/images/" + node.pet.img} className='w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto -mt-32 hover:scale-125 transition duration-300 ease-in-out ' alt="" />
              <div className='text-center  pt-10 md:text-h5'>
                <p><strong> Welcome {node.pet.name} !</strong></p>
              </div>
            </div>
          </div>
        </div> 
        ))} 
      </div>
      : 
      <AlertLogin/>
    }
    </div>
  )
}
