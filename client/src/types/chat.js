/* eslint-disable no-unused-vars */
const ChatContext = {
    messages: [],
    setMessages: function (messages) {},
    isNewMessage: false,
    setIsNewMessage: function (isNewMessage) {},
    lastScrollHeight: 0,
    setLastScrollHeight: function (lastScrollHeight) {},
};

const ChatMessage = {
    id: "",
    message: "",
    username: "",
    timestamp: "",
};

export { ChatContext, ChatMessage };
