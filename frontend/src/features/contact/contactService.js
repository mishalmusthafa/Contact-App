import axios from 'axios';

const API_URL = '/api/contacts/';

//Create contact
const createContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(API_URL, contactData, config);
  return response.data;
};

// Get user contacts
const getContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//update  contact
const updateContact = async (contactData, token) => {

  const id = contactData.id;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(API_URL + id, contactData, config);

  return response.data;
};


// Delete user contacts
const deleteContact = async (contactId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + contactId, config);
  return response.data;
};

const contactService = {
  createContact,
  getContacts,
  deleteContact,
  updateContact,
};

export default contactService;