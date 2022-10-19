import Role from "./../../models/role";
import { Router } from "express";
import User from "../../models/user";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/signup", async (req, res) => {
  const {
    name: name,
    lastname: lastname,
    email: email,
    password: password,
    phone_number: phone_number,
    role: role,
  } = req.body;

  try {
    const user = new User({
      name: name,
      lastname: lastname,
      email: email,
      password: await User.encryptPassword(password),
      phone_number: phone_number,
      role: role,
    });

    if (role) {
      const foundRoles = await Role.find({
        name: { $in: role },
      });
      user.role = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      user.role = [role._id];
    }

    const savedUser = await user.save();
    const token: string = jwt.sign({ _id: savedUser._id }, "token", {
      expiresIn: 60 * 60 * 24,
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.status(200).json({ token, savedUser });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
});

export default router;
