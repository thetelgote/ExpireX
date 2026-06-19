// const transporter = require("../config/mailConfig");

// const sendExpiryReminder = async (
//   email,
//   itemName,
//   daysLeft,
//   expiryDate
// ) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Expiry Reminder - ${itemName}`,

//       html: `
//         <h2>Expiry Reminder</h2>

//         <p>Hello User,</p>

//         <p>
//           Your product/medicine
//           <strong>${itemName}</strong>
//           will expire in
//           <strong>${daysLeft} day(s)</strong>.
//         </p>

//         <p>
//           Expiry Date:
//           <strong>
//             ${new Date(expiryDate)
//               .toLocaleDateString()}
//           </strong>
//         </p>

//         <p>
//           Please replace or use it
//           before expiry.
//         </p>

//         <br/>

//         <p>
//           Smart Inventory &
//           Expiry Management System
//         </p>
//       `
//     };

//     await transporter.sendMail(
//       mailOptions
//     );

//     console.log(
//       `Reminder sent for ${itemName}`
//     );

//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = {
//   sendExpiryReminder
// };



// const transporter = require("../config/mailConfig");

// const sendExpiryReminder = async (
//   email,
//   itemName,
//   daysLeft,
//   expiryDate
// ) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Expiry Reminder - ${itemName}`,

//       html: `
//         <h2>Expiry Reminder</h2>

//         <p>Hello User,</p>

//         <p>
//           Your product/medicine
//           <strong>${itemName}</strong>
//           will expire in
//           <strong>${daysLeft} day(s)</strong>.
//         </p>

//         <p>
//           Expiry Date:
//           <strong>
//             ${new Date(expiryDate)
//               .toLocaleDateString()}
//           </strong>
//         </p>

//         <p>
//           Please replace or use it
//           before expiry.
//         </p>

//         <br/>

//         <p>
//           Smart Inventory &
//           Expiry Management System
//         </p>
//       `
//     };

//     await transporter.sendMail(
//       mailOptions
//     );

//     console.log(
//       `Reminder sent for ${itemName}`
//     );

//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const sendExpiredAlert = async (
//   email,
//   itemName,
//   expiryDate
// ) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Item Expired - ${itemName}`,

//       html: `
//         <h2>Item Expired</h2>

//         <p>Hello User,</p>

//         <p>
//           Your product/medicine
//           <strong>${itemName}</strong>
//           has expired and has been
//           moved to your expired items archive.
//         </p>

//         <p>
//           Expiry Date:
//           <strong>
//             ${new Date(expiryDate)
//               .toLocaleDateString()}
//           </strong>
//         </p>

//         <p>
//           Please dispose of or
//           replace it as needed.
//         </p>

//         <br/>

//         <p>
//           Smart Inventory &
//           Expiry Management System
//         </p>
//       `
//     };

//     await transporter.sendMail(
//       mailOptions
//     );

//     console.log(
//       `Expired alert sent for ${itemName}`
//     );

//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = {
//   sendExpiryReminder,
//   sendExpiredAlert
// };



const transporter = require("../config/mailConfig");

const sendExpiryReminder = async (
  email,
  itemName,
  daysLeft,
  expiryDate
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Expiry Reminder - ${itemName}`,

      html: `
        <h2>Expiry Reminder</h2>

        <p>Hello User,</p>

        <p>
          Your product/medicine
          <strong>${itemName}</strong>
          will expire in
          <strong>${daysLeft} day(s)</strong>.
        </p>

        <p>
          Expiry Date:
          <strong>
            ${new Date(expiryDate)
              .toLocaleDateString()}
          </strong>
        </p>

        <p>
          Please replace or use it
          before expiry.
        </p>

        <br/>

        <p>
          Smart Inventory &
          Expiry Management System
        </p>
      `
    };

    await transporter.sendMail(
      mailOptions
    );

    console.log(
      `Reminder sent for ${itemName}`
    );

  } catch (error) {
    console.log(error.message);
  }
};

const sendExpiredAlert = async (
  email,
  itemName,
  expiryDate
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Item Expired - ${itemName}`,

      html: `
        <h2>Item Expired</h2>

        <p>Hello User,</p>

        <p>
          Your product/medicine
          <strong>${itemName}</strong>
          has expired and has been
          moved to your expired items archive.
        </p>

        <p>
          Expiry Date:
          <strong>
            ${new Date(expiryDate)
              .toLocaleDateString()}
          </strong>
        </p>

        <p>
          Please dispose of or
          replace it as needed.
        </p>

        <br/>

        <p>
          Smart Inventory &
          Expiry Management System
        </p>
      `
    };

    await transporter.sendMail(
      mailOptions
    );

    console.log(
      `Expired alert sent for ${itemName}`
    );

  } catch (error) {
    console.log(error.message);
  }
};

const sendResetPasswordEmail = async (
  email,
  resetUrl
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",

      html: `
        <h2>Password Reset Request</h2>

        <p>Hello,</p>

        <p>
          You requested to reset your
          password. Click the link below
          to choose a new password.
          This link is valid for 15 minutes.
        </p>

        <p>
          <a href="${resetUrl}">
            ${resetUrl}
          </a>
        </p>

        <p>
          If you did not request this,
          you can safely ignore this email.
        </p>

        <br/>

        <p>
          Smart Inventory &
          Expiry Management System
        </p>
      `
    };

    await transporter.sendMail(
      mailOptions
    );

    console.log(
      `Reset password email sent to ${email}`
    );

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  sendExpiryReminder,
  sendExpiredAlert,
  sendResetPasswordEmail
};