exports.getAllLike = (req, res) => {
  const { post_id } = req.query
  req.session
    .run(`MATCH (u:User)-[r:LIKE]->(p:POST) WHERE id(p) =${post_id} RETURN count(r) AS count`)
    .then(data => {
      const nodes = data.records.map(record => {

        return {
          count: record.get('count').toNumber(),
         
        };

      }
      );
      res.json({
        data: nodes
      })
    })
    .catch(error => console.error(error))

}

