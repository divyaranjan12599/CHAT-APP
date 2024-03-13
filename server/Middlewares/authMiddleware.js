import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { AuthorizationError } from "../CustomErrors/CustomErrors.js";

const protect = expressAsyncHandler(
    async (req, res, next) => {
        let token;
        console.log("protect", req.headers);
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select("-password");
                next();
            } catch (error) {
                res.status(401);
                throw new AuthorizationError("Not authorized token failed!!!");
            }
        }

        if (!token) {
            res.status(401);
            throw new AuthorizationError("Not authorized, no token");
        }
    }
);

export default protect;