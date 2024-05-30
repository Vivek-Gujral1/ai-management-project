// components/Message.tsx

import React from 'react';
import { IMessage } from '@/types/ApiResponse';
import { message } from '@/app/custom-Hooks/SocketProvider';



const Message = ({ message , isOwner } : {message : IMessage | message , isOwner : boolean }) => {
  return (
    <div className={`mb-2 ${isOwner ? 'text-right' : 'text-left'}`}>
      <span
        className={`inline-block px-4 py-2 rounded-lg  ${
          isOwner ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'
        }`}
      >
        {message.content}
      </span>
    </div>
  );
};

export default Message;