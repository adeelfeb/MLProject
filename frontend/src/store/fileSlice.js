import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFile: null,
  currentFileData: {
    fileId: null,
    fileUrl: null,
    fileName: null,
  },
  fileUploadError: false, // Flag for file upload error
  currentImageDetails: [], // Added object for current video details
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setCurrentFile(state, action) {
      state.currentFile = action.payload;
    },
    setCurrentFileData(state, action) {
      state.currentFileData = {
        fileId: action.payload.fileId,
        fileUrl: action.payload.fileUrl,
        fileName: action.payload.fileName,
      };
    },
    setFileUploadError(state, action) {
      state.fileUploadError = action.payload; // true for error, false otherwise
    },
    resetFileState(state) {
      state.currentFile = null;
      state.currentFileData = {
        fileId: null,
        fileUrl: null,
        fileName: null,
      };
      state.fileUploadError = false; // Reset error flag
    },
    setCurrentImageDetails(state, action) {
      state.currentImageDetails = action.payload; // Set the current video details
    },
    resetCurrentImageDetails(state) {
      state.currentImageDetails = []; // Reset current video details
    },
  },
});

export const {
  setCurrentFile,
  setCurrentFileData,
  setFileUploadError,
  resetFileState,
  setCurrentImageDetails,
  resetCurrentImageDetails,
} = fileSlice.actions;

export default fileSlice.reducer;
