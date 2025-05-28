const nodemailer = require('nodemailer');
const config = require('./config.json');
const User = require('./models/user');

const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: config.email.auth,
});

module.exports.sendPasswordReminder = async (email) => {
    const user = await User.findByEmail(email);
    if (!user) return false;

    await transporter.sendMail({
        from: config.email.auth.user,
        to: email,
        subject: 'S.W.O.R.D. Password Reminder',
        text: `Your password is: ${user.password}`,
    });

    return true;
};
