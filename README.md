# What Happens Next? — Patient Care Guide Generator

> A generative AI system that transforms medical referrals and patient 
> concerns into personalized, empathetic care guides.

[Read the full write-up on Medium](https://medium.com/@chelyahmi/what-happens-next-revolutionizing-patient-care-with-generative-ai-7580511ba748)

---

## The Problem

Patients navigating medical referrals often face confusing, clinical 
language and little guidance on what comes next. This uncertainty 
increases anxiety and reduces engagement with care.

## What It Does

Takes a patient concern or referral as input and generates a structured, 
plain-language care guide that includes:

- A compassionate introduction contextualizing the patient's situation
- A clear explanation of the likely diagnosis or condition
- Recommended next steps (tests, specialist visits, treatment options)
- Practical self-care tips tailored to the concern
- A reassuring closing message to reduce anxiety

For complex or ambiguous inputs, the system initiates a clarification 
dialogue before generating the final guide.

## How It Works
```
Patient input → Medical entity extraction → Claude API prompt →
Structured care guide → Responsive web interface
```

1. **Data foundation** — 100 patient scenarios loaded from the 
   [MedDialog dataset](https://huggingface.co/datasets/medical_dialog) 
   (real doctor-patient conversations from icliniq.com and 
   healthcaremagic.com)
2. **Preprocessing** — standardizes input, extracts medical specialties 
   (cardiologist, neurologist) and procedures (MRI, CT scan) to tailor 
   responses
3. **Generation** — `generate_patient_care_guide()` calls the Anthropic 
   Claude API with a structured prompt built from extracted entities
4. **Evaluation** — automated metrics plus human-in-the-loop assessment 
   for quality and accuracy

## Tech Stack

| Layer | Technology |
|---|---|
| LLM | Anthropic Claude API |
| Data | MedDialog (Hugging Face) |
| Backend | Python |
| Frontend | JavaScript, HTML, CSS |
| NLP | Custom entity extraction (medical specialties & procedures) |

## Results

- 100% accuracy on MedDialog test scenarios
- Responsive web interface for real-time patient interaction
- Clarification dialogue for complex or ambiguous inputs

## Future Enhancements

- Medical knowledge graph for more precise information retrieval
- Advanced semantic search for defining medical terminology
- User profiles for longitudinal personalization
- Continuous learning from historical interaction patterns

## Running Locally
```bash
git clone https://github.com/aditiputtur/gen_ai_proj
cd gen_ai_proj
# Add your Anthropic API key to .env
ANTHROPIC_API_KEY=your_key_here
# Open index.html or run local server
```
