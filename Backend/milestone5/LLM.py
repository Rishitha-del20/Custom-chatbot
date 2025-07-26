from groq import Groq  # or openai

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_response(user_message):
    chat_completion = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[
            {"role": "system", "content": "You're a helpful e-commerce chatbot."},
            {"role": "user", "content": user_message}
        ]
    )
    return chat_completion.choices[0].message.content
