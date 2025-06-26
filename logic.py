import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def get_patient_guide(user_input: str) -> str:
    prompt = f"""
    You are a compassionate virtual assistant helping patients understand what to expect after medical care.

    A patient said: "{user_input}"

    Respond in plain, empathetic language. Avoid medical jargon. Use clear, step-by-step guidance. Be brief but helpful. Do not mention insurance.

    Example:
    "After a referral to a cardiologist, here’s what usually happens:
    1. The clinic will contact you within a few days to schedule.
    2. You may be asked to fill out medical history forms.
    3. Your first appointment usually includes..."

    Now respond in the same format.
    """

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=512,
        temperature=0.7,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.content[0].text.strip()