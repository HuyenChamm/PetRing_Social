// exports.getAllPost = (req, res) => {
//   const {post_setting} = req.query
//   const requestPubblic = post_setting ? `AND p.post_setting ='public'` : ``

//   req.session
//   .run(`MATCH (p:POST)-[n:POST]->(u:User) WHERE p.user_id = u.id ${requestPubblic} RETURN u,p`)
//   .then(data => {
//     // console.log(`MATCH (p:POST)-[n:POST]->(u:User) WHERE p.user_id = u.id ${requestPubblic} RETURN u.name,p`);
//     const nodes = data.records.map(record => {
//       return {
//       u: record.get('u').properties, 
//       post: record.get('p')?.properties}
//     });
    
//     res.json({
//       data: nodes
//     })
//   })
//   .catch(error => console.error(error))
  
// }

exports.getAllPost = async (req, res) => {
  const {post_setting} = req.query
  const requestPubblic = post_setting ? `WHERE p.post_setting ='public'` : ``

req.session.readTransaction( async tx => {
  // WHERE p.user_id = u.id
  const result =
    await tx.run(`MATCH (p:POST)-[n:POST]->(u:User)  ${requestPubblic} RETURN u,p,id(u),id(p)`);
  const nodes = result.records.map(record => {
            return { 
              u: record.get('u').properties, 
              post: record.get('p')?.properties,
              idu: record.get(`id(u)`).low,
              idp: record.get(`id(p)`).low
          };
        });
       
  res.json({
    data: nodes
  })
}).then(() => {
}).catch(error => {
  console.log(error);
});
}

exports.getPost = (req, res) => {
  res.send("Post: id");
}

exports.addPost = (req, res) => {

  req.session
  .run(`MATCH (p:POST)-[n:POST]->(u:User) WHERE p.user_id = u.id RETURN u,p`)
  .then(data => {
   
    const nodes = data.records.map(record => {
      return {
      u: record.get('u').properties, 
      post: record.get('p')?.properties}
    });
    
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
}

exports.updatePost = (req, res) => {
  res.send("UPDATE");
}

exports.deletePost = (req, res) => {
  res.send("DELETE");
}

