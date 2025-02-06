import jwt from 'jsonwebtoken';
import UserModel from '../models/auth.js';

const verificationToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized, Please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded); // Debugging

    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      console.log("User Not Found in Database for ID:", decoded.id);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach userId to request
    req.userId = user._id.toString(); // Fix: Ensure userId is passed correctly

    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export { verificationToken };
