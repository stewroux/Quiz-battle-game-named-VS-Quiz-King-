# Quiz King Challenge 👑

**Quiz King Challenge** is an interactive, AI-powered trivia game where players test their knowledge against the "Quiz King"—an AI opponent powered by Google's Gemini models.

The application dynamically generates unique questions based on selected categories and simulates an AI opponent that answers alongside the user, creating a competitive and engaging experience.

## ✨ Features

- **Dynamic Quiz Generation**: Never play the same quiz twice. Questions are generated in real-time using the Gemini API based on the chosen category.
- **AI Opponent ("Quiz King")**: You aren't just answering questions; you are competing. The AI plays along, with its accuracy and "thinking" behavior simulated by the model.
- **Multi-language Support**: Fully localized for **English** and **Japanese** (automatic detection based on browser or user selection).
- **Diverse Categories**: Choose from General Knowledge, Science & Nature, History, Geography, Movies & TV, and Music.
- **Responsive Design**: A modern, dark-themed UI built with Tailwind CSS, featuring smooth animations and transitions.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) (`@google/genai`)
- **Model**: Gemini 2.5 Flash (Optimized for speed and reasoning)

## 🤖 How Gemini API is Used

This project utilizes the Google Gemini API for two distinct core functions:

1.  **Quiz Generation (`generateQuiz`)**:
    -   Uses `gemini-2.5-flash` with `responseSchema` to enforce a strict JSON output.
    -   Generates structured trivia questions (Question, 4 Options, Correct Answer) ensuring easy parsing and rendering.

2.  **AI Player Simulation (`getAiAnswer`)**:
    -   The AI acts as a persona ("Quiz King").
    -   It analyzes the question and options to select an answer.
    -   While the model is highly intelligent, it *can* make mistakes, making the competition realistic and fun.

## 🚀 Setup & Installation

### Prerequisites

- A valid [Google Gemini API Key](https://aistudio.google.com/).
- A modern web browser.

### Environment Variables

The application requires the API Key to be available in the environment.
Ensure `process.env.API_KEY` is set in your build or runtime environment.

### Running the Project

1.  **Clone the repository** (if applicable).
2.  **Install dependencies**:
    ```bash
    npm install react react-dom @google/genai
    ```
3.  **Start the development server**.

*Note: This project is configured to use ES Modules with an importmap in `index.html` for specific CDN-based environments, but acts as a standard React source structure.*

## 📂 Project Structure

- **`App.tsx`**: Main application logic and state management (Game Loop).
- **`services/geminiService.ts`**: Handles all interactions with the Google GenAI SDK (Quiz generation and Answer retrieval).
- **`components/`**: Reusable UI components (QuizScreen, StartScreen, CategorySelection, etc.).
- **`i18n.tsx`**: Context provider for handling internationalization.
- **`constants.ts`**: Game configuration (categories, question count).

## 📄 License

This project is open-source and available for educational purposes.

---

*Powered by Google Gemini* ✦
