import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const chatbotFlow = {
  WELCOME: {
    messages: [
      "היי! אני העוזר הדיגיטלי של יונתן. אני כאן כדי לעזור לך לגלות איך אוטומציה יכולה לשחרר לך זמן בעסק ולהקל עליך את החיים.",
      "כדי שיונתן יוכל להבין הכי טוב איך לעזור לך ואיך בדיוק אוטומציה יכולה להשתלב אצלך, יש לי כמה שאלות קצרות. זה ייקח רק כמה דקות :)"
    ],
    options: [
      { text: "בטח, בוא נתחיל!", nextBlock: "STEP_2_BUSINESS" },
      { text: "מה זה אוטומציה?", nextBlock: "EXPLAIN_AUTOMATION" },
      { text: "לא עכשיו, אולי אחר כך", nextBlock: "EXIT" }
    ]
  },
  EXPLAIN_AUTOMATION: {
    messages: [
      "בגדול, אוטומציה זה לגרום למחשב (או לתוכנות שאתה משתמש בהן) לעשות בשבילך פעולות שחוזרות על עצמן באופן אוטומטי. כמו שיש לך עוזר שעושה משימות שגרתיות, רק שהוא דיגיטלי, מהיר ומדויק :)"
    ],
    options: [
      { text: "בטח, בוא נתחיל!", nextBlock: "STEP_2_BUSINESS" },
      { text: "לא עכשיו, אולי אחר כך", nextBlock: "EXIT" }
    ]
  },
  EXIT: {
    messages: [
      "בסדר גמור. אם תרצה לחזור ולשוחח איתי מאוחר יותר, אני כאן. בהצלחה עם העסק!"
    ]
  },
  STEP_2_BUSINESS: {
    messages: [
      "מעולה! קודם כל, ספר לי בקצרה על העסק שלך. באיזה תחום אתה עוסק ומה אתה מציע ללקוחות?"
    ],
    input: {
      type: "text",
      variable: "business_description",
      nextBlock: "STEP_2_EMPLOYEES"
    }
  },
  STEP_2_EMPLOYEES: {
    messages: [
      "תודה! וכמה אנשים עובדים בעסק (כולל אותך)? רק כדי לקבל מושג."
    ],
    options: [
      { text: "אני לבד", value: "אני לבד", nextBlock: "STEP_3_PAIN" },
      { text: "2-5 אנשים", value: "2-5", nextBlock: "STEP_3_PAIN" },
      { text: "6-15 אנשים", value: "6-15", nextBlock: "STEP_3_PAIN" },
      { text: "יותר מ-15 אנשים", value: "15+", nextBlock: "STEP_3_PAIN" }
    ]
  },
  STEP_3_PAIN: {
    messages: [
      "מהו הדבר שגוזל לך הכי הרבה זמן או שגורם לך הכי הרבה כאב ראש בעסק היום?"
    ],
    input: {
      type: "text",
      variable: "main_pain",
      nextBlock: "STEP_4_TASKS"
    }
  },
  STEP_4_TASKS: {
    messages: [
      "אתה משתמש בתוכנות כלשהן היום? לדוגמה: תוכנה להוצאת חשבוניות, CRM, יומן גוגל וכד׳."
    ],
    input: {
      type: "text",
      variable: "current_tools",
      nextBlock: "STEP_5_TOOLS"
    }
  },
  STEP_5_TOOLS: {
  messages: [
    "איפה אתה מרגיש שאתה מבזבז הכי הרבה זמן על משימות שחוזרות על עצמן? (אפשר לפרט בפורמט חופשי)"
  ],
  input: {
    type: "text",
    variable: "task_areas",
    nextBlock: "STEP_5_VOLUME"
  }
},
  STEP_5_VOLUME: {
    messages: [
      "כמה אירועים כאלה קורים בחודש? תן הערכה גסה."
    ],
    options: [
      { text: "פחות מ-10", value: "Less than 10", nextBlock: "STEP_6_RESULTS" },
      { text: "10-50", value: "10-50", nextBlock: "STEP_6_RESULTS" },
      { text: "50-100", value: "50-100", nextBlock: "STEP_6_RESULTS" },
      { text: "יותר מ-100", value: "More than 100", nextBlock: "STEP_6_RESULTS" }
    ]
  },
  STEP_6_RESULTS: {
    messages: [
      "מה הדבר הכי חשוב שהחיסכון בזמן יאפשר לך לעשות? מה החלום שלך כשהעסק ירוץ חלק יותר?"
    ],
    input: {
      type: "text",
      variable: "desired_outcome",
      nextBlock: "STEP_7_CONTACT"
    }
  },
  STEP_7_CONTACT: {
    messages: [
      "מצוין! מה השם המלא שלך?"
    ],
    input: {
      type: "text",
      variable: "full_name",
      validation: {
        pattern: "^[\\u0590-\\u05FF\\s]{2,50}$|^[a-zA-Z\\s]{2,50}$",
        errorMessage: "נא להזין שם מלא תקין (2-50 תווים)"
      },
      nextBlock: "STEP_7_PHONE"
    }
  },
  STEP_7_PHONE: {
    messages: [
      "מה מספר הטלפון שלך?"
    ],
    input: {
      type: "text",
      variable: "phone",
      validation: {
        pattern: "^0[2-9]\\d{7,8}$",
        errorMessage: "נא להזין מספר טלפון ישראלי תקין (לדוגמה: 0501234567)"
      },
      nextBlock: "STEP_7_SUMMARY"
    }
  },
  STEP_7_SUMMARY: {
    messages: [
      "האם תרצה לקבל סיכום של השיחה לכתובת האימייל שלך?"
    ],
    options: [
      { text: "כן, אשמח לקבל סיכום", value: "Yes", nextBlock: "STEP_7_EMAIL" },
      { text: "לא, תודה", value: "No", nextBlock: "STEP_7_FINAL" }
    ]
  },
  STEP_7_EMAIL: {
    messages: [
      "ומה כתובת האימייל שלך?"
    ],
    input: {
      type: "text",
      variable: "email",
      validation: {
        pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
        errorMessage: "נא להזין כתובת אימייל תקינה"
      },
      nextBlock: "STEP_7_FINAL"
    }
  },
  STEP_7_FINAL: {
    messages: [
      "יש עוד משהו שתרצה להוסיף?"
    ],
    input: {
      type: "text",
      variable: "final_note",
      nextBlock: "STEP_7_END"
    }
  },
  STEP_7_END: {
    messages: [
      "תודה רבה על הזמן והמידע! יונתן יעבור על הפרטים שלך ויחזור אליך בהקדם האפשרי כדי לדבר על איך אוטומציה יכולה לעזור לעסק שלך לצמוח ולחסוך לך זמן.",
      "בינתיים, אתה מוזמן לקרוא עוד תוכן מעניין בבלוג שלנו או להתנסות בכלים החינמיים שלנו באתר."
    ]
  }
};

