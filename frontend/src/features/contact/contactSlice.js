import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import contactService from './contactService';

const initialState = {
  contacts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};


// Create new Contact
export const createContact = createAsyncThunk('contact/create', async (contactData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await contactService.createContact(contactData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);

// Get user Contacts
export const getContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.getContacts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Contact
export const updateContact = createAsyncThunk('contact/update', async (contactData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await contactService.updateContact(contactData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);

// Delete user Contact
export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.deleteContact(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter((contact) => contact._id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  }
});


export const { reset } = contactSlice.actions;
export default contactSlice.reducer;