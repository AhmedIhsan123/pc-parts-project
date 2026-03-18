import { pool } from "../model/db.connect.js";
import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
}

// eslint-disable-next-line arrow-body-style
export const validatePassword = async (plainPassword, storedHash) => {
    return await bcrypt.compare(plainPassword, storedHash);
}

export const findUserByUsername = async (username) => {
    const [results] = await pool.query(
        "SELECT userId, username, password FROM users WHERE username = ? LIMIT 1",
        [username]
    );
    return results[0];
};

export const createUser = async (username, plainPassword = "user") => {
    if (!username) throw new Error("Username is required.");
    if (!plainPassword) throw new Error("Password is required.");

    //hash the password before insert!
    const passwordHash = await hashPassword(plainPassword);

    const [result] = await pool.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, passwordHash]
    );

    return {
        userId: result.insertId,
        username,
    };
};