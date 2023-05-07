import React, { useEffect, useState } from 'react'
import apiGeneral from '../../../api/apiGeneral';

export default function Like(props) {
  const [nodes, setNodes] = useState([]);
  const  params = { post_id : props.postId };

  useEffect(() => {
    apiGeneral({ url: `/api/like`, params})
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      <div className='pr-3 pb-3 text-black flex'>
        <i className="fa-solid fa-heart pr-2 text-slate-900" />
        {
        nodes.map((node) => (
        <p key={node.count}>{node.count} Like</p> 
        ))}
      </div>
    </div>
  )
}
