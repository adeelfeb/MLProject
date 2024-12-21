import mongoose, { Schema } from "mongoose";

const fileDataSchema = new Schema(
  {
    fileUrl: { type: String, required: true },  // URL of the uploaded image on Cloudinary
    fileName: { type: String },  // The original file name
    processedImages: [{         // Array to store processed image details
      kernelName: { type: String, required: true },
      image: { type: String, required: true }, // URL of the processed image
      isMultipleLayers: { type: Boolean, required: true }, // Indicates if multiple layers were used
      layersApplied: { type: Number, required: true } // Number of layers applied
    }],
  },
  { timestamps: true }
);

export const FileData = mongoose.model("FileData", fileDataSchema);
