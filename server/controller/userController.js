import UserModel from "../model/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existEmail = await UserModel.findOne({ email }); // ✅ 1st

        if (existEmail === null) // ✅ 2nd - if no email found...
            return res.status(401).json({ error: 'Email not exist❗' });
            
        // ✅ 3rd - match encrypted password with user given password
        const isValidPass = await bcrypt.compare(password, existEmail.password);

        if (isValidPass) {

            // ✅ 4th - prepare the user object to generate token
            const userObj = { id: existEmail._id, name: existEmail.name, role: existEmail.role };

            // ✅ 5th - generate token 
            const token = jwt.sign(userObj, process.env.JWT_KEY, { expiresIn: '1D' });

            // ✅ 6th - set token into header for authorization at client side.
            // res.header('Authorization', 'Bearer ' + token);

            // ✅ 7th - Must send token into user side by this JSON
            res.json({ token, message: 'Login Successful' });

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
        // ✅ 1st
        const existEmail = await UserModel.find({ email });
        // ✅ 2nd
        if (existEmail.length > 0)
            return res.status(401).json({ error: 'Email already exist❗' });
        // ✅ 3rd
        const hashPass = await bcrypt.hash(password, 10);
        // ✅ 4th
        const userObject = { name, email, password: hashPass }
        // ✅ 5th
        await UserModel(userObject).save();
        // ✅ 6th
        res.json({ message: "Account Create Successful ✅" });

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