from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from utils.llm_stub import get_llm_response

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable CORS for all origins (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class MessageRequest(BaseModel):
    message: str

# Define the chat endpoint
@app.post("/chat")
async def chat(request: MessageRequest):
    user_message = request.message
    response = await get_llm_response(user_message)
    return {"response": response}

# Health check endpoint
@app.get("/")
def health_check():
    return {"status": "ok"}
