const express = require('express');
const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ Node: 'API Project 2' })
});

const PORT = process.env.PORT || 8008;
server.listen(PORT, () => console.log(`***Server running on port ${PORT}***`))