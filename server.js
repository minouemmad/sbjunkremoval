require('dotenv').config()
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 3000;
const user = process.env.USER;
const pass = process.env.PASS;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/", (req, res) => {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'iowajunkremoval@gmail.com',
            pass: 'vvlocplhrksrrevt'
        },
    });

    const mailOptions = {
        from: req.body.email,
        to: "iowajunkremoval@gmail.com", //my email
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, responose) => {
        if(error) {
            console.log(error);
            res.send("error")
        } else {
            console.log("Email Sent");
            res.send("success")
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});