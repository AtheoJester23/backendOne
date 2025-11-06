import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name == "TokenExpiredError") {
        return res.status(401).json({ message: "Token Expired" });
      }
      return res.status(403).json({ message: "Invalid Token" });
    }

    req.user = decoded;
    next();
  });
};
