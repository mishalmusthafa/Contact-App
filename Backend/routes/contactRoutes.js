const express = require('express');
const router = express.Router();
const { getContacts, postContacts, updateContacts, deleteContacts } = require('../controller/contactsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getContacts).post(protect, postContacts);
router.route('/:id').put(protect, updateContacts).delete(protect, deleteContacts);


module.exports = router;