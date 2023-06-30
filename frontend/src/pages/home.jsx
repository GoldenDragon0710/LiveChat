import React, { useState, useRef } from 'react'
import axios from 'axios';
import {
  Textarea,
  Button,
  Avatar,
  Typography,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import {MyLoader} from "@/widgets/loader/MyLoader";
import {
  notification,
  DatePicker,
} from "antd";
import { TypeWriter } from '@/widgets/message';

export function Home() {
  const [messages, setMessages] = useState([{"role":"assistant", "content":"Let me know on how can I help you. Please type in your question below."}]);
  const chatWindowRef = useRef(null);
  const [isChatavailable, setIsChatAvailable] = useState(false);
  const [isSecond, setIsSecond] = useState(false);
  const [isThird, setIsThird] = useState(false);
  const [isFourth, setIsFourth] = useState(false);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [problem, setProblem] = useState("");
  const [input, setInput] = useState("");
  const [isloading, setIsloading] = useState(false);
  const initQuestions = [
    "Hello Dear, What is your name?",
    "What is your age?",
    "Which country are you from?",
    "What problem/condition are you struggling with?"
  ];
  const [suggestion, setSuggestion] = useState([]);

  const handleDateChange = (date, dateString) => {
    const currentYear = new Date().getFullYear();
    setAge(currentYear - parseInt(dateString.slice(0, 4)));
    setIsThird(true);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleProblemChange = (e) => {
    setProblem(e.target.value);
  };

  const handleFullNameKeyDown = (e) => {
    if (e.key == "Enter") {
      setIsSecond(true);
    }
  };

  const handleDateKeyDown = (e) => {
    if (e.key == "Enter") {
      setIsThird(true);
    }
  };

  const handleCountryKeyDown = (e) => {
    if (e.key == "Enter") {
      setIsFourth(true);
    }
  };

  const handleProblemKeyDown = (e) => {
    if(e.key == "Enter") {
      setIsChatAvailable(true);
      const prompt = `The user is named ${fullName}, he is aged ${age}. He is from ${country}. He believes he is struggling with ${problem} condition. Generate the 7 suggested questions to help him.`;
      setIsloading(true);
      axios.post("http://127.0.0.1:5000/api/suggest", {prompt: prompt})
      .then((res) => {
        let list = [];
        list = res.data.split("\n");
        setSuggestion(list);
        setIsloading(false);
      }).catch((err) => console.log(err));
    }
  };

  const generateAnswer = (prompt) => {
    let list = messages;
    list.push({"role": "user","content": prompt});
    setMessages(list);
    setIsloading(true);
    axios.post("http://127.0.0.1:5000/api/new", {prompt: list})
      .then((res) => {
        let list = messages;
        list.push({"role": "assistant", "content": res.data})
        setMessages(list);
        setInput("");
        setIsloading(false);
      }).catch((err) => console.log(err));
  };

  const handleInputKeyDown = (e) => {
    if (e.key == "Enter") {
      generateAnswer(input);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div ref={chatWindowRef} className="relative container mx-auto px-40 py-4 flex flex-col items-center">
        <div className='w-full flex my-3'>
          <Avatar src='img/Chatbot.svg' className='w-[80px] mx-5 mt-2'/>
          <div className='flex flex-col mx-5 w-full'>
            <Typography variant="h5" className="font-normal my-1 text-[18px]">{initQuestions[0]}</Typography>
            <Input
              label='Full Name'
              value={fullName}
              onKeyDown={handleFullNameKeyDown}
              onChange={handleFullNameChange}
              className="w-full text-[18px]"
            />
          </div>
        </div>
        {
          isSecond && (
            <div className='w-full flex my-3'>
              <Avatar src='img/Chatbot.svg' className='w-[68px] mx-5 mt-2'/>
              <div className='flex flex-col mx-5'>
                <Typography variant="h5" className="font-normal my-1">{initQuestions[1]}</Typography>
                <DatePicker onChange={handleDateChange} onKeyDown={handleDateKeyDown} className='w-[300px] text-[18px]'/>
              </div>
            </div>
          )
        }
        {
          isThird && (
            <div className='w-full flex my-3'>
              <Avatar src='img/Chatbot.svg' className='w-[80px] mx-5 mt-2'/>
              <div className='flex flex-col mx-5 w-full'>
                <Typography variant="h5" className="font-normal my-1 text-[18px]">{initQuestions[2]}</Typography>
                <Input
                  label='Country'
                  value={country}
                  onKeyDown={handleCountryKeyDown}
                  onChange={handleCountryChange}
                  className="w-full text-[18px]"
                />
              </div>
            </div>
          )
        }
        {
          isFourth && (
            <div className='w-full flex my-3'>
              <Avatar src='img/Chatbot.svg' className='w-[80px] mx-5 mt-2'/>
              <div className='flex flex-col mx-5 w-full'>
                <Typography variant="h5" className="font-normal my-1 text-[18px]">{initQuestions[3]}</Typography>
                <Input
                  label='Problem'
                  value={problem}
                  onKeyDown={handleProblemKeyDown}
                  onChange={handleProblemChange}
                  className="w-full text-[18px]"
                />
              </div>
            </div>
          )
        }
        {
          isChatavailable && messages && messages.map((item, idx) => {
            return(
              <div className='w-full flex my-3' key={idx}>
                {
                  item.role == "assistant" && (
                    <>
                      <Avatar src='img/Chatbot.svg' className='w-[68px] mx-5'/>
                      <div className='flex flex-col mx-5 mt-2 w-fit rounded-3xl px-5 py-2 bg-[#8080806e]'>
                        <TypeWriter content={item.content} box_ref={chatWindowRef} speed={5} />
                      </div>
                    </>
                  )
                }
                {
                  item.role == "user" && (
                    <div className='w-full flex justify-end'>
                      <div className='w-fit bg-blue-500 text-[#ffffff] rounded-3xl px-5 py-2'>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content.includes('\n') ? item.content.replace(/\n/g, "<br />") : item.content }}
                          className="text-[18px] font-normal"
                        />
                      </div>
                    </div>
                  )
                }
                
              </div>
            )
          })
        }
        {
          isloading && (<MyLoader isloading={isloading}/>)
        }
        {
          isChatavailable && (
            <div className='w-full flex relative my-3'>
              <div className='w-full mx-5'>
                <Input
                  label='Type your message.'
                  value={input}
                  onKeyDown={handleInputKeyDown}
                  onChange={handleInputChange}
                  className='text-[18px]'
                />
              </div>
              <Button onClick={() => generateAnswer(input)} className='text-[20px] normal-case w-[100px] px-[20px] py-[5px] mx-5'>Send</Button>
            </div>
          )
        }
        {
          (suggestion.length != 0) && (<Typography variant="h3" className="text-[#2196f3] mt-3">SUGGESTED QUESTIONS</Typography>)
        }
        {
          suggestion && suggestion.map((item, idx) => {
            return (
              <div key={idx} onClick={() => generateAnswer(item)} className='w-full my-2 border-[#b0bec5] border-solid border-2 rounded-xl px-3 py-2 hover: cursor-pointer hover:bg-[#b0bec587]'>
                <Typography className="text-[18px] font-normal">
                  {item}
                </Typography>
              </div>
            )
          })
        }
      </div>
      <div>

      </div>
    </>
  );
}

export default Home;
