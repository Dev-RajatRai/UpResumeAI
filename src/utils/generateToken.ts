import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d", 
  });
};

export default generateToken;
