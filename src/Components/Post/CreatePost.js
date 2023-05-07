import React, { useEffect, useRef, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';

export default function CreatePost(props) {
  const [nodes, setNodes] = useState([]);

  const [content, setContent] = useState('');
  const [option, setOption] = useState('');

  const { isLoggedIn } = props


  /////////////////// Handle input File images
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = () => {
    inputRef.current.click();
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };
////////////////////////
console.log(option);

////////////////////////
  useEffect(() => {
    const str = document.cookie;
    const params = str.substring(3);
    apiGeneral({ url: `/api/user/${params}` })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
////////////////////
  return (
    <div className='container '>
      {
        isLoggedIn ?
          <div className='shadow-sm py-10 px-3 rounded-2xl lg:flex justify-around shadow-slate-900 bg-white'>
            <div className='flex '>
            {
              nodes.map((node) => (
             <div key={node.id}>
              <img src={"/images/" + node.n.avt} className="w-16 h-16 border-slate-900 border-solid border-2 rounded-full" alt="" />
              <p className='pt-5 font-bold  text-slate-900'>{node.n.name}</p>
             </div>
              ))}
                
             
            </div>
            <div className='flex justify-center md:mt-2'>
            <div>
            <div className='down_md:my-5'>
                <button onClick={handleFileSelect} className='mr-5 w-14 h-14 md:w-20 md:h-20 border-2 border-solid border-slate-600 rounded-md text-slate-900'>+</button>
                <div>
                  <input ref={inputRef} onChange={handleInputChange} className='hidden' type="file" />
                  {selectedFile && (
                    <p className='text-xs mb-0 mt-1'>{`${selectedFile.name} `}</p>
                  )}
                </div>
              </div>
              <div className='w-24 mt-4 -ml-2'>
                  <select   value={option} onChange={(event) => setOption(event.target.value)} 
                   className="bg-gray-50 border border-slate-600 text-gray-900 text-xs rounded-full block w-full px-2.5">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
            </div>
             

              <textarea value={content} onChange={(event) => setContent(event.target.value)} 
              placeholder='User name, bạn đang nghĩ gì thế ?' 
              className="resize-y rounded-md border-solid border-2 border-slate-600 w-48 px-2 down_md:my-5 md:w-80 lg:w-96 xl:w-664"></textarea>
            </div>
            <div className='text-center'>
              <button type="submit" className="text-white bg-slate-900 border-solid  border-2 hover:bg-orange-700 font-medium rounded-full text-sm  sm:w-auto px-5 py-1 md:my-5 text-center">Post</button>
            </div>
          </div>
          :
          <div className='shadow-sm py-10 px-3 rounded-2xl flex shadow-slate-900 bg-white justify-center  font-bold'>
            <p>Please log in to continue !</p><a className='text-slate-900 pl-3' href="/Login">LOG IN</a>
          </div>

      }
    </div>
  )
}
