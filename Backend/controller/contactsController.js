const asyncHandler = require('express-async-handler');

const Contact = require('../models/contactModel');
const User = require('../models/userModel');

// @desc Get contacts
// @route GET '/api/contacts'
// @access private
const getContacts = asyncHandler(async (req, res) => {

  const contacts = await Contact.find({ user: req.user.id });

  res.status(200).json(contacts);
});

// @desc Post contact
// @route POST '/api/contacts'
// @access private
const postContacts = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please enter a name');
  }
  if (!req.body.email) {
    res.status(400);
    throw new Error('Please enter email');
  }

  const contact = await Contact.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    user: req.user.id,
  });

  res.status(200).json(contact);
});

// @desc Update contact
// @route PUT '/api/contacts/:id'
// @access private
const updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error('Contact not found');
  }

  // Check for the user

  if (!req.user.id) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure only contact that belong to user can update and delete
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedContact);
});

// @desc delete contacts
// @route Delete '/api/contacts/:id'
// @access private
const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error('Contact not found');
  }

  // Check for the user

  if (!req.user.id) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure only contact that belong to user can update and delete
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }

  await contact.deleteOne();
  res.status(200).json({
    id: req.params.id
  }
  );
});

module.exports = ({
  getContacts, postContacts, updateContacts, deleteContacts
});