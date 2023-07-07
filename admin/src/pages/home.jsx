import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  List,
  notification,
} from "antd";

export function Home() {
  const [messages, setMessages] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    axios.get("https://18.208.152.144/api/get")
      .then((res) => {
        console.log(res);
        // setMessages(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="relative mx-auto p-4 flex items-center">
        <div className='w-full flex my-3'>
          <List
            bordered
            dataSource={messages}
            className='w-full h-full'
            renderItem={(item) => 
              <List.Item
                className='text-left hover:cursor-pointer hover:bg-blue-gray-300' 
                value={item}
              >
                {item}
              </List.Item>}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
