/* eslint-disable consistent-return */
import { createUser, findUserByUsername, validatePassword } from "../services/user.service.js";

export const register = async (req, res) => {
    const { username, password, confirm } = req.body;

    if (!username || !password || !confirm) {
        return res.status(400).json({ error: "All fields required" });
    }

    if (password !== confirm) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    await createUser(username, password);
    res.json({ success: true });
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "All fields required" });
    }

    const user = await findUserByUsername(username);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await validatePassword(password, user.password);
    if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.user = {
        userId: user.userId,
        username: user.username,
    }

    res.json({ success: true, user: req.session.user });
};

export const check = (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  }
  return res.status(401).json({ loggedIn: false });
}

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    }) 
}