
export const getData = async (req, res) => {

    try {
        res.json({ data: "data ok" })
    } catch (error) {
        console.log(error);
        res.status(501).json({ data: "data missing" })
    }
}