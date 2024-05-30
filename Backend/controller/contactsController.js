const asyncHandler = require('express-async-handler');

// @desc Get contacts
// @route GET '/api/contacts'
// @access private
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get Contacts' });
});

// @desc post contacts
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
  res.status(200).json({ message: req.body.name });
});

// @desc update contacts
// @route PUT '/api/contacts/:id'
// @access private
const updateContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Contact ${req.params.id}` });
});

// @desc delete contacts
// @route Delete '/api/contacts/:id'
// @access private
const deleteContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Contact ${req.params.id}` });
});

module.exports = ({
  getContacts, postContacts, updateContacts, deleteContacts
});