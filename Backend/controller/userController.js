const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @Desc User Login
// @Route POST api/users/login
// @Access Public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Register validation
  if (!req.body.name) {
    res.status(401);
    throw new Error('Please enter a name');
  }
  if (!req.body.email) {
    res.status(401);
    throw new Error('Please enter an email');
  }
  if (!req.body.password) {
    res.status(401);
    throw new Error('Please enter a password');
  }

  // Check email exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exist');
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  }
});

// @Desc User Login
// @Route POST api/users/login
// @Access Public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // Login validation
  if (!req.body.email) {
    res.status(401);
    throw new Error('Please enter the email');
  }
  if (!req.body.password) {
    res.status(401);
    throw new Error('Please enter the password');
  }

  // Check user & password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});

// @Desc Get User
// @Route POST api/users/me
// @Access Private
const getMe = asyncHandler(async (req, res) => {

  res.status(200).json(req.user);
});

// Json Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


module.exports = {
  userRegister, userLogin, getMe
};