from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from typing import Optional

# Define the template for the career counselor
template = """
You are a helpful and knowledgeable career counselor. 
Your task is to guide individuals in finding the best career based on their skills, interests, and experience. 
Provide suggestions for possible career paths, discuss the job market trends, and suggest qualifications they should pursue. 
Here is the conversation history: {context}
Question: {question}
Answer: 
"""

# Initialize the LLM with the career counselor persona
model = OllamaLLM(model="llama3")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

# Define the FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# To store the conversation context for each user session
user_contexts = {}

# Define request body class
class ConversationRequest(BaseModel):
    user_id: str
    question: str

# Define response body class
class ConversationResponse(BaseModel):
    answer: str

# API endpoint to handle conversation
@app.post("/chat", response_model=ConversationResponse)
async def handle_conversation(request: ConversationRequest):
    user_id = request.user_id
    question = request.question

    # Retrieve or initialize the context with an introduction
    context = user_contexts.get(user_id, "AI: Hello! I am your career counselor. I'm here to help you explore different career paths based on your skills and interests. How can I assist you today?\n")

    try:
        # Get the result from the model
        result = chain.invoke({"context": context, "question": question})

        # Update the context for the user
        context += f"\nUser: {question}\nAI: {result}"
        user_contexts[user_id] = context

        return ConversationResponse(answer=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# API endpoint to clear conversation history
@app.post("/clear_history")
async def clear_history(user_id: str):
    if user_id in user_contexts:
        del user_contexts[user_id]
        return {"message": f"Conversation history cleared for user {user_id}"}
    else:
        return {"message": f"No history found for user {user_id}"}

# Run the app using uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
