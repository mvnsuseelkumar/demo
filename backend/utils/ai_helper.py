from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
from config import Config

class AIAssistant:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Running on: {self.device}")
        
    def load_model(self):
        if self.model is None:
            print("Loading AI model... might take a sec")
            self.tokenizer = AutoTokenizer.from_pretrained(Config.MODEL_NAME)
            self.model = AutoModelForSeq2SeqLM.from_pretrained(Config.MODEL_NAME)
            self.model.to(self.device)
            print("Model loaded successfully!")
    
    def get_response(self, prompt, max_len=256):
        self.load_model()
        
        # Format the prompt nicely
        formatted_prompt = f"Answer this career question: {prompt}"
        
        inputs = self.tokenizer(formatted_prompt, return_tensors="pt", 
                               max_length=512, truncation=True)
        inputs = inputs.to(self.device)
        
        # Generate response
        outputs = self.model.generate(
            inputs.input_ids,
            max_length=max_len,
            temperature=Config.TEMPERATURE,
            do_sample=True,
            top_p=0.9,
            num_return_sequences=1
        )
        
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response.strip()
    
    def create_roadmap(self, skill):
        prompt = f"""Create a realistic 2-week learning plan for {skill}. 
        Include specific topics and practical exercises."""
        
        response = self.get_response(prompt, max_len=400)
        
        # Parse into weeks - simple but effective
        weeks = []
        lines = response.split('.')
        
        week_1_topics = ' '.join(lines[:len(lines)//2])
        week_2_topics = ' '.join(lines[len(lines)//2:])
        
        weeks.append({
            "week": 1,
            "topics": week_1_topics.strip(),
            "hours": "10-15 hours"
        })
        
        weeks.append({
            "week": 2, 
            "topics": week_2_topics.strip(),
            "hours": "10-15 hours"
        })
        
        return weeks

# Single instance to avoid reloading model
ai_bot = AIAssistant()