module.exports = function(app, client) {
  var db = client.db('test')
  app.get('/studentss/nophone', (req, res) => {
    db.collection('studentss').find({phone_num:""}).toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.get('/studentss/', (req, res) => {
    db.collection('studentss').find().toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.post('/studentss', (req, res) => {
    const student = { name : req.body.name, adress: req.body.adress, phone_num: req.body.phone_num, hobby: req.body.hobby };
    db.collection('studentss').insert(student, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.delete('/studentss/', (req, res) => {
    const delName = req.body.delName;
    db.collection('studentss').remove({name:delName}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Student ' + delName + ' deleted!');
      } 
    });
  });
  app.put ('/studentss/', (req, res) => {                                
    const oldName = {name : req.body.oldName};
    const newName = {$set: {name : req.body.newName}};
    db.collection('studentss').updateOne(oldName, newName, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(result);
      } 
    });
  });
};