const MessageBubble = ({ message, isBot, delay = 0, onAnimationComplete }) => {
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      if (isBot) {
        let i = 0;
        const speed = 15;
        const typeWriter = setInterval(() => {
          if (i < message.length) {
            setDisplayedText(message.substring(0, i + 1));
            i++;
          } else {
            clearInterval(typeWriter);
            setTyping(false);
          }
        }, speed);
        return () => clearInterval(typeWriter);
      } else {
        setDisplayedText(message);
        setTyping(false);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [message, isBot, delay]);
  
  if (!visible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={onAnimationComplete}
      className={`max-w-[80%] rounded-lg py-2 px-4 mb-3 flex-shrink-0 ${
        isBot
          ? 'bg-white text-gray-800 self-start'
          : 'bg-[#1E5FA8] text-white self-end'
      }`}
    >
      <div>
        {isBot && typing ? displayedText + '|' : displayedText}
        {isBot && typing && <span className="animate-pulse">|</span>}
      </div>
    </motion.div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.string.isRequired,
  isBot: PropTypes.bool.isRequired,
  delay: PropTypes.number,
  onAnimationComplete: PropTypes.func
};

MessageBubble.defaultProps = {
  delay: 0,
  onAnimationComplete: () => {}
};

export default function Chatbot({ isOpen, onClose }) {
  const [currentBlock, setCurrentBlock] = useState('WELCOME');
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [webhookSent, setWebhookSent] = useState(false);

  const currentBlockInfo = chatbotFlow[currentBlock];
  const hasOptions = currentBlockInfo && currentBlockInfo.options;
  const hasInput = currentBlockInfo && currentBlockInfo.input;
  const isEndBlock = currentBlock === 'STEP_7_END' || currentBlock === 'EXIT';

  const sendToMakeWebhook = async () => {
    try {
      console.log('מתחיל שליחה ל-Webhook...');
      setLoading(true);
      const webhookUrl = 'https://automatzyoni.app.n8n.cloud/webhook/3af81add-7eb6-45f3-98c3-c82b0ed6a5a1';
      
      const payload = {
        name: responses.full_name || 'לא צוין',
        phone: responses.phone || 'לא צוין',
        email: responses.email || 'לא צוין',
        business_description: responses.business_description || 'לא צוין',
        employees: responses.STEP_2_EMPLOYEES || 'לא צוין',
        main_pain: responses.main_pain || 'לא צוין',
        task_areas: responses.task_areas || 'לא צוין',
        current_tools: responses.current_tools || 'לא צוין',
        volume: responses.STEP_5_VOLUME || 'לא צוין',
        desired_outcome: responses.desired_outcome || 'לא צוין',
        want_summary: responses.STEP_7_SUMMARY || 'לא',
        final_note: responses.final_note || '',
        full_conversation: JSON.stringify(conversation)
      };
      
      console.log('נתונים שנשלחים:', payload);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      console.log('תגובה מה-Webhook:', response);
      
      if (response.ok) {
        console.log('נתוני השיחה נשלחו בהצלחה ל-Webhook');
        setWebhookSent(true);
      } else {
        console.log('שגיאה בשליחה:', await response.text());
        sendWithXMLHttpRequest(webhookUrl, payload);
      }
    } catch (error) {
      console.error('שגיאה בשליחת נתוני השיחה:', error);
      sendWithXMLHttpRequest('https://automatzyoni.app.n8n.cloud/webhook/3af81add-7eb6-45f3-98c3-c82b0ed6a5a1', {
        data: JSON.stringify(responses),
        conversation: JSON.stringify(conversation)
      });
    } finally {
      setLoading(false);
    }
  };
  
  const sendWithXMLHttpRequest = (url, data) => {
    console.log('מנסה לשלוח עם XMLHttpRequest...');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        console.log('תגובה מ-XMLHttpRequest:', xhr.status, xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log('שליחה הצליחה!');
          setWebhookSent(true);
        }
      }
    };
    xhr.send(JSON.stringify(data));
  };

  const scrollToBottom = (force = false) => {
    const el = chatContainerRef.current;
    if (!el) return;
    if (force || !isUserScrolledUp) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const el = chatContainerRef.current;
    if (!el) return;
    const threshold = 50;
    const position = el.scrollTop + el.clientHeight;
    setIsUserScrolledUp(el.scrollHeight - position > threshold);
  };

  const resetChat = () => {
    setCurrentBlock('WELCOME');
    setConversation([]);
    setUserInput('');
    setResponses({});
    setError(null);
    setWebhookSent(false);
  };

  const handleClose = () => {
    resetChat();
    onClose();
  };

  useEffect(() => {
    if (isOpen && chatbotFlow[currentBlock]) {
      const messages = chatbotFlow[currentBlock].messages;
      messages.forEach((msg, idx) => {
        setTimeout(() => {
          setConversation(prev => [...prev, { text: msg, isBot: true }]);
        }, idx * 800);
      });
      
      if (currentBlock === 'STEP_7_END' && !webhookSent) {
        console.log('הגענו לסוף השיחה, שולחים נתונים ל-Webhook...');
        setTimeout(() => {
          sendToMakeWebhook();
        }, messages.length * 800 + 500);
      }
    }
  }, [currentBlock, isOpen, webhookSent]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation, hasOptions, hasInput]);

  // Auto-grow textarea on input change
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
      scrollToBottom();
    }
  }, [userInput]);

  const handleOptionSelect = (option) => {
    setConversation(prev => [...prev, { text: option.text, isBot: false }]);
    if (option.value) {
      setResponses(prev => ({ ...prev, [currentBlock]: option.value }));
    }
    setError(null);
    setTimeout(() => setCurrentBlock(option.nextBlock), 500);
  };

  const validateInput = (input, validation) => {
    if (!validation) return true;
    const regex = new RegExp(validation.pattern);
    return regex.test(input);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const blockInfo = chatbotFlow[currentBlock];
    if (blockInfo.input?.validation) {
      const valid = validateInput(userInput, blockInfo.input.validation);
      if (!valid) {
        setError(blockInfo.input.validation.errorMessage);
        return;
      }
    }
    setConversation(prev => [...prev, { text: userInput, isBot: false }]);
    setResponses(prev => ({ ...prev, [blockInfo.input.variable]: userInput }));
    setUserInput('');
    setError(null);
    setTimeout(() => setCurrentBlock(blockInfo.input.nextBlock), 500);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="chat-container bg-gray-100 rounded-xl shadow-2xl w-full max-w-md h-[80vh] flex flex-col overflow-hidden"
      >
        {/* Chat Header */}
        <header className="chat-header bg-[#1E5FA8] text-white p-4 flex justify-between items-center flex-shrink-0">
          <h3 className="font-bold text-lg">העוזר האוטומטי של יונתן</h3>
          <button onClick={handleClose} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </header>

        {/* Chat Body */}
        <section
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="chat-body flex-1 overflow-y-auto p-4 flex flex-col pb-36"
        >
          <AnimatePresence>
            {conversation.map((msg, idx) => (
              <MessageBubble
                key={idx}
                message={msg.text}
                isBot={msg.isBot}
                onAnimationComplete={scrollToBottom}
              />
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white self-start rounded-lg py-2 px-4 mb-3 flex-shrink-0"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.div>
          )}
        </section>

        {/* Chat Input */}
        <footer className="chat-input flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          {hasOptions && (
            <div className="grid grid-cols-1 gap-2">
              {currentBlockInfo.options.map((opt, i) => (
                <Button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className="w-full justify-start bg-gray-100 hover:bg-gray-200 text-gray-800"
                  variant="outline"
                >
                  {opt.text}
                </Button>
              ))}
            </div>
          )}

          {hasInput && (
            <form onSubmit={handleInputSubmit} className="space-y-2">
              <div className="flex gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  placeholder="הקלד את תשובתך כאן..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E5FA8] resize-none overflow-y-auto min-h-8 max-h-32"
                  disabled={loading}
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={loading || !userInput.trim()}
                  className="bg-[#1E5FA8] flex-shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {error}
                </motion.div>
              )}
            </form>
          )}

          {isEndBlock && (
            <Button onClick={handleClose} className="w-full mt-2 bg-[#1E5FA8]">
              סגור
            </Button>
          )}
        </footer>
      </motion.div>
    </motion.div>
  );
}

Chatbot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};