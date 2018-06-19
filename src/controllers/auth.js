const models = app.getModels();

exports.auth =  (req, res) => {
    //find the user
    models.User.findOne({email: req.body.email},(err, user) => {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });

            } else {
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: app.generateTokens(user),
                    user: user
                });
            }
        }
    });
};