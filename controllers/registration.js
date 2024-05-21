const Modelf = require("../models/modelf");
const nodemailer = require("nodemailer");

exports.modelRegister = async (req, res) => {
  const {
    fullname,
    email,
    phone,
    location,
    experience,
    age,
    social,
    height,
    designation,
  } = req.body;
  try {
    const newModelf = new Modelf({
      fullname,
      email,
      phone,
      location,
      experience,
      age,
      social,
      height,
      designation,
    });
    await newModelf.save();

    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREEVO_ID, // generated ethereal user
        pass: process.env.BREEVO_PASS, // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      to: "info@indiadesignershow.com",
      from: "info@indiadesignershow.com",
      subject: "IDS Model Registration",
      text: `
      <h3>Model Details</h3>
      <ul>
        <li><p>Name : ${fullname} </p></li>
        <li><p>Email : ${email}</p></li>
        <li><p>Subject : ${phone}</p></li>
        <li><p>Location : ${location}</p></li>
        <li><p>Experience : ${experience}</p></li>
        <li><p>Age : ${age}</p></li>
        <li><p>Social : ${social}</p></li>
        <li><p>Height : ${height}</p></li>
        <li><p>Designation : ${designation}</p></li>

      </ul>`, // plain text body
    });
    // const modelMsg = {
    //   to: "minhazashraf590@gmail.com",
    //   from: "minhazashraf590@gmail.com",
    //   subject: "IDS Model Registration",
    //   text: `
    //     <h3>Model Details</h3>
    //     <ul>
    //       <li><p>Name : ${fullname} </p></li>
          
    //       <li><p>Email : ${email}</p></li>
    //       <li><p>Subject : ${phone}</p></li>
    //       <li><p>Location : ${location}</p></li>
    //       <li><p>Experience : ${experience}</p></li>
    //       <li><p>Age : ${age}</p></li>
    //       <li><p>Social : ${social}</p></li>
    //       <li><p>Height : ${height}</p></li>
    //       <li><p>Designation : ${designation}</p></li>

    //     </ul>
    //   `,
    // };
    // await sgMail.send(modelMsg);
    res.status(201).json({ message: "Model registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Designer = require("../models/Designer");

exports.designerRegister = async (req, res) => {
  const { fullname, email, phone, location, experience, social } = req.body;
  try {
    const newDesigner = new Designer({
      fullname,
      email,
      phone,
      location,
      experience,

      social,
    });
    await newDesigner.save();

    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREEVO_ID, // generated ethereal user
        pass: process.env.BREEVO_PASS, // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      to: "info@indiadesignershow.com",
      from: "info@indiadesignershow.com",
      subject: "IDS Designer Registration",
      text: `
        <h3>Designer Details</h3>
        <ul>
          <li><p>Name : ${fullname} </p></li>
          
          <li><p>Email : ${email}</p></li>
          <li><p>Subject : ${phone}</p></li>
          <li><p>Location : ${location}</p></li>
          <li><p>Experience : ${experience}</p></li>
              <li><p>Social : ${social}</p></li>
       
       

        </ul>
      `,
    });
    // await sgMail.send(DesignerMsg);
    res.status(201).json({ message: "Model registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Brand = require("../models/brand");

exports.BrandRegister = async (req, res) => {
  const { fullname, email, phone, brandlink, designation, brandname } =
    req.body;
  try {
    const newBrand = new Brand({
      fullname,
      email,
      phone,
      brandname,
      brandlink,
      designation,
    });
    await newBrand.save();
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREEVO_ID, // generated ethereal user
        pass: process.env.BREEVO_PASS, // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      to: "info@indiadesignershow.com",
      from: "info@indiadesignershow.com",
      subject: "IDS Brand Registration",
      text: `
        <h3>Brand Details</h3>
        <ul>
          <li><p>Name : ${fullname} </p></li>
          
          <li><p>Email : ${email}</p></li>
          <li><p>Subject : ${phone}</p></li>
          <li><p>Location : ${brandname}</p></li>
          <li><p>Experience : ${brandlink}</p></li>
          <li><p>Social : ${designation}</p></li>
       
       

        </ul>
      `,
    });
    // await sgMail.send(brandMsg);
    res.status(201).json({ message: "Model registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
