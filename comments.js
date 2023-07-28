// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Add body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Add CORS
const cors = require('cors');
app.use(cors());

// Add mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    date: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Add route
app.post('/api/comments', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment,
        date: new Date()
    });

    try {
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/comments', async (req, res) => {
    try {
        let comments = await Comment.find();
        res.send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/comments/:id', async (req, res) => {
    try {
        await Comment.deleteOne({_id: req.params.id});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/comments/:id', async (req, res) => {
    try {
        let comment = await Comment.findOne({_id: req.params.id});
        comment.name = req.body.name;
        comment.comment = req.body.comment;
        await comment.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));