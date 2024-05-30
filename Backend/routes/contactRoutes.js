const express = require('express');
const router = express.Router();
const { getContacts, postContacts, updateContacts, deleteContacts } = require('../controller/contactsController');

router.route('/').get(getContacts).post(postContacts);
router.route('/:id').put(updateContacts).delete(deleteContacts);


module.exports = router;