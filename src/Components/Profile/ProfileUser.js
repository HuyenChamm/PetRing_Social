import React, { useEffect, useState } from 'react';
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';

export default function ProfileUser(props) {
  const {isLoggedIn} = props
  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    const str = document.cookie;
    const params = str.substring(3);  

    apiGeneral({ url:`/api/user/${params}`})
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
      <div className='user pb-20 text-white bg-slate-900 '>
      {
        nodes.map((node) => (
     
        <div className='container pt-10 lg:flex justify-around' key={node.id}>
          <div className=' shadow-sm  shadow-slate-400 bg-slate-800 w-11/12 mx-auto lg:w-1/4 text-center rounded-md'>
            <div className='py-10'>
              <img src={"/images/" + node.n.avt} className="mx-auto  w-40 h-40 shadow-md rounded-full shadow-slate-400" alt="" />
            </div>
            <div className='pb-16'>
              <h5>{node.n.name}</h5>
            </div>
            <div className='pb-5 flex-col justify-end'>
              <button type="submit" className="text-white shadow-sm shadow-slate-400 hover:bg-slate-00 font-medium rounded-full text-sm   px-5 py-1 text-center">Change Password</button>
            </div>
          </div>
          <div className=' shadow-sm shadow-slate-400 bg-slate-800 w-11/12 mx-auto mt-10 lg:mt-0 lg:w-2/4  rounded-md py-10 '>
            <div className='text-center'>
              <h5>Information</h5> 
              <div className='border-2 border-solid border-slate-700 mb-5'></div> 
            </div>
            <div className='flex justify-center'>
              <ul className='item-left'>
                <li>
                  <p> Name </p>
                </li>
                <li>
                  <p>Gender </p>
                </li>
                <li>
                  <p>D.O.B </p>
                </li>
                <li>
                  <p>Address </p>
                </li>
                <li>
                  <p>Phone </p>
                </li>
                <li>
                  <p>Email </p>
                </li>
              </ul>
              <ul className='pl-10'>
                <li>
                  <p>{node.n.name}</p>
                </li>
                <li>
                  <p>{node.n.sex}</p>
                </li>
                <li>
                  <p>{node.n.dob}</p>
                </li>
                <li>
                  <p>{node.n.address}</p>
                </li>
                <li>
                  <p>{node.n.phone}</p>
                </li>
                <li>
                  <p>{node.n.email}</p>
                </li>
              </ul>
            </div>
            <div className=' text-end pr-10'>
              <button type="submit" className="text-white shadow-sm shadow-slate-400 hover:bg-slate-00 font-medium rounded-full text-sm   px-5 py-1 text-center">Edit Information</button>
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
