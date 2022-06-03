import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {

    try { // token checking middleware... 
        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];

        if (token) {
            const decode = jwt.verify(token, process.env.JWT_KEY);
            const { id, name, role } = decode;
            // these filed's come from token, that set at Login time

            console.log(id, name, role);

            req.userId = id;
            req.userName = name;
            req.userRole = role;
            // use this info at next controller, if we need... 

            next();
            // go to next middleware ==> in route, for data access
        } else {
            next('Token Missing❗');
        }
    } catch (error) {
        // console.table({ errorInfo: error.message });
        next('Authorization Failed...❗');
    }
}

export default userAuth;