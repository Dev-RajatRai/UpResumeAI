const sendPhoneOtp = async (phone: string | undefined): Promise<string> => {
  if (!phone) return "";

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Simulate SMS sending (replace with real Twilio or SMS API)
  console.log(`📲 OTP sent to ${phone}: ${otp}`);

  return otp;
};

export default sendPhoneOtp;
