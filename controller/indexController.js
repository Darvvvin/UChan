const Post = require('../model/post.js');

const IndexController = {

    getIndex: (req, res) => {

        Post.find({type: 'THREAD'})
            .sort({bump: 'desc'})
            .lean()
            .exec((err, threads) => {
                res.render('index', {
                    title: 'UChan',
                    threads: threads
                });
        });
    }
}

module.exports = IndexController;