"use server"

import { MD5 } from "crypto-js";

export const getPassword = async (rollNo: string) => {
    const str = `${rollNo}`;
    return MD5(str).toString().substring(0, 8);
}

export const comparePassword = async (enteredPassword: string, rollNo: string) => {
    return (enteredPassword) === await getPassword(rollNo);
}