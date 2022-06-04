import UserModel from "../model/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existEmail = await UserModel.findOne({ email });

        if (existEmail === null) // if no email found...
            return res.status(401).json({ error: 'Email not exist❗' });

        const isValidPass = await bcrypt.compare(password, existEmail.password);

        if (!isValidPass) {

            // prepare the user object to generate token
            const userObj = { id: existEmail._id, name: existEmail.name, role: existEmail.role };

            // generate token
            const token = jwt.sign(userObj, process.env.JWT_KEY,
                { expiresIn: '1D' });

            // set token into header for authorization at client side.
            res.header('Authorization', 'Bearer ' + token);
            
            res.json({ token, message: 'Login Successful✅' });

        } else {
            res.status(501).json({ error: "User Authorization Error❗" })
        }
    } catch (error) {
        res.status(501).json({ error: "Authorization Error❗" })
    }
}


export const userRegistration = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const existEmail = await UserModel.find({ email });

        if (existEmail.length > 0)
            return res.status(401).json({ error: 'Email already exist❗' });

        const hashPass = await bcrypt.hash(password, 10);

        const userObject = { name, email, password: hashPass }

        const result = await UserModel(userObject).save();

        res.json({ result, message: "Account Create Successful ✅" });

    } catch (error) {
        res.status(501).json({ error: "Account Creating Error❗" })
    }
}



// res.setHeader('Authorization', 'Bearer '+ token); 

// set cookie
// res.cookie('Learning', token,
//     {
//         maxAge: 846000,
//         httpOnly: true,
//         signed: true
//     });

// can redirect user
// res.redirect("index");