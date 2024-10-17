import express from 'express';
const router = express.Router();

let users = [
  { id: 1, name: 'Sonali D', email: 'SD@example.com' },
  { id: 2, name: 'Bill xyz', email: 'bxyz@example.com' },
  { id: 3, name: 'Sonali P', email: 'SP@example.com' },
];

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by ID 
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});


// router.get('/', (req, res) => {
//     res.render('userForm', { title: 'User List', users: ['John', 'Jane', 'Doe'] });
// });

// POST - Creating a new user
router.post('/', (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name, email: req.body.email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Updating user data
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
});

// DELETE user by ID
router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: 'User deleted' });
});

export default router;
