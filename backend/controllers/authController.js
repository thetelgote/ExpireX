// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const generateToken = require("../utils/generateToken");

// const registerUser = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password
//     } = req.body;

//     const userExists =
//       await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists"
//       });
//     }

//     const salt =
//       await bcrypt.genSalt(10);

//     const hashedPassword =
//       await bcrypt.hash(
//         password,
//         salt
//       );

//     const user =
//       await User.create({
//         name,
//         email,
//         password: hashedPassword
//       });

//     res.status(201).json({
//       success: true,
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const {
//       email,
//       password
//     } = req.body;

//     const user =
//       await User.findOne({ email });

//     if (
//       user &&
//       (await bcrypt.compare(
//         password,
//         user.password
//       ))
//     ) {
//       res.json({
//         success: true,
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message:
//           "Invalid email or password"
//       });
//     }

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// const getProfile = async (
//   req,
//   res
// ) => {
//   const user =
//     await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       id: user._id,
//       name: user.name,
//       email: user.email
//     });
//   } else {
//     res.status(404).json({
//       message: "User not found"
//     });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getProfile
// };



// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const generateToken = require("../utils/generateToken");

// const registerUser = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password
//     } = req.body;

//     const userExists =
//       await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists"
//       });
//     }

//     const salt =
//       await bcrypt.genSalt(10);

//     const hashedPassword =
//       await bcrypt.hash(
//         password,
//         salt
//       );

//     const user =
//       await User.create({
//         name,
//         email,
//         password: hashedPassword
//       });

//     res.status(201).json({
//       success: true,
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const {
//       email,
//       password
//     } = req.body;

//     const user =
//       await User.findOne({ email });

//     if (
//       user &&
//       (await bcrypt.compare(
//         password,
//         user.password
//       ))
//     ) {
//       res.json({
//         success: true,
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message:
//           "Invalid email or password"
//       });
//     }

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// const getProfile = async (
//   req,
//   res
// ) => {
//   const user =
//     await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       id: user._id,
//       name: user.name,
//       email: user.email
//     });
//   } else {
//     res.status(404).json({
//       message: "User not found"
//     });
//   }
// };

// const updateProfile = async (
//   req,
//   res
// ) => {
//   try {
//     const user =
//       await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     const { name, email } = req.body;

//     if (email && email !== user.email) {
//       const emailTaken =
//         await User.findOne({ email });

//       if (emailTaken) {
//         return res.status(400).json({
//           success: false,
//           message: "Email is already in use"
//         });
//       }
//     }

//     user.name = name || user.name;
//     user.email = email || user.email;

//     const updatedUser = await user.save();

//     res.json({
//       success: true,
//       user: {
//         id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// const changePassword = async (
//   req,
//   res
// ) => {
//   try {
//     const {
//       currentPassword,
//       newPassword
//     } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Current password and new password are required"
//       });
//     }

//     const user =
//       await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     const isMatch = await bcrypt.compare(
//       currentPassword,
//       user.password
//     );

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Current password is incorrect"
//       });
//     }

//     const salt = await bcrypt.genSalt(10);

//     user.password = await bcrypt.hash(
//       newPassword,
//       salt
//     );

//     await user.save();

//     res.json({
//       success: true,
//       message: "Password updated successfully"
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getProfile,
//   updateProfile,
//   changePassword
// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");

const {
  sendResetPasswordEmail
} = require(
  "../services/emailService"
);

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword
      });

    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({
        success: false,
        message:
          "Invalid email or password"
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getProfile = async (
  req,
  res
) => {
  const user =
    await User.findById(req.user._id);

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
};

const updateProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const { name, email } = req.body;

    if (email && email !== user.email) {
      const emailTaken =
        await User.findOne({ email });

      if (emailTaken) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use"
        });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required"
      });
    }

    const user =
      await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const forgotPassword = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user =
      await User.findOne({ email });

    // Always respond with success, even
    // if no user is found, so the
    // endpoint can't be used to
    // discover registered emails.
    if (!user) {
      return res.json({
        success: true,
        message:
          "If that email is registered, a reset link has been sent"
      });
    }

    const rawToken =
      crypto.randomBytes(32)
        .toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetPasswordToken =
      hashedToken;

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "http://localhost:5173";

    const resetUrl =
      `${frontendUrl}/reset-password/${rawToken}`;

    await sendResetPasswordEmail(
      user.email,
      resetUrl
    );

    res.json({
      success: true,
      message:
        "If that email is registered, a reset link has been sent"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const resetPassword = async (
  req,
  res
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required"
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now()
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Reset link expired or invalid"
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      password,
      salt
    );

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword
};