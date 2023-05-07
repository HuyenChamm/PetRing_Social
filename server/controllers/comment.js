exports.getAllComment = async (req, res) => {
  const { post_id } = req.query
  console.log("id",post_id);

req.session.readTransaction( async tx => {
  const result = await tx.run(`MATCH (u:User)-[:UCOMMENT]->(cmt:COMMENT)-[:PCOMMENT]->(p:POST) WHERE id(p) =${post_id}  RETURN u , cmt ,id(p),id(cmt) `);
  const nodes = result.records.map(record => {
            return { 
             u: record.get('u')?.properties,
             cmt: record.get('cmt')?.properties,
             idp: record.get(`id(p)`).low,
             idcmt: record.get(`id(cmt)`).low
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


exports.addComment = async (req, res) => {
  const { post_id , id , content} = req.query
  console.log("idcmt",post_id);
   req.session
   .run(`
    MATCH (u:User),(p:POST)
    WHERE id(u) = ${id} AND id(p)=${post_id}
    CREATE (cmt:COMMENT{content:'${content}',post_id:${post_id},user_id:${id}})
    CREATE (u)-[r1:UCOMMENT]->(cmt)
    CREATE (cmt)-[r2:PCOMMENT]->(p)
    RETURN cmt
   `)
   .then(data => {
     const nodes = data.records.map(record => record.get('cmt').properties);
    console.log(`
    MATCH (u:User),(p:POST)
    WHERE id(u) = ${id} AND id(p)=${post_id}
    CREATE (cmt:COMMENT{content:'${content}',post_id:${post_id},user_id:${id}})
    CREATE (u)-[r1:UCOMMENT]->(cmt)
    CREATE (cmt)-[r2:PCOMMENT]->(p)
    RETURN cmt
   `);
     res.json({
       data: nodes
     })
   })
   .catch(error => console.error(error))

 }
