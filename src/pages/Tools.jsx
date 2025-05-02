import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useChatbot } from "@/context/ChatbotContext";
import { 
  Clock, 
  Calendar, 
  Mail, 
  Settings, 
  LineChart, 
  BarChart2, 
  ArrowLeft,
  Calculator,
  Search,
  CheckCircle2,
  XCircle,
  Zap,
  FileText,
  DollarSign,
  Users,
  Hand,
  RefreshCw,
  ChevronRight
} from "lucide-react";

export default function Tools() {
  const { openChat } = useChatbot();
  const [activeTab, setActiveTab] = useState("automation-checker");
  
  const [automationScore, setAutomationScore] = useState(null);
  const [questions, setQuestions] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
  });
  
  const [timeSaved, setTimeSaved] = useState({
    adminHours: 10,
    repetitiveHours: 5,
    communicationHours: 7,
    hourlyRate: 100
  });
  
  const calculateAutomationScore = () => {
    const answers = Object.values(questions).filter(v => v !== null);
    if (answers.length !== 5) return;
    
    const sum = answers.reduce((acc, val) => acc + val, 0);
    const score = Math.floor((sum / 25) * 100); // 25 is max possible score (5 * 5)
    setAutomationScore(score);
  };
  
  const calculateTimeSavings = () => {
    const { adminHours, repetitiveHours, communicationHours, hourlyRate } = timeSaved;
    
    const adminCost = adminHours * hourlyRate * 4.3; // Weekly to monthly
    const repetitiveCost = repetitiveHours * hourlyRate * 4.3;
    const communicationCost = communicationHours * hourlyRate * 4.3;
    
    const totalHours = (adminHours + repetitiveHours + communicationHours) * 4.3;
    const totalCost = adminCost + repetitiveCost + communicationCost;
    
    return {
      hours: totalHours.toFixed(1),
      cost: totalCost.toFixed(0),
      yearly: (totalCost * 12).toFixed(0)
    };
  };
  
  // Custom styles for RTL support
  useEffect(() => {
    // Add custom styles to improve RTL support
    const style = document.createElement('style');
    style.textContent = `
      .rtl-slider-container {
        position: relative;
        padding: 1rem 0;
      }
      
      .rtl-slider-hint {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.8rem;
        color: #666;
        align-items: center;
      }
      
      .rtl-slider-hint svg {
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.7; }
      }
      
      .rtl-radio-option {
        transition: all 0.2s ease;
        border: 1px solid #e5e7eb;
        border-radius: 1rem;
        padding: 1rem;
        margin-bottom: 0.5rem;
      }
      
      .rtl-radio-option:has(input:checked) {
        border-color: #1E5FA8 !important;
        background-color: rgba(30, 95, 168, 0.05);
        box-shadow: 0 2px 8px rgba(30, 95, 168, 0.1);
        transform: translateX(-4px);
      }
      
      .rtl-card-highlight {
        border-right: 4px solid #1E5FA8;
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      .rtl-card-highlight:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(30, 95, 168, 0.15) !important;
      }
      
      .rtl-icon-container {
        transition: transform 0.3s ease;
      }
      
      .rtl-card-highlight:hover .rtl-icon-container {
        transform: scale(1.1);
      }
      
      .rtl-action-btn {
        background: linear-gradient(45deg, #1E5FA8, #2c75d8);
        transition: all 0.3s ease;
        border-radius: 9999px;
        padding: 1rem 2rem;
        font-weight: 600;
      }
      
      .rtl-action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(30, 95, 168, 0.3);
      }
      
      .rtl-action-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }
      
      .rtl-tab-content {
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .rtl-progress-container {
        position: relative;
        height: 2rem;
        background-color: #f3f4f6;
        border-radius: 9999px;
        overflow: hidden;
      }
      
      .rtl-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background: linear-gradient(90deg, #1E5FA8, #2c75d8);
        transition: width 0.5s ease;
        border-radius: 9999px;
      }
      
      .rtl-progress-text {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        color: white;
        font-weight: bold;
        z-index: 1;
      }
      
      .rtl-result-card {
        background: linear-gradient(135deg, #1E5FA8, #0D3E75);
        color: white;
        border-radius: 1.5rem;
        padding: 2rem;
        box-shadow: 0 10px 25px rgba(30, 95, 168, 0.2);
      }
      
      .rtl-result-card-inner {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
        border-radius: 1rem;
        padding: 1.5rem;
        margin-bottom: 1rem;
      }
      
      .rtl-bottleneck-card {
        border-right: 4px solid;
        transition: all 0.3s ease;
      }
      
      .rtl-bottleneck-card:hover {
        transform: translateX(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      @media (max-width: 768px) {
        .rtl-card-highlight {
          margin: 0 -1rem;
          border-radius: 0;
        }
        
        .rtl-action-btn {
          width: 100%;
          justify-content: center;
        }
        
        .rtl-result-card {
          margin: 0 -1rem;
          border-radius: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            כלים חינמיים לאוטומציה עסקית
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
            השתמשו בכלים החינמיים שלנו כדי להעריך את רמת האוטומציה בעסק שלכם ולגלות את פוטנציאל החיסכון
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full space-y-8"
          orientation="horizontal"
          dir="rtl"
        >
          <div className="flex justify-center w-full">
            <TabsList className="flex flex-row min-w-[250px] gap-2" aria-label="כלי אוטומציה">
              <TabsTrigger value="automation-checker" className="w-full text-md p-3 flex justify-center items-center gap-2 data-[state=active]:bg-[#1E5FA8] data-[state=active]:text-white">
                <Calculator className="w-5 h-5" aria-hidden="true" />
                <span className="text-xs lg:text-lg">בודק אוטומציה</span>
              </TabsTrigger>
              <TabsTrigger value="time-calculator" className="w-full text-md p-3 flex justify-center items-center gap-2 data-[state=active]:bg-[#1E5FA8] data-[state=active]:text-white">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span className="text-xs lg:text-lg">מחשבון חיסכון בזמן</span>
              </TabsTrigger>
              <TabsTrigger value="bottlenecks" className="w-full text-md p-3 flex justify-center items-center gap-2 data-[state=active]:bg-[#1E5FA8] data-[state=active]:text-white">
                <Search className="w-5 h-5" aria-hidden="true" />
                <span className="text-xs lg:text-lg">בוחן צווארי בקבוק</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Automation Checker Tab */}
          <TabsContent value="automation-checker" className="space-y-8 rtl-tab-content" role="tabpanel">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-md border-none rtl-card-highlight">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-l from-blue-50 to-transparent p-6">
                  <div className="flex items-center gap-4 justify-between">
                    <div className="bg-blue-100 p-4 rounded-xl rtl-icon-container">
                      <Calculator className="w-10 h-10 text-[#1E5FA8]" />
                    </div>
                    <div className="text-center flex-1">
                      <CardTitle className="text-2xl font-bold mb-2">בדיקת רמת האוטומציה בעסק שלך</CardTitle>
                      <CardDescription className="text-lg">
                        ענה על 5 שאלות פשוטות כדי לקבל הערכה של רמת האוטומציה בעסק שלך
                      </CardDescription>
                    </div>
                    <div className="w-[40px]"></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                  {automationScore === null ? (
                    <div className="space-y-8">
                      {[
                        {
                          number: 1,
                          question: "כמה פעולות חוזרות ושגרתיות בעסק שלך מבוצעות באופן אוטומטי?",
                          options: [
                            { id: "q1-1", value: "1", label: "כמעט כלום לא אוטומטי" },
                            { id: "q1-2", value: "2", label: "מעט מאוד אוטומציה" },
                            { id: "q1-3", value: "3", label: "חלק מהדברים אוטומטיים" },
                            { id: "q1-4", value: "4", label: "הרבה אוטומציה" },
                            { id: "q1-5", value: "5", label: "כמעט הכל אוטומטי" }
                          ]
                        },
                        {
                          number: 2,
                          question: "איך אתה מנהל את התקשורת עם לקוחות (תזכורות, מעקב, עדכונים)?",
                          options: [
                            { id: "q2-1", value: "1", label: "הכל ידני", icon: <Mail className="w-5 h-5 text-gray-400" /> },
                            { id: "q2-2", value: "2", label: "בעיקר ידני עם מעט כלים", icon: <Mail className="w-5 h-5 text-gray-400" /> },
                            { id: "q2-3", value: "3", label: "שילוב של ידני ואוטומטי", icon: <Mail className="w-5 h-5 text-blue-400" /> },
                            { id: "q2-4", value: "4", label: "בעיקר אוטומטי", icon: <Mail className="w-5 h-5 text-blue-500" /> },
                            { id: "q2-5", value: "5", label: "מערכת מלאה של אוטומציית תקשורת", icon: <Mail className="w-5 h-5 text-green-500" /> }
                          ]
                        },
                        {
                          number: 3,
                          question: "כיצד אתה מנהל ניירת ומסמכים (חשבוניות, הצעות מחיר, הסכמים)?",
                          options: [
                            { id: "q3-1", value: "1", label: "הכל מודפס/ידני", icon: <FileText className="w-5 h-5 text-gray-400" /> },
                            { id: "q3-2", value: "2", label: "בעיקר ידני עם מעט דיגיטלי", icon: <FileText className="w-5 h-5 text-gray-400" /> },
                            { id: "q3-3", value: "3", label: "מערכות דיגיטליות אבל לא מחוברות", icon: <FileText className="w-5 h-5 text-blue-400" /> },
                            { id: "q3-4", value: "4", label: "מערכות דיגיטליות עם חיבור חלקי", icon: <FileText className="w-5 h-5 text-blue-500" /> },
                            { id: "q3-5", value: "5", label: "מערכת דיגיטלית מלאה ומשולבת", icon: <FileText className="w-5 h-5 text-green-500" /> }
                          ]
                        },
                        {
                          number: 4,
                          question: "האם המערכות השונות בעסק שלך מתקשרות אחת עם השנייה?",
                          options: [
                            { id: "q4-1", value: "1", label: "אין חיבור בין מערכות", icon: <Settings className="w-5 h-5 text-gray-400" /> },
                            { id: "q4-2", value: "2", label: "חיבור מינימלי ידני", icon: <Settings className="w-5 h-5 text-gray-400" /> },
                            { id: "q4-3", value: "3", label: "חלק מהמערכות מחוברות", icon: <Settings className="w-5 h-5 text-blue-400" /> },
                            { id: "q4-4", value: "4", label: "רוב המערכות מחוברות", icon: <Settings className="w-5 h-5 text-blue-500" /> },
                            { id: "q4-5", value: "5", label: "אינטגרציה מלאה בין כל המערכות", icon: <Settings className="w-5 h-5 text-green-500" /> }
                          ]
                        },
                        {
                          number: 5,
                          question: "כמה זמן אתה משקיע במשימות שחוזרות על עצמן ושיכולות להיות אוטומטיות?",
                          options: [
                            { id: "q5-1", value: "5", label: "כמעט לא משקיע זמן", icon: <Clock className="w-5 h-5 text-green-500" /> },
                            { id: "q5-2", value: "4", label: "מעט מאוד זמן", icon: <Clock className="w-5 h-5 text-blue-500" /> },
                            { id: "q5-3", value: "3", label: "זמן בינוני", icon: <Clock className="w-5 h-5 text-blue-400" /> },
                            { id: "q5-4", value: "2", label: "הרבה זמן", icon: <Clock className="w-5 h-5 text-orange-400" /> },
                            { id: "q5-5", value: "1", label: "רוב הזמן שלי", icon: <Clock className="w-5 h-5 text-red-500" /> }
                          ]
                        }
                      ].map((q, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 rtl-card-highlight" dir="rtl">
                          <h3 className="text-xl font-semibold flex items-center mb-6 text-right">
                            <span className="flex items-center justify-center bg-[#1E5FA8] text-white rounded-full w-8 h-8 text-lg ml-3">{q.number}</span>
                            {q.question}
                          </h3>
                          <RadioGroup 
                            onValueChange={(v) => setQuestions({...questions, [`q${q.number}`]: parseInt(v)})}
                            value={questions[`q${q.number}`]?.toString()}
                            className="space-y-3"
                          >
                            {q.options.map(option => (
                              <div key={option.id} className="rtl-radio-option">
                                <div className="flex items-center">
                                  <RadioGroupItem id={option.id} value={option.value} className="ml-3" />
                                  <Label htmlFor={option.id} className="cursor-pointer flex-1 text-lg">
                                    {option.label}
                                  </Label>
                                  {option.value === "1" && questions[`q${q.number}`] === 1 && <XCircle className="w-5 h-5 text-red-500" />}
                                  {option.value === "5" && questions[`q${q.number}`] === 5 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-8 text-center" id="automation-score-result">
                      <h3 className="text-3xl font-bold mb-8">
                        רמת האוטומציה בעסק שלך:
                      </h3>
                      
                      <div className="w-full max-w-md mx-auto space-y-6">
                        <div className="rtl-progress-container">
                          <div 
                            className="rtl-progress-bar"
                            style={{ width: `${Math.max(automationScore, 20)}%` }}
                          />
                          <div className="rtl-progress-text">
                            {automationScore}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="rtl-result-card">
                        {automationScore < 30 ? (
                          <div className="space-y-6">
                            <div className="flex justify-center">
                              <div className="bg-red-100/20 rounded-full p-6">
                                <XCircle className="w-16 h-16 text-red-400" />
                              </div>
                            </div>
                            <h4 className="text-2xl font-bold text-red-200">
                              רמת אוטומציה נמוכה
                            </h4>
                            <div className="rtl-result-card-inner">
                              <p className="text-lg text-blue-100">
                                נראה שהעסק שלך עדיין עובד בעיקר באופן ידני. יש פוטנציאל עצום לחסוך זמן ומשאבים על ידי אוטומציה של תהליכים בסיסיים.
                              </p>
                              <p className="text-lg text-blue-100 mt-4">
                                התחלה טובה תהיה לאטמץ את התקשורת עם לקוחות וניהול המסמכים, שם הרווח המיידי יהיה הגדול ביותר.
                              </p>
                            </div>
                          </div>
                        ) : automationScore < 70 ? (
                          <div className="space-y-6">
                            <div className="flex justify-center">
                              <div className="bg-amber-100/20 rounded-full p-6">
                                <Settings className="w-16 h-16 text-amber-400 animate-spin-slow" />
                              </div>
                            </div>
                            <h4 className="text-2xl font-bold text-amber-200">
                              רמת אוטומציה בינונית
                            </h4>
                            <div className="rtl-result-card-inner">
                              <p className="text-lg text-blue-100">
                                התחלת בתהליך האוטומציה אבל יש עוד מקום לשיפור. כדאי להתמקד בחיבור בין המערכות השונות ואוטומציה של תהליכים נוספים.
                              </p>
                              <p className="text-lg text-blue-100 mt-4">
                                השלב הבא יהיה ליצור אינטגרציה בין המערכות השונות כדי למנוע עבודה כפולה והזנת נתונים ידנית מרובה.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="flex justify-center">
                              <div className="bg-green-100/20 rounded-full p-6">
                                <CheckCircle2 className="w-16 h-16 text-green-400" />
                              </div>
                            </div>
                            <h4 className="text-2xl font-bold text-green-200">
                              רמת אוטומציה גבוהה
                            </h4>
                            <div className="rtl-result-card-inner">
                              <p className="text-lg text-blue-100">
                                כל הכבוד! העסק שלך כבר מאוטומט ברמה גבוהה. כדאי לבחון אפשרויות לאופטימיזציה של המערכות הקיימות ושיפור נוסף.
                              </p>
                              <p className="text-lg text-blue-100 mt-4">
                                בשלב זה, כדאי לחשוב על אוטומציה מתקדמת יותר עם בינה מלאכותית וניתוח נתונים שיאפשרו לך לקבל תובנות עסקיות עמוקות יותר.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-100 p-6">
                  {automationScore === null ? (
                    <Button 
                      className="rtl-action-btn text-white text-lg"
                      onClick={() => {
                        calculateAutomationScore();
                        setTimeout(() => {
                          document.getElementById('automation-score-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }}
                      disabled={Object.values(questions).some(v => v === null)}
                    >
                      <CheckCircle2 className="w-5 h-5 ml-2" />
                      בדוק את רמת האוטומציה
                    </Button>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setAutomationScore(null)}
                        className="flex items-center text-lg"
                      >
                        <RefreshCw className="w-4 h-4 ml-2" />
                        בדיקה מחדש
                      </Button>
                      <Button 
                        className="bg-[#FF9900] hover:bg-[#E68A00] text-white text-lg"
                        onClick={openChat}
                      >
                        <Zap className="w-4 h-4 ml-2" />
                        רוצה לשפר את הציון? בוא נדבר
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Time Calculator Tab */}
          <TabsContent value="time-calculator" className="space-y-8" role="tabpanel">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-md border-none rtl-card-highlight">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-l from-green-50 to-transparent p-6">
                  <div className="flex items-start gap-4 justify-between">
                    <div className="bg-green-100 p-4 rounded-xl rtl-icon-container">
                      <DollarSign className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="text-center flex-1">
                      <CardTitle className="text-2xl font-bold mb-2">מחשבון חיסכון בזמן ועלויות</CardTitle>
                      <CardDescription className="text-lg">
                        הזז את הסליידרים כדי לחשב כמה זמן וכסף אפשר לחסוך עם אוטומציה
                      </CardDescription>
                    </div>
                    <div className="w-[40px]"></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <Users className="text-[#1E5FA8] w-5 h-5 ml-2" />
                          ניהול אדמיניסטרטיבי
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label>שעות שבועיות בניהול אדמיניסטרטיבי</Label>
                              <span className="font-bold">{timeSaved.adminHours} שעות</span>
                            </div>
                            
                            <div className="rtl-slider-container">
                              <div className="rtl-slider-hint">
                                <div className="flex items-center">
                                  <Hand className="w-4 h-4 ml-1" />
                                  <span>גררו לבחירה</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                              
                              <Slider 
                                value={[timeSaved.adminHours]} 
                                min={0}
                                max={40} 
                                step={1}
                                onValueChange={(value) => setTimeSaved({...timeSaved, adminHours: value[0]})}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <RefreshCw className="text-[#1E5FA8] w-5 h-5 ml-2" />
                          משימות חוזרות
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label>שעות שבועיות במשימות חוזרות</Label>
                              <span className="font-bold">{timeSaved.repetitiveHours} שעות</span>
                            </div>
                            
                            <div className="rtl-slider-container">
                              <Slider 
                                value={[timeSaved.repetitiveHours]} 
                                min={0} 
                                max={30} 
                                step={1}
                                onValueChange={(value) => setTimeSaved({...timeSaved, repetitiveHours: value[0]})}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <Mail className="text-[#1E5FA8] w-5 h-5 ml-2" />
                          תקשורת ומעקב
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label>שעות שבועיות בתקשורת ומעקב</Label>
                              <span className="font-bold">{timeSaved.communicationHours} שעות</span>
                            </div>
                            
                            <div className="rtl-slider-container">
                              <Slider 
                                value={[timeSaved.communicationHours]} 
                                min={0} 
                                max={30} 
                                step={1}
                                onValueChange={(value) => setTimeSaved({...timeSaved, communicationHours: value[0]})}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <DollarSign className="text-[#1E5FA8] w-5 h-5 ml-2" />
                          עלות לשעת עבודה ממוצעת
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label>עלות לשעת עבודה ממוצעת (₪)</Label>
                              <span className="font-bold">₪{timeSaved.hourlyRate}</span>
                            </div>
                            
                            <div className="rtl-slider-container">
                              <Slider 
                                value={[timeSaved.hourlyRate]} 
                                min={1} 
                                max={1000} 
                                step={1}
                                onValueChange={(value) => setTimeSaved({...timeSaved, hourlyRate: value[0]})}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="bg-gradient-to-br from-[#1E5FA8] to-[#0D3E75] text-white p-8 rounded-xl text-center space-y-8 shadow-lg transform transition-transform hover:scale-105">
                        <h3 className="text-2xl font-bold">
                          פוטנציאל החיסכון החודשי שלך:
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center justify-center mb-2">
                              <Clock className="w-8 h-8 text-blue-200 ml-2" />
                              <p className="text-lg">זמן שניתן לחסוך:</p>
                            </div>
                            <p className="text-5xl font-bold">{calculateTimeSavings().hours} שעות</p>
                            <p className="text-sm text-blue-200 mt-2">בכל חודש</p>
                          </div>
                          
                          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center justify-center mb-2">
                              <DollarSign className="w-8 h-8 text-blue-200 ml-2" />
                              <p className="text-lg">חיסכון כספי פוטנציאלי:</p>
                            </div>
                            <p className="text-5xl font-bold">₪{calculateTimeSavings().cost}</p>
                            <p className="text-sm text-blue-200 mt-2">בכל חודש</p>
                          </div>
                          
                          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center justify-center mb-2">
                              <Calendar className="w-8 h-8 text-blue-200 ml-2" />
                              <p className="text-lg">חיסכון שנתי:</p>
                            </div>
                            <p className="text-5xl font-bold">₪{calculateTimeSavings().yearly}</p>
                            <p className="text-sm text-blue-200 mt-2">בשנה</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-blue-200 mt-8">
                              * מבוסס על אוטומציה של כ-70% מהפעולות החוזרות
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
                  <Button 
                    className="rtl-action-btn text-white px-8 py-6 text-lg rounded-full"
                    onClick={openChat}
                  >
                    <Zap className="w-5 h-5 ml-2" />
                    רוצה להתחיל לחסוך? בוא נדבר
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Bottlenecks Tab */}
          <TabsContent value="bottlenecks" className="space-y-8 rtl-tab-content" role="tabpanel">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-md border-none rtl-card-highlight">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-l from-purple-50 to-transparent p-6">
                  <div className="flex items-start gap-4 justify-between">
                    <div className="bg-purple-100 p-4 rounded-xl rtl-icon-container">
                      <Search className="w-10 h-10 text-purple-600" />
                    </div>
                    <div className="text-center flex-1">
                      <CardTitle className="text-2xl font-bold mb-2">בוחן צווארי בקבוק בעסק</CardTitle>
                      <CardDescription className="text-lg">
                        בדוק איפה נמצאים &quot;צווארי הבקבוק&quot; בעסק שלך שאפשר לשחרר באמצעות אוטומציה
                      </CardDescription>
                    </div>
                    <div className="w-[40px]"></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 pt-6" dir="rtl">
                  <div className="space-y-6 text-right">
                    {[
                      {
                        title: "ניהול יומן ופגישות",
                        icon: <Calendar className="w-10 h-10 text-[#1E5FA8]" />,
                        color: "blue",
                        symptoms: [
                          "משקיע זמן רב בתיאום ושינוי פגישות",
                          "לעתים שוכח פגישות או מאחר אליהן",
                          "מתקשה לעקוב אחרי מי אישר ומי ביטל",
                          "חווה חריגות בלוח הזמנים לעתים קרובות"
                        ],
                        solution: "מערכת שתאפשר ללקוחות לקבוע פגישות בעצמם, שתשלח תזכורות אוטומטיות ותעדכן את היומן באופן מסונכרן"
                      },
                      {
                        title: "ניהול מסמכים ותיוק",
                        icon: <FileText className="w-10 h-10 text-[#1E5FA8]" />,
                        color: "indigo",
                        symptoms: [
                          "מתקשה למצוא מסמכים חשובים",
                          "משקיע זמן רב ביצירת מסמכים חוזרים כמו חשבוניות והצעות מחיר",
                          "עובד עם גרסאות מרובות של אותו מסמך",
                          "שולח מסמכים ידנית שוב ושוב"
                        ],
                        solution: "מערכת שתארגן את כל המסמכים במקום אחד, תאפשר יצירה מהירה של מסמכים חוזרים ותשלח אותם אוטומטית"
                      },
                      {
                        title: "תקשורת עם לקוחות",
                        icon: <Mail className="w-10 h-10 text-[#1E5FA8]" />,
                        color: "green",
                        symptoms: [
                          "עונה שוב ושוב על אותן שאלות",
                          "שוכח לעתים להשיב למיילים חשובים",
                          "מתקשה לעקוב אחרי כל התכתובות",
                          "לא מספיק לשלוח עדכונים ומעקב ללקוחות בזמן"
                        ],
                        solution: "מערכת שתענה אוטומטית על שאלות נפוצות, תסמן מיילים חשובים, ותשלח עדכונים קבועים ללקוחות באופן אוטומטי"
                      },
                      {
                        title: "ניהול משימות ופרויקטים",
                        icon: <Settings className="w-10 h-10 text-[#1E5FA8]" />,
                        color: "orange",
                        symptoms: [
                          "משימות נופלות 'בין הכיסאות'",
                          "קשה לדעת באיזה שלב נמצא כל פרויקט",
                          "אין תמונה ברורה של עומס העבודה",
                          "מתקשה להקצות משאבים ביעילות"
                        ],
                        solution: "מערכת ניהול משימות חכמה שתתזכר אוטומטית, תציג סטטוס ויזואלי של כל פרויקט, ותאפשר הקצאת משאבים יעילה"
                      },
                      {
                        title: "ניתוח נתונים ודיווחים",
                        icon: <LineChart className="w-10 h-10 text-[#1E5FA8]" />,
                        color: "purple",
                        symptoms: [
                          "לא מצליח לנתח נתונים בזמן אמת",
                          "מבזבז זמן רב בהכנת דוחות ידניים",
                          "מתקשה לזהות מגמות ותובנות עסקיות",
                          "אין מדדים ברורים להצלחה"
                        ],
                        solution: "מערכת שתאסוף נתונים אוטומטית, תייצר דוחות אוטומטיים ותציג לך את המדדים החשובים בלחיצת כפתור"
                      },
                      {
                        title: "ניהול מלאי והזמנות",
                        icon: <BarChart2 className="w-10 h-10 text-[#1E5FA8]" />,
                        color: "emerald",
                        symptoms: [
                          "לפעמים נגמר המלאי בלי שהבחנת בכך",
                          "מבזבז זמן בספירת מלאי ומעקב",
                          "אין תחזית ברורה לצרכי מלאי עתידיים",
                          "תהליך ההזמנות מספקים מסורבל וידני"
                        ],
                        solution: "מערכת שתתריע אוטומטית על מלאי נמוך, תנבא צרכי מלאי עתידיים ותזמין אוטומטית מספקים לפי הגדרות מראש"
                      }
                    ].map((bottleneck, index) => (
                      <div 
                        key={index} 
                        className={`p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all rtl-card-highlight border-r-0 border-${bottleneck.color}-100 text-right`}
                        style={{ borderRight: `4px solid var(--${bottleneck.color}-100, #dbeafe)` }}
                        dir="rtl"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-start gap-4">
                            <div className={`bg-${bottleneck.color}-50 p-4 rounded-lg rtl-icon-container`} style={{ backgroundColor: `var(--${bottleneck.color}-50, #eff6ff)` }}>
                              {bottleneck.icon}
                            </div>
                            <h3 className="text-xl font-bold mt-2">
                              {bottleneck.title}
                            </h3>
                          </div>
                          <Button 
                            variant="outline"
                            className="text-[#1E5FA8] border-[#1E5FA8] hover:bg-blue-50"
                            onClick={() => {
                              const solutionElement = document.getElementById(`solution-${index}`);
                              if (solutionElement) {
                                solutionElement.style.display = solutionElement.style.display === 'none' ? 'block' : 'none';
                              }
                            }}
                          >
                            לפתרון
                            <ArrowLeft className="w-4 h-4 mr-2" />
                          </Button>
                        </div>
                        
                        <div className="space-y-6 mr-12">
                          <div>
                            <h4 className="font-semibold text-lg mb-3 border-r-2 border-blue-200 pr-2">סימנים שיש לך בעיה בתחום:</h4>
                            <ul className="space-y-2">
                              {bottleneck.symptoms.map((symptom, i) => (
                                <li key={i} className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-[#1E5FA8] rounded-full flex-shrink-0" />
                                  <span>{symptom}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                           
                          <div id={`solution-${index}`} className="pt-4 border-t border-gray-100" style={{ display: 'none' }}>
                            <h4 className="font-semibold text-lg mb-3 border-r-2 border-green-200 pr-2">הפתרון:</h4>
                            <p className="text-gray-700 pr-3">
                              {bottleneck.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
                  <Button 
                    className="rtl-action-btn text-white px-8 py-6 text-lg rounded-full"
                    onClick={openChat}
                  >
                    <Zap className="w-5 h-5 ml-2" />
                    רוצה לפתור את צווארי הבקבוק? בוא נדבר
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}