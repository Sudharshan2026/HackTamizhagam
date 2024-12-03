# IEEE IndiCon 2024
## AI-Powered Career Counseling Application

This application serves as a virtual career counselor, helping users explore and understand their career options through an AI-powered aptitude assessment and personalized guidance.

## Features

- **Career Path Guidance**: Tailored responses based on user interests, skills, and knowledge.
- **Aptitude Assessment**: A 25-question assessment to evaluate user skills and preferences.
- **Missed Questions Tracking**: Displays the number of questions missed during the assessment.
- **Result Visualization**: Interactive chart displaying assessment results.
- **Community Feature**: A space for users to share insights and seek advice.
- **Data Storage**: User data stored in JSON format within a `userdata` folder.

## Requirements

- Python 3.7 or higher
- FastAPI
- Uvicorn
- LangChain
- Ollama LLM
- Node.js and npm (for frontend)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/career-counselor-app.git
   cd career-counselor-app
   ```

2. **Create a virtual environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install required Python packages**:
   ```bash
   pip install fastapi uvicorn langchain langchain_ollama
   ```

4. **Install Node.js and npm**:
   - Follow the instructions from the [Node.js website](https://nodejs.org/en/download/) to download and install Node.js, which includes npm.

5. **Navigate to the frontend directory** (if applicable):
   ```bash
   cd frontend  # Change this if your frontend is in a different directory
   ```

6. **Install frontend dependencies**:
   ```bash
   npm install
   ```

7. **Run the frontend development server**:
   ```bash
   npm run dev
   ```

## Running the Application

1. **Start the FastAPI server**:
   ```bash
   uvicorn main:app --reload
   ```
   Here, `main` refers to the Python file (e.g., `main.py`) where your FastAPI app is defined.

2. **Access the application**:
   Open your web browser and navigate to `http://127.0.0.1:8000`.

3. **API Documentation**:
   You can access the automatically generated API documentation at `http://127.0.0.1:8000/docs`.

4. **Frontend Access**:
   Access your frontend application (if applicable) at the URL specified by your `npm run dev` command output (usually `http://localhost:3000`).

## Usage

1. **Aptitude Assessment**:
   - Navigate to the "Aptitude Assessment" section in the sidebar.
   - Answer the questions presented in the quiz format.
   - After completion, view your results, including any missed questions.

2. **Career Guidance**:
   - Based on your assessment results, receive personalized career path suggestions.

3. **Data Storage**:
   - Your assessment results will be saved in a JSON file named after your username in the `userdata` folder.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request.

## Contact

For any inquiries or support, please contact [bshath0206@gmail.com].
