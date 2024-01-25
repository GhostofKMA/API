const express = require('express')
const app = express()
const task = require('./model');
const port = 3000
const db=require('./db')
//connect to db
db.connect()

app.get('/todos', (req, res) => {
    res.send('todos');
});
//add 
app.post('/add', (req, res) => {
    const task = new Task({
      title: req.body.title,
      description: req.body.description
    });
  
    task.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(task);
      }
    });
  });
//delete 
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    task.findByIdAndRemove(id, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ message: 'Đã xóa task' });
      }
    });
  });
//update
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const task = new Task({
      title: req.body.title,
      description: req.body.description
    });
  
    task.findByIdAndUpdate(id, task, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(task);
      }
    });
  }); 
//done
app.patch('/done/:id', (req, res) => {
    const id = req.params.id;
  
    task.findByIdAndUpdate(id, { status: 'done' }, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ message: 'Đã cập nhập' });
      }
    });
  });
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})