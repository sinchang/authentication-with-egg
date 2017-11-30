const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

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

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.sendEmail = (from, to, subject, html) => {
  return new Promise((resolve, reject) => {
    transport.sendMail({
      from,
      subject,
      to,
      html
    }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
}
