import { CustomError } from "./CustomErrors.js";


export default function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        res.status(400).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
}