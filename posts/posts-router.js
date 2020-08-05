const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router();

router.get("/", (req, res) => {
    Posts.find()
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({
                message: "Error getting posts",
            });
        });
});

router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({
                message: "Error getting post",
            });
        });
});

router.get("/:id/comments", (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(comments => {
            res.status(201).json(comments);
        })
        .catch(error => {
            res.status(500).json({
                message: "Error getting comments",
            });
        });
});

router.post("/", (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({
                message: "Error inserting the post",
            });
        });
});

router.post("/:id/comments", (req, res) => {
    Posts.insertComment(req.body)
        .then(comment => {
            res.status(201).json(comment);
        })
        .catch(error => {
            res.status(500).json({
                message: "Error inserting comment"
            });
        });
});

router.delete("/:id", (req, res) => {
    Posts.remove(req.params.id)
        .then(post => {
            res.status(200).json({
                message: "This post has been deleted"
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error deleting post"
            });
        });
});

module.exports = router;