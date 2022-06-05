import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {

    try { // token checking middleware... 

        const token = req.headers.authorization.split(' ')[1]; // ✅ 1st

        if (token) { 
            const decode = jwt.verify(token, process.env.JWT_KEY); // ✅ 2nd
            const { id, name, role } = decode;
            // these filed's come from token, that set at Login time

            // use this info at next controller, if we need...  // ✅ 3rd
            req.userId = id;
            req.userName = name;
            req.userRole = role;

            next(); // ✅ 4th
            // go to next middleware ==> in route, for data access
        } else {
            next('Token Missing❗');
        }
    } catch (error) {
        next('Authorization Failed...❗');
    }
}

export default userAuth;