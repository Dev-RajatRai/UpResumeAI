import crypto from "crypto";

const sendEmailVerification = async (email: string): Promise<string> => {
  const token = crypto.randomBytes(20).toString("hex");

  // Simulate email sending (can be replaced with real nodemailer/SendGrid logic)
  console.log(`🔐 Verification email sent to ${email} with token: ${token}`);

  return token;
};

export default sendEmailVerification;
