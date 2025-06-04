require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");
const authMiddleware = require("../middleware/authMiddleware");

const userRouter = express.Router();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.ADMIN_PASS,
  },
});

userRouter.get("/send-test-mail", async (req, res) => {
  const recipientEmail = "ranvishwakarma122@gmail.com";

  //   if (
  //     !recipientEmail ||
  //     !process.env.GMAIL_USER ||
  //     !process.env.GMAIL_APP_PASSWORD
  //   ) {
  //     return res.status(500).json({
  //       success: false,
  //       message:
  //         "Email credentials or recipient email are not set in environment variables.",
  //     });
  //   }

  const mailOptions = {
    from: `"<span class="math-inline">\{process\.env\.GMAIL\_USER\_NAME \|\| 'Nodemailer Test'\}" <</span>{process.env.GMAIL_USER}>`, // Sender address
    to: recipientEmail, // List of recipients
    subject: "Nodemailer Test Email ✔", // Subject line
    text: "Boss this is your backend server reporting, your email automation server test is working perfectly.", // Plain text body
    html: `<b>Boss this is your backend server reporting, your email automation server test is working perfectly. ThanK You Boss</b>
               <p>Sent at: ${new Date().toLocaleString()}</p>
               <p>If you received this, your Server is working!</p>`, // HTML body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info)); // Only works if you use ethereal.email for testing

    res.status(200).json({
      success: true,
      message: "Test email sent successfully!",
      messageId: info.messageId,
      previewUrl: nodeMailer.getTestMessageUrl(info), // For ethereal.email testing
    });
  } catch (error) {
    // console.error("Error sending email:", error);
    console.log(process.env.ADMIN_MAIL, process.env.ADMIN_PASS);
    res.status(500).json({
      success: false,
      message: "Failed to send test email.",
      error: error.message,
    });
  }
});

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 6);
  try {
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials!" });
  }
});

userRouter.post("/forgot-password", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1-hour expiry
    await user.save();

    const email = user.email;
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    console.log(resetLink,resetToken);
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ error: "Error sending email", err });
  }
});

userRouter.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: "Error resetting password" });
  }
});

userRouter.get("/search", authMiddleware, async (req, res) => {
  const { username } = req.query; // Get query param

  try {
    const users = await User.find({ username: new RegExp(username, "i") }); // Case-insensitive search
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User account deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.put("/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Validate old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Incorrect current password" });

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = userRouter;
