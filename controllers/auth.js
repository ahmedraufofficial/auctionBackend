const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/Users');
const nodemailer = require('nodemailer');
const math = require("mathjs")
const { userNotification } = require('./notifications.js')
const { signupEmail, activateEmail, otpEmail, activateAuctionEmail } = require('./emailbody.js');

/* const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'llc.carology@gmail.com',
      pass: 'qgxenzpjdnnowipw'
    }
}); */

const transporter = nodemailer.createTransport({
    host: process.env.EMAILSERVER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS,
    },
  });


const signup = async (req, res, next) => {
    const username = await UserModel.findOne({username: req.body.username.toLowerCase()})
    if (username) {
        return res.status(409).json({message: "username already exists"}); 
    }
    UserModel.findOne({email: req.body.email.toLowerCase()})
    .then(user => {
        if (user) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email.toLowerCase() && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    const User = new UserModel({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        number: req.body.number,
                        password: passwordHash,
                        status: 'Inactive'
                    })
                    return User.save()
                    .then(() => {
                        var mailOptions = {
                            from: process.env.EMAIL,
                            to: req.body.email,
                            subject: 'Welcome to Carology - Await confirmation of your account',
                            html: signupEmail(req.body.username)
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
    UserModel.findOne({email: req.body.email.toLowerCase()}).then(user => {
        if (!user) {
            return res.status(404).json({message: "user not found"});
        } else {
            bcrypt.compare(req.body.password, user.password, (err, compareRes) => {
                if (err) {
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { 
                    //assignDeviceId(req.body.email, req.body.deviceId);
                    UserModel.findOneAndUpdate({ email: req.body.email.toLowerCase() }, {Device_Id: req.body.deviceId}, {new: true}).then((user => {
                        if (user) {
                            console.log("Device Id = "+req.body.deviceId)
                        }
                    }))
                    userNotification("Signed In", "Notification Test", req.body.deviceId)
                    const token = jwt.sign({ email: req.body.email.toLowerCase() }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token, data: {
                        username: user.username,
                        email: user.email.toLowerCase(),
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
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Carology - OTP',
            html: otpEmail(account.username, otp) 
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
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: update.email,
                    subject: 'Confirm your account',
                    html: activateEmail(update.username)
                  };
            
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
                return res.send({status: "200"})
            }
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const deactivate = (req, res, next) => {
    UserModel.findOne({_id: req.body.id})
    .then(async user => {
        if (!user) {
            return res.status(404).json({message: "user not found"});
        } else {
            const update = await UserModel.findOneAndUpdate({_id: req.body.id}, {status: "Inactive"}, {new: true})
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
 

const activateAuctions = (req, res, next) => {
    UserModel.findOne({_id: req.body.id})
    .then(async user => {
        if (!user) {
            return res.status(404).json({message: "user not found"});
        } else {
            const update = await UserModel.findOneAndUpdate({_id: req.body.id}, {auction: "active"}, {new: true})

            if (update) {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: update.email,
                    subject: 'Get Ready to Bid: Your Auction Access is Now Granted!',
                    html: activateAuctionEmail(update.username)
                  };
            
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
                return res.send({status: "200"})
            }
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const auctionUser = async (req, res, next) => {
    UserModel.findOne({username: req.params.username})
    .then(async user => {
        if (!user) {
            return res.status(404).json({message: "user not found"});
        } else {
            return res.send({auction: user.auction})
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const auctionUserReq = async (req, res, next) => {
    try {
        await UserModel.findOneAndUpdate({username: req.body.username}, {auction: "pending"}, {new: true})
        return res.send({status: "200", response: "Successfull"})
    } catch(err) {
        return res.send({status: "500", error: err})
    };
};

const auctionUserReqActivate = async (req, res, next) => {
    try {
        await UserModel.findOneAndUpdate({username: req.body.username}, {auction: "active"}, {new: true})
        return res.send({status: "200", response: "Successfull"})
    } catch(err) {
        return res.send({status: "500", error: err})
    };
};

const auctionUserReqDeactivate = async (req, res, next) => {
    try {
        await UserModel.findOneAndUpdate({username: req.body.username}, {auction: "inactive"}, {new: true})
        return res.send({status: "200", response: "Successfull"})
    } catch(err) {
        return res.send({status: "500", error: err})
    };
};

module.exports = { signup, login, isAuth, contact, accounts, activate, generateOtp, resetPassword, deleteAccount, deactivate, activateAuctions, auctionUser, auctionUserReq, auctionUserReqActivate, auctionUserReqDeactivate };