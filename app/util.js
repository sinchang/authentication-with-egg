const bcrypt = require('bcryptjs');

exports.hashPassword = async(password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error)
    throw new Error('Hashing failed', error);
  }
};

exports.comparePasswords = async(inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error('Comparing failed', error);
  }
};
