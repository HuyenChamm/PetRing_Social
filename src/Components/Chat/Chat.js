import React from 'react'

export default function Chat() {
  return (
    <div className='chat bg-slate-900 text-white'>
    <div className='py-16'>
      <div className='container'>
          <div className='w-3/4 mx-auto bg-slate-800 rounded-xl h-550 md:h-664'>
            <div className='py-5 px-3 flex'>
              <img src="/images/pet_7.jpg" className='w-16 h-16 rounded-full' alt="" srcset="" />
              <div className='pl-3 pt-5 font-bold'>
                <p>User Name</p>
              </div>
            </div>
            <div className='message-content px-5 h-73p md:h-3/4'>
              <div className='user-left py-3 flex justify-start'>
                <div className='bg-slate-600 w-3/4 lg:w-2/5 p-3 rounded-full border-solid border-2 border-slate-900 text-sm md:text-base'>
                  <p className='mb-0 '>Hi! My name is Maya.</p>
                </div>
              </div>
              <div className='user-right py-3 flex justify-end'>
                <div className='bg-slate-600 w-3/4 lg:w-2/5 p-3 rounded-full border-solid border-2 border-slate-900  text-sm md:text-base'>
                  <p className='mb-0'>Hi! My name is Maya.</p>
                </div>
              </div>
            </div>
            <div className='flex-col pb-5 mx-auto '>
              <input type="text" name="" id="" className='w-4/6 md:w-10/12 lg:w-11/12 ml-5 rounded-lg' />
              <i className="fa-solid fa-paper-plane pl-3"></i>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}
