import UserModel from "../model/UserModel.js";


export const getUserInfo = async (req, res) => {

    try {
        const result = await UserModel.findById({ _id: req.userId })
            .select({
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                // password: 0,
            });

        res.json({ result });

    } catch (error) {
        res.status(501).json({ error: "Server Side Get Error" })
    }
}




export const userInfoUpdate = async (req, res) => {

    try {
        const result = await UserModel.findByIdAndUpdate(req.userId, req.body, { new: true })
            .select({
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                password: 0,
            });

        res.json({ result });

    } catch (error) {
        res.status(501).json({ error: "Server Side Update Error" })
    }
}




export const userInfoDelete = async (req, res) => {

    try {
        await UserModel.findByIdAndDelete(req.userId)
        res.json({ result: "User's Profile Deleted Successful" })

    } catch (error) {
        res.status(501).json({ error: "Server Side Delete Error" })
    }
}