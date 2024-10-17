import express from 'express';
const router = express.Router();


let posts = [
  { id: 1, title: 'Sample Post-1', content: 'Sample Post-1 for Express', author: 1 },
  { id: 2, title: 'Sample Post-2', content: 'Sample Post-2 for Express', author: 2 },
  { id: 2, title: 'Sample Post-3', content: 'Sample Post-3 for Express', author: 2 },
];

// GET all posts 
router.get('/', (req, res) => {
  const { author } = req.query;
  const filteredPosts = author ? posts.filter(post => post.author == author) : posts;
  res.json(filteredPosts);
});

// GET post by ID
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// POST - Creating a new post
router.post('/', (req, res) => {
  const newPost = { id: posts.length + 1, title: req.body.title, content: req.body.content, author: req.body.author };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT - Updating post data
router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  res.json(post);
});

// DELETE post by ID
router.delete('/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.json({ message: 'Post deleted' });
});

export default router; 
