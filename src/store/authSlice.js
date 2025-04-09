import dbService from "@/appwrite/db";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  installationStatus: false,
  installationId: null,
};

export const fetchInstallation = createAsyncThunk(
  "fetchInstallation",
  async (_, { getState }) => {
    try {
      const state = getState();
      const userData = state.auth.userData;

      if (userData) {
        const response = await dbService.getGithubAppData(
          userData.targets[0].providerId
        );
        // console.log(response.installationID);
        return response.installationID;
      }
      return null;
    } catch (error) {
      throw error; // This will trigger the rejected case
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    changeInstallationStatus: (state, action) => {
      state.installationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInstallation.pending, (state) => {
      state.installationStatus = false;
    });
    builder.addCase(fetchInstallation.fulfilled, (state, action) => {
      state.installationStatus = true;
      state.installationId = action.payload; // Update posts in the state
      // console.log("Posts updated in state:", state.posts);
    });
    builder.addCase(fetchInstallation.rejected, (state, action) => {
      state.installationStatus = false;
      state.error = action.error.message || "Failed to fetch posts";
      console.error("Error in rejected state:", action.error);
    });
  },
});

export const { login, logout, changeInstallationStatus } = authSlice.actions;

export default authSlice.reducer;
