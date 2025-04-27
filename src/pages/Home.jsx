/* global process */
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import headshot from '../images/headshot.avif';
import heroBanner from '../images/heroBanner.avif';
import coPilot from '../images/coPilot.avif';
import { useChatbot } from "@/context/ChatbotContext";
import OrbitCapabilitiesSimplified from "@/components/CapabilitiesWheel";
import { 
  Clock, 
  Calendar, 
  CreditCard, 
  Mail, 
  Users, 
  Briefcase,
  CheckCircle,
  Target,
  DollarSign,
  Award,
  Zap,
} from "lucide-react";

export default function Home() {
  const { openChat } = useChatbot();
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#EBF3FA] to-white py-16 md:py-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-100 rounded-full opacity-30"></div>
          <div className="absolute bottom-12 right-12 w-48 h-48 bg-blue-50 rounded-full opacity-40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                נמאס לך שהעסק <span className="text-[#1E5FA8]">&apos;מנהל&apos;</span> אותך במקום שאתה תנהל אותו?
              </h1>
              <p className="text-xl text-gray-600">
                תכיר את ה&apos;טייס האוטומטי&apos; שיכול לעשות בשבילך חלק גדול מהעבודה המשעממת והגוזלת זמן.
              </p>
              <div>
                <Button
                  onClick={openChat}
                  size="lg"
                  className="bg-[#FF9900] hover:bg-[#E68A00] text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  רוצה לשחרר לעצמך זמן? בוא נדבר
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
                <img 
                  src={heroBanner}
                  alt="אוטומציה עסקית"
                  className="rounded-xl w-full"
                />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm p-3 rounded-lg shadow-md">
                  <Clock className="w-6 h-6 text-[#1E5FA8]" />
                </div>
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm p-3 rounded-lg shadow-md">
                  <Zap className="w-6 h-6 text-[#FF9900]" />
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1E5FA8] rounded-full opacity-10 z-0"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FF9900] rounded-full opacity-10 z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pain Points Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              אם אחד או יותר מהדברים האלה נשמעים לך מוכר...
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              סימן שאתה יכול להרוויח הרבה מאוד מאוטומציה של תהליכים בעסק שלך
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-10 h-10 text-[#1E5FA8]" />,
                title: "אין לך מספיק זמן",
                description: "אתה מרגיש שלא משנה כמה שעות אתה עובד, תמיד יש עוד משימות בתור."
              },
              {
                icon: <Calendar className="w-10 h-10 text-[#1E5FA8]" />,
                title: "ניהול פגישות",
                description: "אתה מבזבז זמן רב על תיאומים, תזכורות ומעקב אחר פגישות."
              },
              {
                icon: <CreditCard className="w-10 h-10 text-[#1E5FA8]" />,
                title: "ניירת ומסמכים",
                description: "הוצאת חשבוניות, קבלות והנהלת חשבונות גוזלים ממך זמן יקר."
              },
              {
                icon: <Mail className="w-10 h-10 text-[#1E5FA8]" />,
                title: "המון מיילים",
                description: "אתה מוצף במיילים ומתקשה לנהל תקשורת יעילה עם לקוחות וספקים."
              },
              {
                icon: <Users className="w-10 h-10 text-[#1E5FA8]" />,
                title: "ניהול לקוחות",
                description: "המעקב אחרי לקוחות קיימים ופוטנציאליים הופך למשימה מורכבת ומתישה."
              },
              {
                icon: <Briefcase className="w-10 h-10 text-[#1E5FA8]" />,
                title: "עבודה חוזרת",
                description: "אתה מבצע שוב ושוב אותן פעולות שגרתיות שאינן דורשות חשיבה יצירתית."
              }
            ].map((pain, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="bg-blue-50 rounded-lg p-3 inline-block mb-4 group-hover:bg-blue-100 transition-colors">
                  {pain.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{pain.title}</h3>
                <p className="text-gray-600">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="py-16 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src={coPilot}
                  alt="טייס אוטומטי לעסק"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-white rounded-full p-4 shadow-lg">
                  <Zap className="w-8 h-8 text-[#FF9900]" />
                </div>
                <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 bg-white rounded-full p-4 shadow-lg">
                  <Clock className="w-8 h-8 text-[#1E5FA8]" />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 text-center lg:text-right">
              <h2 className="text-3xl font-bold mb-6">
                תכירו את ה&apos;עוזר האוטומטי&apos; לעסק שלכם
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                בדיוק כמו שבמטוס יש טייס אוטומטי שמסוגל לבצע חלק גדול מהטיסה, כך גם בעסק - אפשר להגדיר &quot;טייס אוטומטי&quot; שיקח על עצמו את המשימות השגרתיות.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                ה&apos;עוזר האוטומטי&apos; הוא מערכת אוטומציה מותאמת לעסק שלך, שמחברת בין כל הכלים והתוכנות שאתה משתמש בהם ומבצעת עבורך משימות באופן אוטומטי.
              </p>
              <Button
                onClick={openChat}
                className="bg-[#1E5FA8] hover:bg-blue-700 text-lg"
              >
                רוצה לשמוע עוד?
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">
              היתרונות של אוטומציה עסקית
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl text-center">
              כשחלק מהעבודה שלך נעשית באופן אוטומטי, הרווחים מורגשים כמעט מיד
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-10 h-10 text-white" />,
                title: "חיסכון משמעותי בזמן",
                description: "שחרור של עשרות שעות בחודש שתוכל להשקיע בצמיחה במקום בניירת."
              },
              {
                icon: <Target className="w-10 h-10 text-white" />,
                title: "פחות טעויות",
                description: "מערכות אוטומטיות מבצעות משימות בעקביות ובדיוק, ללא טעויות אנוש."
              },
              {
                icon: <DollarSign className="w-10 h-10 text-white" />,
                title: "הגדלת רווחיות",
                description: "ניצול יעיל יותר של המשאבים שלך, כולל הזמן היקר שלך והצוות שלך."
              },
              {
                icon: <Award className="w-10 h-10 text-white" />,
                title: "שיפור השירות",
                description: "תגובות מהירות יותר ללקוחות ומעקב מדויק יותר אחרי צרכיהם."
              },
              {
                icon: <Zap className="w-10 h-10 text-white" />,
                title: "גמישות וצמיחה",
                description: "יכולת להתרחב ללא צורך בהגדלה מיידית של כוח האדם."
              },
              {
                icon: <CheckCircle className="w-10 h-10 text-white" />,
                title: "שקט נפשי",
                description: "ביטחון שהדברים החשובים לא נופלים בין הכיסאות ושהכל מתועד."
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-[#1E5FA8] to-[#1C4F8A] rounded-xl p-6 shadow-md text-white group hover:shadow-lg transition-shadow"
              >
                <div className="bg-white bg-opacity-20 rounded-lg p-3 inline-block mb-4 group-hover:bg-opacity-30 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-blue-100">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Capabilities Section */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 ">
              אז מה בעצם ה&apos;עוזר האוטומטי&apos; הזה יכול לעשות?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              הנה רק חלק מהפעולות שאפשר לבצע באופן אוטומטי
            </p>
          </div>
          
          <OrbitCapabilitiesSimplified />
          
          <div className="text-center mt-12">
              <Button
                onClick={openChat}
                size="lg"
                className="bg-[#FF9900] hover:bg-[#E68A00] text-white text-lg px-8 whitespace-normal text-center"
              >
                רוצה לבדוק אילו תהליכים כדאי לאטמץ בעסק שלך?
              </Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="bg-[#1E5FA8] rounded-3xl p-1 inline-block mb-8">
                <div className="bg-white rounded-3xl p-1">
                  {/* Replace with actual image when available */}
                  <img 
                    src={headshot} 
                    alt="יונתן רינת"
                    className="w-72 h-72 rounded-3xl object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <h2 className="text-3xl font-bold mb-6">
                אודות יונתן רינת
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                היי, אני יונתן. אני מתמחה בבניית פתרונות אוטומציה לעסקים קטנים ובינוניים שרוצים להתייעל ולשחרר זמן יקר לבעלים ולצוות.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                במשך יותר מעשור עבדתי עם מאות עסקים וגיליתי שרובם מתמודדים עם אותן בעיות בדיוק: עומס משימות, ניירת אינסופית, ותחושה שהעסק מנהל אותם במקום שהם ינהלו את העסק.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                הגישה שלי מעשית ומותאמת לצרכים האמיתיים של העסק שלך. אני לא מאמין בפתרונות מסובכים או יקרים מדי, אלא בפתרונות שעובדים ומביאים תוצאות מיידיות.
              </p>
              <Button
                onClick={openChat}
                className="bg-[#1E5FA8] hover:bg-blue-700"
              >
                רוצה לדבר איתי?
              </Button>
            </div>
          </div>
        </div>
      </section>
      
{/* Process Section */}
<section className="py-16 bg-[#F8FAFC]">
  <div className="max-w-7xl mx-auto px-6">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">איך זה עובד?</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        תהליך העבודה פשוט, יעיל ומותאם לצרכים שלך
      </p>
    </div>

    {/* Steps + Connectors */}
    <div className="relative">
      {/* Horizontal line — מוצג בדסקטופ, מוסתר במובייל */}
      <div
        className="absolute top-1/2 left-0 right-0 h-1 bg-[#1E5FA8] transform -translate-y-1/2 hidden md:block z-0"
        aria-hidden="true"
      />

      {/* Grid of steps */}
      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-4 md:gap-y-0 md:gap-x-8 relative z-10">
        {[
          {
            number: "1",
            title: "אבחון ראשוני",
            description:
              "נבין ביחד מהם הכאבים והצרכים העיקריים של העסק שלך."
          },
          {
            number: "2",
            title: "בניית תכנית",
            description:
              "נגדיר את התהליכים שכדאי לאמץ ובאיזה כלים נשתמש."
          },
          {
            number: "3",
            title: "יישום והטמעה",
            description:
              "נקים את המערכות ונוודא שהכל עובד חלק ומחובר כראוי."
          },
          {
            number: "4",
            title: "ליווי ושיפור",
            description:
              "נמשיך ללוות את העסק, לשפר ולהוסיף אוטומציות לפי הצורך."
          }
        ].map((step, idx, arr) => (
          <div
            key={idx}
            className="relative flex flex-col items-center text-center"
          >
            {/* Vertical connector between steps — מוצג במובייל בלבד */}
            {idx < arr.length - 1 && (
              <div
                className="absolute top-16 bottom-0 left-1/2 w-1 bg-[#1E5FA8] 
                           transform -translate-x-1/2 md:hidden z-0"
                aria-hidden="true"
              />
            )}

            {/* Numbered circle */}
            <div className="relative z-20 w-16 h-16 rounded-full bg-[#1E5FA8] 
                            text-white flex items-center justify-center 
                            text-2xl font-bold mb-4 shadow-md">
              {step.number}
            </div>

            <h3 className="text-xl font-bold mb-2 relative z-10 bg-[#F8FAFC] px-2">{step.title}</h3>
            <p className="text-gray-600 relative z-10 bg-[#F8FAFC] px-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      
      {/* FAQs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              שאלות נפוצות
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              התשובות לשאלות הנפוצות ביותר על אוטומציה עסקית
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: "למה אני צריך אוטומציה בעסק שלי?",
                answer: "אוטומציה חוסכת לך זמן, כסף ומשאבים. היא מפחיתה טעויות אנוש, משפרת את איכות השירות ללקוחות ומאפשרת לך להתמקד בצמיחה ובפיתוח העסק במקום בניהול שוטף ומשימות שגרתיות."
              },
              {
                question: "האם אני צריך ידע טכני כדי להטמיע אוטומציה?",
                answer: "לא! זה בדיוק העניין. אני מטפל בכל ההיבטים הטכניים עבורך. אתה רק צריך לספר לי מה הצרכים שלך ואיך העסק שלך עובד, ואני אדאג להקים מערכת שתעבוד בצורה חלקה."
              },
              {
                question: "כמה זמן לוקח להטמיע אוטומציה בעסק?",
                answer: "תלוי במורכבות הפתרון, אבל בדרך כלל מדובר בתהליך של מספר שבועות. אנחנו מתחילים עם פתרונות מהירים שמביאים ערך מיידי, ולאט לאט מרחיבים לתחומים נוספים."
              },
              {
                question: "האם האוטומציה תחליף עובדים?",
                answer: "המטרה של אוטומציה היא לא להחליף עובדים, אלא לשחרר אותם ממשימות חוזרות ושגרתיות כדי שיוכלו להתמקד במשימות בעלות ערך גבוה יותר שדורשות מגע אנושי, יצירתיות וחשיבה ביקורתית."
              },
              {
                question: "האם אוטומציה מתאימה גם לעסקים קטנים?",
                answer: "בהחלט! למעשה, עסקים קטנים לעתים מרוויחים יותר מאוטומציה כי המשאבים שלהם מוגבלים יותר. פתרונות אוטומציה מודרניים הם גמישים ונגישים גם לעסקים קטנים ובתקציבים סבירים."
              },
              {
                question: "מה קורה אם משהו משתבש?",
                answer: "חלק מהשירות שלי כולל תמיכה שוטפת ומעקב. אם מתעוררת בעיה, אני זמין לפתור אותה במהירות. בנוסף, אני תמיד מקפיד לבנות מערכות עם גיבויים ומנגנוני אבטחה מתאימים."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-lg">
                    {faq.question}
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-700">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#1E5FA8] to-[#13386B] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            מוכנים לשחרר את העסק (ואת עצמכם)?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            הצעד הראשון להפוך את העסק שלך ליעיל יותר הוא לדבר איתי. בוא נבדוק יחד אילו תהליכים ניתן לאטמץ כדי לחסוך לך זמן וכסף.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={openChat}
              size="lg"
              className="bg-[#FF9900] hover:bg-[#E68A00] text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              רוצה לשחרר לעצמך זמן? בוא נדבר
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E5FA8] text-lg px-8 py-6 rounded-xl transition-colors"
              onClick={() => window.location.href = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER || '972526485138'}`}
            >
              פנה אליי בוואטסאפ
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
