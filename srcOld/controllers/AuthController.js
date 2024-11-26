import { PrismaClient } from "@prisma/client";

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

export default class AuthController {
    static login(req, res, next) {
        const { email, password } = req.body;
    }
}
