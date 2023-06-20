const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/Users');
const nodemailer = require('nodemailer');
const math = require("mathjs")
const { userNotification } = require('./notifications.js')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'llc.carology@gmail.com',
      pass: 'qgxenzpjdnnowipw'
    }
});

const signup = (req, res, next) => {
    UserModel.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    const User = new UserModel({
                        email: req.body.email,
                        username: req.body.username,
                        number: req.body.number,
                        password: passwordHash,
                        status: 'Inactive'
                    })
                    return User.save()
                    .then(() => {
                        var mailOptions = {
                            from: 'llc.carology@gmail.com',
                            to: req.body.email,
                            subject: 'Confirm your account',
                            text: 'Thank you for signing up. Click on this link to use basic features of the app while we approve your request to advanced user.'
                          };
                    
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                        });
                        res.status(200).json({message: "Account created. Kindly wait for it to be activated! Thanks."});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });                
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const assignDeviceId = async(email, deviceId) => {
    await UserModel.findOneAndUpdate({ email: email }, {Device_Id: deviceId}, {new: true})
}

const login = (req, res, next) => {
    UserModel.findOne({email: req.body.email}).then(user => {
        if (!user) {
            return res.status(404).json({message: "user not found"});
        } else {
            bcrypt.compare(req.body.password, user.password, (err, compareRes) => {
                if (err) {
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { 
                    //assignDeviceId(req.body.email, req.body.deviceId);
                    UserModel.findOneAndUpdate({ email: req.body.email}, {Device_Id: req.body.deviceId}, {new: true}).then((user => {
                        if (user) {
                            console.log("Device Id = "+req.body.deviceId)
                        }
                    }))
                    userNotification("Signed In", "Notification Test", req.body.deviceId)
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token, data: {
                        username: user.username,
                        email: user.email,
                        token: token,
                        status: user.status
                    }});
                } else {
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    }).catch(err => {
        console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'here is your resource' });
    };
};

const contact = async (req, res, next) => {
    UserModel.findOne({username: req.params.username})
    .then(async user => {
        if (!user) {
            return res.status(404).json({message: "user not found"});
        } else {
            return res.send({email: user.email, number: user.number})
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const accounts = async (req, res, next) => {
    try {
        const accounts = await UserModel.find()
        return res.json({data: accounts})
    } catch (err) {
        console.log(err)
        res.json({ status: "error", error: "Invalid Token"})
    }
};

const generateOtp = async (req, res, next) => {
    try {
        const otp = (math.floor(math.random()*90000) + 10000).toString();
        const account = await UserModel.findOneAndUpdate({email: req.body.email}, {otp: otp}, {new: true})
        var mailOptions = {
            from: 'llc.carology@gmail.com',
            to: req.body.email,
            subject: 'Carology - OTP',
            text: `Kindly use this OTP --- ${otp} --- to set new password` 
        };
        if (account) {
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
            return res.json({status: '200'})
        }
        return res.json({ status: "error", error: "Email does not exist!"})
    } catch (err) {
        console.log(err)
        res.json({ status: "error", error: "Invalid Token"})
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const account = await UserModel.findOne({email: req.body.email})
        if (account) {
            if (account.otp === req.body.otp) {
                bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                    if (err) {
                        return res.status(500).json({message: "couldnt hash the password"}); 
                    } else if (passwordHash) {
                        UserModel.findOneAndUpdate({id: account._id}, {otp: "", password: passwordHash}, {new: true}).then(()=>{
                            res.json({status: '200'});
                        }).catch(err => {
                            console.log(err)
                        });      
                    }})
            } else {
                return res.json({ status: "error", error: "OTP does not exist!"})
            }
            return res.json({status: '200'})
        }
        return res.json({ status: "error", error: "Email does not exist!"})
    } catch (err) {
        console.log(err)
        res.json({ status: "error", error: "Invalid Token"})
    }
};

const activate = (req, res, next) => {
    UserModel.findOne({_id: req.body.id})
    .then(async user => {
        if (!user) {
            return res.status(404).json({message: "user not found"});
        } else {
            const update = await UserModel.findOneAndUpdate({_id: req.body.id}, {status: "Active"}, {new: true})
            if (update) {
                return res.send({status: "200"})
            }
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const deleteAccount = async (req, res, next) => {
    try {
        await UserModel.deleteOne({email: req.params.email})
        return res.send({status: "200", response: "Deleted"})
    } catch(err) {
        return res.send({status: "500", error: err})
    };
};
 
module.exports = { signup, login, isAuth, contact, accounts, activate, generateOtp, resetPassword, deleteAccount };