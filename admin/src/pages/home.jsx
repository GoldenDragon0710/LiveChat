import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  List, ListItem, Card
} from "@material-tailwind/react";
import {
  notification,
} from "antd";

export function Home() {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    axios.get("https://18.212.49.246/api/get")
      .then((res) => {
        console.log(res);
        // setMessages(res.data);
      }).catch((err) => {
        notification.warning({ message: "Failed to get prompts." });
        console.log(err);
      });
  };

  return (
    <>
      <div className="relative container mx-auto p-4 flex flex-col items-center">
        <div className='w-full flex my-3'>
          <Card className="w-full">
            <List>
              {
                messages && messages.map((item, idx) => {
                  return (
                    <ListItem key={idx}>{item}</ListItem>
                  )
                })
              }
            </List>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
