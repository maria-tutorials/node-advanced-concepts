const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const user_id = req.user.id;

    const redis = require('redis');
    const url = 'redis://127.0.0.1:6379';
    const client = redis.createClient(url);

    const util = require('util');
    client.get = util.promisify(client.get);

    const cached_blogs =  await client.get(user_id);
    if (cached_blogs) {
      const parsed_blogs = JSON.parse(cached_blogs);
      res.send(parsed_blogs);
      return;
    }

    const blogs = await Blog.find({ _user: user_id });
    client.set(user_id, JSON.stringify(blogs));

    res.send(blogs);
    return;
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
