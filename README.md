
# AI Image Colorizer & 4K Enhancer

This web application uses the power of the Google Gemini API to transform black and white images into vibrant, full-color masterpieces and enhances them to a photorealistic 4K resolution.

![App Screenshot](https://storage.googleapis.com/aistudio-project-assets/misc/image-colorizer-screenshot.png)

## ✨ Features

- **Intuitive UI**: Simple drag-and-drop or click-to-upload interface.
- **Advanced AI Processing**: Leverages the `gemini-2.5-flash-image` model for state-of-the-art image colorization and upscaling.
- **High-Resolution Output**: Converts images to a photorealistic 4K quality, adding incredible detail.
- **Side-by-Side Comparison**: View the original and the AI-generated image next to each other to see the stunning transformation.
- **Download Functionality**: Easily save the enhanced, colorized image to your device.
- **Responsive Design**: A clean, modern, and responsive interface built with Tailwind CSS that works on all screen sizes.
- **Loading & Error States**: Clear feedback is provided to the user during processing and if any errors occur.

## 🛠️ How It Works

The application follows a simple yet powerful workflow:

1.  **Image Upload**: The user uploads a black and white image (PNG, JPG, or WEBP format) through the browser.
2.  **Frontend Processing**: The React frontend reads the image as a Base64 encoded string.
3.  **API Request**: The Base64 image data is sent to the Google Gemini API along with a specific text prompt: *"Colorize this black and white image and upscale it to a photorealistic 4K resolution. Add vibrant, natural colors while preserving the original details and composition."*
4.  **Gemini Magic**: The `gemini-2.5-flash-image` model processes the image and the prompt, performing both colorization and resolution enhancement in a single step.
5.  **API Response**: The model returns a new, fully-processed image, also encoded in Base64.
6.  **Display and Download**: The application displays the new image alongside the original, and enables the download button for the user.

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **AI Model**: [Google Gemini API (`gemini-2.5-flash-image`)](https://ai.google.dev/) via the `@google/genai` SDK
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Environment**: Runs directly in the browser, utilizing modern JavaScript features like ES modules.

## 📂 File Structure

The project is organized into logical components and services for clarity and maintainability.

```
.
├── index.html                # The main HTML entry point
├── index.tsx                 # React application root
├── App.tsx                   # Main application component, handling state and UI
├── metadata.json             # Application metadata
├── components/
│   ├── ImageDisplay.tsx      # A reusable container for displaying images
│   ├── ImageUploader.tsx     # The component for file selection and preview
│   └── Spinner.tsx           # A loading spinner component
└── services/
    └── geminiService.ts      # Module for all interactions with the Gemini API
```

## ⚙️ Setup and Configuration

This application is designed to run in a web environment where the Gemini API key is securely managed.

- **API Key**: The application requires a Google Gemini API key to be available as an environment variable (`process.env.API_KEY`). The `geminiService.ts` file is pre-configured to use this variable.
- **Dependencies**: All dependencies like React, ReactDOM, and `@google/genai` are imported via an `importmap` in `index.html`, requiring no local installation or build step to run.
