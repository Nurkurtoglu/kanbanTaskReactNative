import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token bulunamadı." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token doğrulama hatası:", err);
        return res.status(403).json({ message: "Geçersiz veya süresi dolmuş token." });
    }
}
