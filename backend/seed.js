const User = require('./models/User');
const bcrypt = require('bcryptjs');

const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'analyst', password: 'analyst123', role: 'analyst' },
  { username: 'user', password: 'user123', role: 'user' },
  { username: 'guest', password: 'guest123', role: 'guest' }
];

const seedDB = async () => {
  try {
    const existingCount = await User.countDocuments();
    if (existingCount === 0) {
      for (const u of users) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(u.password, salt);
        await User.create({
          username: u.username,
          password: hashedPassword,
          role: u.role
        });
      }
      console.log('Demo accounts seeded successfully.');
    }
  } catch (err) {
    console.error('Error seeding DB:', err);
  }
};

module.exports = seedDB;
