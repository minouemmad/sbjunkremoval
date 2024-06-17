require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 3000;
const user = process.env.USER;
const pass = process.env.PASS;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: user,
            pass: pass
        },
    });

    const mailOptions = {
        from: req.body.email,
        to: "iowajunkremoval@gmail.com",
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).send("error");
        } else {
            console.log("Email sent successfully:", response);
            res.status(200).send("success");
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});
