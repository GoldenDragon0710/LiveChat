from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
import openai
from dotenv import load_dotenv
import json

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
load_dotenv()

def generateSuggestion(prompt):
  message = [
          {"role": "system", "content": "Please provide the 7 best suggestions the customer can ask the bot for health care and wellness."}]
  message.append(prompt)
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=message,
    temperature=0.2,
  )
  return response["choices"][0]["message"]["content"]

def generateAnswer(prompt):
  message = [
          {"role": "system", "content": "You should answer the questions related to health or wellness. If the user asks any questions that is NOT related to health or wellness, do not generate an answer. Tell the user 'Sorry I cannot answer anything questions outside of health or wellness'."}]
  for item in prompt:
    message.append(item)
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=message,
    temperature=0.2,
  )
  return response["choices"][0]["message"]["content"]

@app.route("/")
@cross_origin()
def home():
  return "Hello World!"

@app.route("/api/suggest", methods=['POST'])
@cross_origin()
def suggestions():
  prompt = request.json['prompt']
  userInput = {"role": "user", "content": prompt}
  answer = generateSuggestion(userInput)
  return answer

@app.route("/api/new", methods=['POST'])
@cross_origin()
def generateNew():
  prompt = request.json['prompt']
  answer = generateAnswer(prompt)
  return answer

if __name__ == "__main__":
  app.run()
