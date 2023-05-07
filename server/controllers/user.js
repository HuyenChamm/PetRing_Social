exports.getAllUser = (req, res) => {
  req.session
  .run('MATCH (n:User)  RETURN n,id(n)')
  .then(data => {
    const nodes = data.records.map(record => {
      return { 
        n: record.get('n').properties, 
        id: record.get(`id(n)`).low
    };
    });
       
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
 
}


exports.getUser = (req, res) => {
  const {id} = req.params;
  console.log(id);
  req.session
  .run(`MATCH (n:User) WHERE id(n) = ${id} RETURN n,id(n)`)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        n: record.get('n').properties, 
        id: record.get(`id(n)`).low
    };
    } 
    );
       
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
 
}


exports.addUser = (req, res) => {
  res.send("user: id");
}

exports.updateUser = (req, res) => {
  res.send("UPDATE");
}

exports.deleteUser = (req, res) => {
  res.send("DELETE");
}

