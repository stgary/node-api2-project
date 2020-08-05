const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send('Hello');
});

server.use('/api/posts', postsRouter);

server.listen(4000, () => {
    console.log("\n*** Server Running on http://localhost:4000 ***\n");
});