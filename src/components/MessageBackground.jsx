import { useState, useEffect } from 'react';
import './MessageBackground.css';

const MessageBackground = ({ isVisible = true }) => {
  const [activeMessages, setActiveMessages] = useState([]);

  // Real messages from your chat data
  const messages = [
    // Love & sweet messages
    { text: "I LOVE YOU :))", sender: "her" },
    { text: "I LOVE YOUUU", sender: "me" },
    { text: "is oky i love you tons", sender: "me" },
    { text: "I love you forever and ever", sender: "her" },
    { text: "I love you too!! Goodnight miss you moree", sender: "me" },
    { text: "Morninggg I love youu", sender: "her" },
    { text: "I love you more", sender: "me" },
    { text: "Good morninggg I love you :3", sender: "her" },
    { text: "i love you 😘", sender: "me" },
    { text: "I love youuuu", sender: "her" },
    
    // Miss you messages
    { text: "I miss you <3", sender: "her" },
    { text: "i miss you", sender: "me" },
    { text: "i miss youup", sender: "me" },
    { text: "Missing you 😔", sender: "her" },
    { text: "I miss you 😔", sender: "her" },
    
    // Funny/casual messages  
    { text: "Oh wow mark finally replied too LOL", sender: "her" },
    { text: "LOL that's how they get you", sender: "her" },
    { text: "i got it lol", sender: "me" },
    { text: "just get both lol", sender: "me" },
    { text: "loll i had a feeling", sender: "me" },
    { text: "Thought you're coming here lol", sender: "her" },
    { text: "ye mb lol", sender: "me" },
    { text: "I was playing balatro lol", sender: "her" },
    { text: "haha mb", sender: "me" },
    { text: "lowkey i ate 2 yesterday without noticing LOL", sender: "me" },
    { text: "Ok good LOL", sender: "her" },
    { text: "We forgot to add the sauce to the recipe LOL", sender: "her" },
    { text: "work for olivia full time? LOL", sender: "me" },
    { text: "I probably don't even have a chance LOL", sender: "her" },
    
    // Emoji messages
    { text: "Oops I fell asleep 😝", sender: "her" },
    { text: "They're just medium rare 😀", sender: "her" },
    { text: "Nooo 😭😭", sender: "her" },
    { text: "Omg why is this class set up like a circle 😭😭", sender: "her" },
    { text: "LMao what why 😂😂", sender: "me" },
    { text: "lmaoo okayy 😭", sender: "me" },
    { text: "Man 😭😭", sender: "her" },
    { text: "Waaa nvm 😔", sender: "her" },
    { text: "my lola forgot 😭☠️", sender: "me" },
    { text: "i alr ate 😔", sender: "me" },
    { text: "LMAO this is true 😭", sender: "me" },
    { text: "oop i did not 😞", sender: "me" },
    
    // Cute/personal messages
    { text: "my bbb", sender: "me" },
    { text: "aww cute", sender: "me" },
    { text: "LOL it's beautiful :0", sender: "her" },
    { text: "You've been \"checking things\" for 3 days now haha", sender: "her" },
    { text: "I am tepted to stay up app night and make a website LOL", sender: "me" },
    { text: "it's productive but then you'll wake up late tomorrow lol", sender: "her" },
    
    // Chapuna messages
    { text: "chapuna fell asleep", sender: "me" },
    { text: "oh my chapuna", sender: "me" },
    { text: "hello my chapuna", sender: "her" },
    { text: "helloo chapuna", sender: "me" },
    { text: "such a chapuna", sender: "me" },
    { text: "yeahhh the little chapuna", sender: "me" },
    { text: "i funally got this chapuna to work", sender: "me" },
    { text: "\"\"\"Chapuna kanada\"\"\"", sender: "me" },
    { text: "we been working on this chapune for 5h 😀", sender: "me" },
    { text: "chapuna", sender: "me" },
    { text: "chapunaing", sender: "me" },
    
    // Random fun ones from the data
    { text: "poopy assignment imma just habd it in LMAO", sender: "me" },
    { text: "hes a business owner and i was pike asking him questions LOL", sender: "me" },
    { text: "I don't think there's clean underwear for me 😔", sender: "her" },
    { text: "I have to go to work today for a meeting btw", sender: "her" },
    { text: "At least you don't have to worry about it anymore", sender: "her" },
    { text: "yeah i think recording yourself is a really good way to reflect", sender: "me" }
  ];

  const getRandomPosition = () => ({
    x: Math.random() * 80 + 10, // 10% to 90% to avoid edges
    y: Math.random() * 80 + 10,
  });

  const createMessage = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const position = getRandomPosition();
    const id = Math.random().toString(36).substr(2, 9);
    
    return {
      id,
      text: randomMessage.text,
      sender: randomMessage.sender,
      x: position.x,
      y: position.y,
      opacity: 0,
      created: Date.now()
    };
  };

  useEffect(() => {
    if (!isVisible) {
      setActiveMessages([]);
      return;
    }

    // Start with fewer messages
    const initialMessages = Array.from({ length: 3 }, createMessage);
    setActiveMessages(initialMessages);

    // Animate initial messages in
    setTimeout(() => {
      setActiveMessages(current =>
        current.map(msg => ({ ...msg, opacity: 1 }))
      );
    }, 300);

    // Add new messages periodically
    const addInterval = setInterval(() => {
      setActiveMessages(current => {
        // Keep max 7 messages at once
        if (current.length >= 7) {
          return current;
        }
        
        const newMessage = createMessage();
        const updated = [...current, newMessage];
        
        // Animate new message in after a short delay
        setTimeout(() => {
          setActiveMessages(curr =>
            curr.map(msg =>
              msg.id === newMessage.id ? { ...msg, opacity: 1 } : msg
            )
          );
        }, 200);
        
        return updated;
      });
    }, 2500);

    // Remove old messages
    const removeInterval = setInterval(() => {
      setActiveMessages(current => {
        const now = Date.now();
        return current.filter(msg => {
          const age = now - msg.created;
          if (age > 6000) { // Remove after 6 seconds
            return false;
          }
          if (age > 5000) { // Start fading at 5 seconds
            msg.opacity = 0;
          }
          return true;
        });
      });
    }, 500);

    return () => {
      clearInterval(addInterval);
      clearInterval(removeInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="message-background">
      {activeMessages.map((message) => (
        <div
          key={message.id}
          className={`floating-message floating-message--${message.sender}`}
          style={{
            left: `${message.x}%`,
            top: `${message.y}%`,
            opacity: message.opacity,
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default MessageBackground;