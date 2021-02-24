import React from 'react';

const Message = ({ children }) => {
    return (
        <div>
            <h3 className="text-center message">{children}</h3>
        </div>
    )
}

export default Message;
