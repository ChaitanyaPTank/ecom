const { string } = require("joi");
const User = require("../model/user");
const { _dump, generateAccessToken } = require("./tokens");

exports.userSignup = async (req, res, next) => {

    validatorDebugger("checking for user in db");

    await User.sync();
    // validate if user exists
    const userExist = await User.findAll({
        where: {
            user: req.body.name
        }
    });

    if (userExist) return res.status(400).send("User already exists");

    const user = await User.create({
        user: req.body.name
    });

    return res.status(200).send(user);
};

exports.userLogin = async (req, res, next) => {

    try {
        // fetching user
        const user = await User.findAll({
            where:
            {
                user: req.body.name
            }
        });

        // checking if there is user
        if (!user) return res.status(401).send("User not found, please signup first...");

        const token = generateAccessToken(req.body.name);
        console.log(token);

        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }

}