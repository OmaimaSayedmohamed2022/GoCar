import User from'../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword, phone, role } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, email, phone, role, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        console.log("new user register error", error);
        res.status(404).json({ message: "new user register error", error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }


        const token = jwt.sign({ userId: user._id }, process.env.KEY_TOKEN, { expiresIn: '1h' });
        
        res.status(200).json({ message: 'User login successfully', token });
    } catch (error) {
        console.log('Error in login:', error);
        return res.status(500).send({ message: 'Error in login', error: error.message });
    }
};

export const loginWithGoogle = async (req, res) => {
  async (req, res) => {
    // const { idToken } = req.body;
    const idToken = req.headers["id-token"];
    try {
      const userData = await verifyGoogleToken(idToken);
      // Proceed with your app’s logic using `userData`
      if (userData.email_verified !== true) {
        return res
          .status(400)
          .json({ error: "Email is not verified , try valid google email" });
      }

    //check data by email
    const user = await User.findOne({
      email: userData.email,
      provider: "GOOGLE",
    });
    if (!user) return next(new Error("User Not found", { cause: 404 }));
    //generate token
    const token = generateToken({
      payload: { userId: user._id, email: userData.email },
      expiresIn: 40,
    });
    //update the status to online
    user.status = status.online;
    user.token = token;
    await user.save();

    res
      .status(200)
      .json({ message: "login successfully with google", userData });

    // {
    //   "sub": "1234567890",
    //   "name": "John Doe",
    //   "given_name": "John",
    //   "family_name": "Doe",
    //   "picture": "https://example.com/johndoe.jpg",
    //   "email": "johndoe@example.com",
    //   "email_verified": true,
    //   "locale": "en"
    // }

      // Example logic: Check if user exists in DB
      // const user = await User.findOne({ googleId: userData.sub });
      // if (!user) {
      //   // Create new user in DB
      //   const newUser = new User({
      //     googleId: userData.sub,
      //     name: userData.name,
      //     email: userData.email,
      //     picture: userData.picture,
      //   });
      //   await newUser.save();
      // }
      res.json(userData);
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};
// module.exports = {
//   register,
//   login,
//   loginWithGoogle,
// };
