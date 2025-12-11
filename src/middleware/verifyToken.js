import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "";

export const verifyToken = (req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        req.user = { id: "dev-user" };
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ error: "Acceso no autorizado" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Acceso no autorizado" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token no válido o expirado" });
        }

        req.user = decoded;
        next();
    });
};
