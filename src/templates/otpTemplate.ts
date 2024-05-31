export const generateOtpTemplate = (otp: number) => `
<div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #ff6600;">
<div style="text-align: center; margin-bottom: 20px;">
  <img src="https://chitabay.com/logo.png" alt="Logo" style="max-width: 150px;">
  <p style="font-size: 18px; color: black; text-transform: uppercase;">CHITABAY</p>
</div>
<h2 style="background-color: #f2f2f2; padding: 10px; text-align: center; color: #333;">
  OTP Verification
</h2>
<p style="font-size: 16px; color: #333;">Hello,</p>
<p style="font-size: 16px; color: #333;">Thank you for signing up. Your OTP code is:</p>
<h1 style="text-align: center; background-color: #fff; color: white; padding: 10px; border-radius: 5px;">
  ${otp}
</h1>
<p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code is valid for 10 minutes.</p>
<p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
<p style="font-size: 16px; color: #333;">Best regards,</p>
<p style="font-size: 16px; color: #333;">Chitabay</p>
</div>

`;
