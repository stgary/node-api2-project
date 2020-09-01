const express = require('express');
const db = require('../data/db.js');

const router = express.Router();

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if(title === undefined || contents === undefined) {
        res.status(400).json({
            message: 'Please provide title and contents for the post.'
        });
    }

    db.insert(req.body)
        .then(abRes => res.status(201).json(req.body))
        .catch(error => {
            res.status(500).json({
                error: 'There was an error while saving to the database.'
            });
        });
});

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    db.findById(id)
        .then(dbRes => {
            if(dbRes.length === 0) {
                res.status(404).json({
                  message: 'The post with the specified ID does not exist'
                });
                return;
            if(text === undefined) {
                res.status(400).json({
                    message: 'Please provide text for the comment'
                });
                return;
            }
        }

        let newBody = req.body;
        newBody.post_id = req.params.id;  
        db.insertComment(newBody)
            .then(dbRes => {
                res.status(201).json(req.body)
            })
            .catch(error => res.status(500).json({
                message: 'There was an error while saving to the database.'
            }))
        })
        .catch(error => res.status(500).json({
            message: 'There was an error while saving to the database.'
        }));
});

router.get('/', (req, res) => {
    db.find()
        .then(dbRes => res.send(dbRes))
        .catch(error => {
            res.status(500).json({
                message: 'The posts info could not be retrieved'
            });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(dbRes => {
            if(dbRes.length === 0){
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                })
                return;
            }
            res.send(dbRes);
        })
        .catch(error => {
            res.status(500).json({
                error: 'The post info could not be retrieved.'
            });
        });
});

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(dbRes => {
            if(dbRes.length === 0) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                })
                return;
            }

            db.findPostComments(id)
                .then(dbRes => res.send(dbRes))
                .catch(error => {
                    res.status(500).json({
                        error: 'The comments info could not be retrieved.'
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                error: 'The posts info could not be retrieved.'
            })
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if(post.length === 0) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                });
                return;
            }
            db.remove(id)
                .then(dbRes => res.send(post))
                .catch(error => {
                    res.status(500).json({
                        error: 'The post could not be removed'
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                error: 'The post could not be removed'
            });
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    db.findById(id)
        .then(post => {
            if(post.length === 0) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                });
                return;
            }

            if(title === undefined || contents === undefined) {
                res.status(400).json({
                    message: 'Please provide the title and contents for the post'
                });
                return;
            }

            db.update(id, req.body)
                .then(dbRes => res.status(200).json(req.body))
                .catch(error => {
                    res.status(500).json({
                        error: 'The post info could not be modified.'
                    });
                })
        })
        .catch(error => {
            res.status(500).json({
                error: 'The post info could not be modified'
            });
        });
});

module.exports = router;