require('dotenv').config();
const User= require('../models/user');
const bcryptjs= require('bcryptjs');
const jwt= require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const passport = require('passport');
const JWT_KEY='simplejwtkey'



const register= async (req,res,next)=>{
    const {name, email, password}= req.body;
    if(!(name || email || password)){
        return res.json({error:"All fields are required"});
    } 
    // email already registered
    const user= await User.findOne({email: email});
    if(user){
        return res.json({error: "Email already registered"});
    }
    // password length
    if(password.length < 8){
        return res.json({error:"Password must be at least 8 characters'"});
    }
    else{
        const oauth2Client = new OAuth2(
            "1037139181001-tv7tbj8tsghci2ed1645fvpadf6isa7s.apps.googleusercontent.com", // ClientID
            "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", // Client Secret
            "https://developers.google.com/oauthplayground" // Redirect URL
        );

        oauth2Client.setCredentials({
            refresh_token: "1//044XBQS66x_-2CgYIARAAGAQSNwF-L9IrLllUblmfuTnKgTjObAC4lzT3W18EIWgSu2pFE4fXj8Nyb4zuej1h2L4QDCtXrobPcTA"
        });
        const accessToken = oauth2Client.getAccessToken()

        const token = jwt.sign({ name, email, password }, JWT_KEY, { expiresIn: '30m' });
        const CLIENT_URL = 'http://' + req.headers.host;

        const output = `
        <h2>Please click on below link to activate your account</h2>
        <p>${CLIENT_URL}/api/activate/${token}</p>
        <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
        `;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: "jakeriley082@gmail.com",
                clientId: "1037139181001-tv7tbj8tsghci2ed1645fvpadf6isa7s.apps.googleusercontent.com",
                clientSecret: "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",
                refreshToken: "1//044XBQS66x_-2CgYIARAAGAQSNwF-L9IrLllUblmfuTnKgTjObAC4lzT3W18EIWgSu2pFE4fXj8Nyb4zuej1h2L4QDCtXrobPcTA",
                accessToken: accessToken
            },
        });

        // send mail with defined transport object
        const mailOptions = {
            from: '"Auth Admin" <jakeriley082@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Account Verification: NodeJS Auth ✔", // Subject line
            generateTextFromHTML: true,
            html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.json({error:"something went wrong"})
            }
            else {
                console.log('Mail sent : %s', info.response);
                  return  res.json({success: "successfully register"})
            }
        })


    }
}


const activateHandle= async (req,res)=>{
    try{
        const token= req.params.token;
                if(token){
                    
             const jwtToken=jwt.verify(token,JWT_KEY, (err, decodedToken) => {
                if(err){
                     
                     return res.json({error: "Token not valid"});
                }
                return decodedToken;
                });
                
                const user= await User.findOne({email:jwtToken.email});
                if(user){
                   return res.json({error: "User already registered by this email"})
                } //end if user
               
                    const newUser=  new User({
                        name:jwtToken.name,
                         email: jwtToken.email,
                         password: bcryptjs.hashSync(jwtToken.password,10)
                    });
                    await newUser.save();
                    return res.json({success: "Successfully registered"})
                 
            }//end if token
            else{
                return res.json({error:" Something went wrong"})
            }
                
    }

    catch(err){
                
        console.log(err);
        }
}


const login= async (req, res) => {
        const {email, password} = req.body;
        if(!(email || password)){
            return res.json({error: "Input field required"});
        }
        // check user exit
        const exitUser= await User.findOne({email: email});
        if(!exitUser){
            return res.json({error: "Email is not registered"});
        }
        // check password
        await bcryptjs.compare(password, exitUser.password)
        .then(match=>{
            if(!match){
                return res.json({error: "Password does not match"});
            }
            const token=  jwt.sign({email: exitUser.email, id: exitUser._id},'jwtsecret', {expiresIn: '4d'});
            return res.json({success:"Login Successfully", token: token, email: exitUser.email});
        })
}


const sendotp= async (req, res) => {
        if(! req.body.email){
            return res.json({error: "All fields are required"});
        }
        await User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.json({error:"User does not exit"})
            }
            return res.json({success: "Send link successfully check your email inbox"})
        })
        
}
module.exports = {
        register,
        login,
        sendotp,
        activateHandle
}