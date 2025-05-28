const model = require('./model');
const userModel = require('./models/user');

exports.handleMain = async (req, res) => {
    const login = req.cookies.user;
    if (!login) {
        res.writeHead(302, { Location: '/login' });
        res.end();
        return;
    }

    const user = await userModel.findByLogin(login);
    if (!user) {
        res.writeHead(302, { Location: '/login' });
        res.end();
        return;
    }

    model.renderView('main', res);
};
