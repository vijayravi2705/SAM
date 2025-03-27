const Login = require('../models/Login');

const loginUser = (req, res) => {
  const { login_id, password, role } = req.body;

  if (!login_id || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  Login.verifyCredentials(login_id, password, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result[0];

    if (user.role !== role) {
      return res.status(403).json({ error: `Unauthorized access for ${role}` });
    }

    res.status(200).json({
      login_id: user.login_id,
      role: user.role,
      message: `Login successful as ${user.role}`
    });
  });
};

module.exports = { loginUser };
