const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("./db");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const app = express();
app.use(cors());
app.use(express.json());
app.get("/test-email", async (req, res) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Sahara Email Test",
            text: "Sahara ka email system successfully kaam kar raha hai!"
        });

        res.send("Email sent successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Email failed");
    }
});
const loginOtps = new Map();


// ================= SEND LOGIN OTP =================

app.post("/api/send-login-otp", async (req, res) => {

    try {

        const { email } = req.body;

        console.log("OTP requested for:", email);

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email required"
            });
        }

        const otp =
            Math.floor(100000 + Math.random() * 900000).toString();

        loginOtps.set(email, {
            otp: otp,
            expires: Date.now() + 5 * 60 * 1000
        });

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Sahara Login OTP",

            html: `
                <h2>Sahara Login Verification</h2>

                <p>Your OTP is:</p>

                <h1>${otp}</h1>

                <p>This OTP will expire in 5 minutes.</p>
            `
        });

        console.log("OTP sent successfully to:", email);

        res.json({
            success: true,
            message: "OTP email par bhej diya gaya"
        });

    } catch (error) {

        console.error("OTP EMAIL ERROR:", error);

        res.status(500).json({
            success: false,
            message: "OTP send nahi ho paya"
        });
    }
});


// ================= VERIFY LOGIN OTP =================

app.post("/api/verify-login-otp", (req, res) => {

    const { email, otp } = req.body;

    if (!email || !otp) {

        return res.status(400).json({
            success: false,
            message: "Email and OTP required"
        });
    }

    const savedData = loginOtps.get(email);

    if (!savedData) {

        return res.status(400).json({
            success: false,
            message: "OTP not found. Please request a new OTP."
        });
    }

    if (Date.now() > savedData.expires) {

        loginOtps.delete(email);

        return res.status(400).json({
            success: false,
            message: "OTP expired. Please request a new OTP."
        });
    }

    if (savedData.otp !== otp) {

        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });
    }

    loginOtps.delete(email);

    res.json({
        success: true,
        message: "Login successful"
    });
});

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/index.html"));
});

app.get("/api/status",(req,res)=>{
  res.json({success:true,message:"SAHARA backend is running."});
});

app.get("/api/support",(req,res)=>{
  db.query("SELECT * FROM support_services ORDER BY id DESC",(err,results)=>{
    if(err){
      console.error(err);
      return res.status(500).json({success:false,message:"Database error"});
    }
    res.json({success:true,services:results});
  });
});

app.post("/api/contact",(req,res)=>{
  const {name,phone,message}=req.body;
  if(!name||!message){
    return res.status(400).json({success:false,message:"Name and message are required."});
  }
  db.query(
    "INSERT INTO contact_messages (name,phone,message) VALUES (?,?,?)",
    [name,phone||null,message],
    (err)=>{
      if(err){
        console.error(err);
        return res.status(500).json({success:false,message:"Could not save message."});
      }
      res.json({success:true,message:"Message submitted successfully."});
    }
  );
});

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`SAHARA server running on port ${PORT}`));