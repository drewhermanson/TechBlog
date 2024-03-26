const router = require('express').Router();
const { User } = require('../models');
const { Blog } = require('../models');
const { Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        { 
          model: Comment,
          attributes: ['content', 'date_created', `user_id`],
        }
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {

    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/check`, async (req, res) => { 
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.json(comments);


  }

  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
