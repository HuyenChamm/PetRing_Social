// exports.getPet = (req, res) => {
//   const {id} = req.params;
//   console.log(id);
//   req.session
//   .run(`MATCH (u:User)-[:OWNER]->(pet:Pet) WHERE u.id = "${id}" RETURN pet`)
//   .then(data => {
//     const nodes = data.records.map(record => record.get('pet').properties);
//     console.log(`MATCH (u:User)-[:OWNER]->(pet:Pet) WHERE u.id = " ${id}" RETURN pet`);
//     res.json({
//       data: nodes
//     })
//   })
//   .catch(error => console.error(error))
 
// }

exports.getPet = async (req, res) => {
  const {id} = req.params;

req.session.readTransaction( async tx => {
  const result = await tx.run(`MATCH (u:User)-[:OWNER]->(pet:Pet) WHERE id(u) = ${id} RETURN pet,id(u),id(pet)`);
  const nodes = result.records.map(record => {
    return { 
      pet: record.get('pet').properties,
      idu: record.get(`id(u)`).low,
      idpet: record.get(`id(pet)`).low
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