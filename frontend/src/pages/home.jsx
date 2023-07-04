import React, { useState, useRef } from 'react'
import axios from 'axios';
import {
  Button,
  Avatar,
  Typography,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import { MyLoader } from "@/widgets/loader/MyLoader";
import {
  notification,
  InputNumber
} from "antd";
import { TypeWriter } from '@/widgets/message';
import { Configuration, OpenAIApi } from "openai";
// import.meta.env.VITE_OPENAI_API_KEY;

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

export function Home() {
  const [messages, setMessages] = useState(null);
  const chatWindowRef = useRef(null);
  const [isChatavailable, setIsChatAvailable] = useState(false);
  const [isSecond, setIsSecond] = useState(false);
  const [isThird, setIsThird] = useState(false);
  const [isFourth, setIsFourth] = useState(false);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState(18);
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
  const configuration = new Configuration({
    // apiKey: VITE_OPENAI_API_KEY,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);

  const countryobj = countries.getNames("en", { select: "official" });
  const countryArr = Object.entries(countryobj).map(([key, value]) => {
    return {
      label: value,
      value: key
    };
  });

  const handleDateChange = (value) => {
    setTimeout(() => {
      setAge(value);
      setIsThird(true);
    }, 1000);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e);
  };

  const handleProblemChange = (e) => {
    setProblem(e.target.value);
  };

  const handleFullNameKeyDown = (e) => {
    if (e.key == "Enter" && fullName != "") {
      setTimeout(() => {
        setIsSecond(true);
      }, 1000);
    }
  };

  const generateSuggestions = async () => {
    setIsChatAvailable(true);
    const prompt = `The user is named ${fullName}, he is aged ${age}. He is from ${country}. He believes he is struggling with ${problem} condition. Generate the 7 suggested questions to help him.`;
    setIsloading(true);
    const prompt_data = [{ "role": "user", "content": prompt }];
    try {
      const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: prompt_data,
      });
      let list = [];
      list = result.data.choices[0].message.content.split("\n");
      setSuggestion(list);
    } catch (e) {
      notification.warning({ message: "Failed to generate AI answer" });
      console.log(e);
    }
    setIsloading(false);
  };

  const handleProblemKeyDown = (e) => {
    if (e.key == "Enter") {
      generateSuggestions();
    }
  };

  const generateAnswer = async (prompt) => {
    setIsloading(true);
    let prompt_data = messages;
    prompt_data.push({ "role": "user", "content": prompt });
    setMessages(prompt_data);

    try {
      const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: prompt_data,
      });
      let list = messages;
      list.push({ "role": "assistant", "content": result.data.choices[0].message.content })
      setMessages(list);
    } catch (e) {
      notification.warning({ message: "Failed to generate AI answer" });
      console.log(e);
    }
    setInput("");
    setIsloading(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key == "Enter") {
      generateAnswer(input);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleClickName = () => {
    if (fullName != "") {
      setTimeout(() => {
        setIsSecond(true);
      }, 1000);
    }
  };

  const handleClickAge = () => {
    setTimeout(() => {
      setIsThird(true);
    }, 1000);
  };

  const handleClickCountry = () => {
    if (country != "") {
      setTimeout(() => {
        setIsFourth(true);
      }, 1000);
    }
  };

  const handleClickProblem = () => {
    if (problem != "") {
      setTimeout(() => {
        generateSuggestions();
      }, 1000);
    }
  };

  return (
    <>
      <div ref={chatWindowRef} className="relative container mx-auto p-4 flex flex-col items-center">
        <div className='w-full flex my-3'>
          <Avatar src='img/doctor.jpeg' className='h-[50px] w-[38px] min-w-[38px] mr-3 sm:h-[80px] sm:w-[60px] sm:min-w-[60px] sm:mr-5' />
          <div className='flex flex-col mr-3 sm:mr-5 w-full'>
            <Typography variant="h5" className="font-normal my-1 text-[17px]">{initQuestions[0]}</Typography>
            <div className='w-full flex'>
              <Input
                label='Full Name'
                value={fullName}
                onKeyDown={handleFullNameKeyDown}
                onChange={handleFullNameChange}
                className="w-full"
              />
              <Button
                variant='outlined'
                className='mx-2 w-fit border-none p-0'
                onClick={handleClickName}
              >
                <Avatar src='img/enter.svg' className='w-[48px] sm:w-[45px] h-[30px] p-0 rounded-none' />
              </Button>
            </div>
          </div>
        </div>
        {
          isSecond && (
            <div className='w-full flex my-3'>
              <Avatar src='img/doctor.jpeg' className='h-[50px] w-[38px] min-w-[38px] mr-3 sm:h-[80px] sm:w-[60px] sm:min-w-[60px] sm:mr-5' />
              <div className='flex flex-col mr-3 sm:mr-5 w-full'>
                <Typography variant="h5" className="font-normal my-1 text-[17px]">{initQuestions[1]}</Typography>
                <div className='w-full flex'>
                  <InputNumber min={1} max={100} defaultValue={18} onChange={handleDateChange} className='min-w-[200px]' />
                  <Button
                    variant='outlined'
                    className='mx-2 w-fit border-none p-0'
                    onClick={handleClickAge}
                  >
                    <Avatar src='img/enter.svg' className='w-[40px] sm:w-[42px] h-[30px] p-0 rounded-none' />
                  </Button>
                </div>
              </div>
            </div>
          )
        }
        {
          isThird && (
            <div className='w-full flex my-3'>
              <Avatar src='img/doctor.jpeg' className='h-[50px] w-[38px] min-w-[38px] mr-3 sm:h-[80px] sm:w-[60px] sm:min-w-[60px] sm:mr-5' />
              <div className='flex flex-col mr-3 sm:mr-5 w-full'>
                <Typography variant="h5" className="font-normal my-1 text-[17px]">{initQuestions[2]}</Typography>
                <div className='w-full flex'>
                  <Select
                    label='Country'
                    value={country}
                    onChange={handleCountryChange}
                    className='w-full'
                  >
                    {
                      !!countryArr?.length && countryArr.map(({ label, value }) => {
                        return (
                          <Option key={value} value={label}>
                            {label}
                          </Option>
                        )
                      })
                    }
                  </Select>
                  <Button
                    variant='outlined'
                    className='mx-2 w-fit border-none p-0'
                    onClick={handleClickCountry}
                  >
                    <Avatar src='img/enter.svg' className='w-[48px] sm:w-[45px] h-[30px] p-0 rounded-none' />
                  </Button>
                </div>
              </div>
            </div>
          )
        }
        {
          isFourth && (
            <div className='w-full flex mt-3 mb-8'>
              <Avatar src='img/doctor.jpeg' className='h-[50px] w-[38px] min-w-[38px] mr-3 sm:h-[80px] sm:w-[60px] sm:min-w-[60px] sm:mr-5' />
              <div className='flex flex-col mr-3 sm:mr-5 w-full'>
                <Typography variant="h5" className="font-normal my-1 text-[17px]">{initQuestions[3]}</Typography>
                <div className='w-full flex'>
                  <Input
                    label='Problem'
                    value={problem}
                    onKeyDown={handleProblemKeyDown}
                    onChange={handleProblemChange}
                    className="w-full"
                  />
                  <Button
                    variant='outlined'
                    className='mx-2 w-fit border-none p-0'
                    onClick={handleClickProblem}
                  >
                    <Avatar src='img/enter.svg' className='w-[48px] sm:w-[45px] h-[30px] p-0 rounded-none' />
                  </Button>
                </div>
              </div>
            </div>
          )
        }
        {
          isChatavailable && messages && messages.map((item, idx) => {
            return (
              <div className='w-full flex mb-3' key={idx}>
                {
                  item.role == "assistant" && (
                    <div className='w-full mr-[50px] flex'>
                      <div className='h-full flex items-end'>
                        <Avatar src='img/doctor.jpeg' className='h-[50px] w-[38px] min-w-[38px] mr-3 sm:h-[80px] sm:w-[60px] sm:min-w-[60px] sm:mr-5' />
                      </div>
                      <div className='h-full flex items-center'>
                        <div className='flex flex-col w-fit h-fit rounded-3xl px-5 py-2 bg-[#8080806e]'>
                          <TypeWriter content={item.content} box_ref={chatWindowRef} speed={5} />
                        </div>
                      </div>
                    </div>
                  )
                }
                {
                  item.role == "user" && (
                    <div className='w-full flex justify-end pl-[100px]'>
                      <div className='w-fit bg-blue-500 text-[#ffffff] rounded-3xl px-5 py-2'>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content.includes('\n') ? item.content.replace(/\n/g, "<br />") : item.content }}
                          className="text-[17px] font-normal"
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
          isloading && (<MyLoader isloading={isloading} />)
        }
        {
          isChatavailable && (
            <div className='w-full flex relative my-3 '>
              <div className='w-full mx-3 sm:mx-5'>
                <Input
                  label='Type your message.'
                  value={input}
                  onKeyDown={handleInputKeyDown}
                  onChange={handleInputChange}
                />
              </div>
              <Button onClick={() => generateAnswer(input)} className='text-[20px] normal-case w-[100px] px-[20px] py-[5px] mx-3 sm:mx-5'>Send</Button>
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
                <Typography className="text-[17px] font-normal">
                  {item}
                </Typography>
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default Home;
