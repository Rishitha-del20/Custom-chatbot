from fastapi import FastAPI, Request
from pydantic import BaseModel
from db import Session, Message, Conversation

app = FastAPI()

class ChatInput(BaseModel):
    user_id: int
    message: str
    conversation_id: int = None

@app.post("/api/chat")
def chat(data: ChatInput):
    session = Session()

    # Create conversation if needed
    if not data.conversation_id:
        convo = Conversation(user_id=data.user_id)
        session.add(convo)
        session.commit()
        convo_id = convo.id
    else:
        convo_id = data.conversation_id

    # Save user message
    user_msg = Message(conversation_id=convo_id, sender='user', content=data.message)
    session.add(user_msg)

    # Placeholder for AI response
    ai_response = "This would be your AI's response."
    ai_msg = Message(conversation_id=convo_id, sender='ai', content=ai_response)
    session.add(ai_msg)

    session.commit()
    return {"conversation_id": convo_id, "response": ai_response}
