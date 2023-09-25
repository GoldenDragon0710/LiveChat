from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
import openai
from dotenv import load_dotenv
import json
from flask_mysqldb import MySQL

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123qwe!@#QWE'
app.config['MYSQL_DB'] = 'development'
 
mysql = MySQL(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
load_dotenv()

@app.route("/")
@cross_origin()
def home():
  return "Hello World!"

@app.route("/api/new/", methods=['POST'])
@cross_origin()
def generateNew():
  messages = request.json['messages']
  print("messages----", messages)
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=messages,
    temperature=0.25,
  )
  cursor = mysql.connection.cursor()
  cursor.execute("INSERT INTO ChatGPT (prompt) VALUES(%s)", (prompt))
  mysql.connection.commit()
  cursor.close()
  return response["choices"][0]["message"]["content"]

@app.route("/api/get", methods=['POST'])
@cross_origin()
def selectPrompts():
  cursor = mysql.connection.cursor()
  cursor.execute("SELECT * FROM ChatGPT")
  records = cursor.fetchall()
  cursor.close()
  return records

if __name__ == "__main__":
  app.run()
