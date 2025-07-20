import mongoose from "mongoose";
import { updateCart } from "../controllers/cartController.js";
import authUser from "../middleware/authUser.js";


const cartRouter = mongoose.Router();

cartRouter.post('/update', authUser, updateCart)

export default cartRouter