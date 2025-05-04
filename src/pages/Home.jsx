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
                העסק שלכם מנהל אתכם? {/* Changed */}
              </h1>
              <p className="text-xl text-gray-600">
                {/* Changed */}
                תחשבו על זה רגע. במקום שאתם תרדפו אחרי המשימות, יש דרך לגרום לחלק גדול מהן לקרות לבד, כמו &apos;טייס אוטומטי&apos; שמקל עליכם.
              </p>
              <div>
                <Button
                  onClick={openChat}
                  size="lg"
                  className="bg-[#FF9900] hover:bg-[#E68A00] text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {/* Changed */}
בדקו את העסק שלכם              </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
                <img
                  src={heroBanner}
                  alt="אוטומציה עסקית - 'טייס אוטומטי' לעסק" // Changed alt text
                  className="rounded-xl w-full"
                  loading="eager"
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
              {/* Changed */}
              אם אפילו אחד מהדברים הבאים נשמע לכם מוכר...
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              {/* Changed */}
              סימן שאני יכול לעזור לכם מאוד בעזרת &apos;אוטומציה&apos;, כלומר, לגרום לתהליכים בעסק לקרות לבד:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-10 h-10 text-[#1E5FA8]" />,
                title: "מרגישים שאין לכם דקה לנשום?", // Changed
                description: "שהיום נגמר ותמיד נשאר עוד משהו לעשות?" // Changed
              },
              {
                icon: <Calendar className="w-10 h-10 text-[#1E5FA8]" />,
                title: "קביעת פגישות ותזכורות?", // Changed
                description: "כל התיאומים והטלפונים האלה לוקחים לכם שעות יקרות?" // Changed
              },
              {
                icon: <CreditCard className="w-10 h-10 text-[#1E5FA8]" />,
                title: "חשבוניות, קבלות, ניירת?", // Changed
                description: "כל ההתעסקות הזו היא כאב ראש שגוזל זמן שאפשר להשקיע בדברים חשובים יותר?" // Changed
              },
              {
                icon: <Mail className="w-10 h-10 text-[#1E5FA8]" />,
                title: "מוצפים בהודעות ומיילים?", // Changed
                description: "קשה לכם לעקוב אחרי כל הפניות מלקוחות וספקים?" // Changed
              },
              {
                icon: <Users className="w-10 h-10 text-[#1E5FA8]" />,
                title: "לזכור מה כל לקוח צריך?", // Changed
                description: "המעקב אחרי כולם, מתי דיברתם איתם לאחרונה – זה נהיה מסובך ומתיש?" // Changed
              },
              {
                icon: <Briefcase className="w-10 h-10 text-[#1E5FA8]" />,
                title: "עושים שוב ושוב את אותן פעולות?", // Changed
                description: "דברים משעממים שלא באמת דורשים מכם לחשוב, סתם עבודה טכנית שחוזרת על עצמה?" // Changed
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
                  alt="ה'עוזר האוטומטי' בפעולה" // Changed alt text
                  className="rounded-xl shadow-lg"
                  loading="lazy"
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
                {/* Changed */}
                ה&apos;עוזר&apos; הזה הוא בעצם תוכנה חכמה שאני מתאים בדיוק לעסק שלכם. היא יודעת לגרום לדברים שאתם עושים ידנית (כמו לשלוח תזכורת ללקוח, או לרשום הכנסה) לקרות מעצמם, ברקע. זה פשוט עובד.
              </p>
              <Button
                onClick={openChat}
                className="bg-[#1E5FA8] hover:bg-blue-700 text-lg"
              >
                {/* Changed */}
                רוצים לשמוע איך זה יכול לעבוד בעסק שלכם?
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
              {/* Changed */}
              למה זה טוב לכם? היתרונות של ה&apos;עוזר האוטומטי&apos;
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl text-center">
              {/* Changed */}
              כשחלק מהעבודה קורית מעצמה, אתם מרגישים את ההקלה כמעט מיד:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-10 h-10 text-white" />,
                title: "פתאום יש לכם עוד זמן", // Changed
                description: "עשרות שעות בחודש יכולות להתפנות. זמן שתוכלו להשקיע בלקוחות, בפיתוח העסק, או פשוט במשפחה ובשקט הנפשי שלכם." // Changed
              },
              {
                icon: <Target className="w-10 h-10 text-white" />,
                title: "פחות טעויות", // Kept
                description: "כשמכונה עושה משהו שוב ושוב, היא לא מתבלבלת, לא שוכחת ולא עייפה. זה מונע טעויות קטנות ומעצבנות." // Changed
              },
              {
                icon: <DollarSign className="w-10 h-10 text-white" />,
                title: "יותר רווח", // Changed
                description: "כשהזמן שלכם ושל העובדים (אם יש) מנוצל בצורה חכמה יותר, העסק יכול להרוויח יותר בלי שתצטרכו לעבוד קשה יותר." // Changed
              },
              {
                icon: <Award className="w-10 h-10 text-white" />,
                title: "שירות טוב יותר ללקוחות", // Changed
                description: "לקוחות מקבלים מענה מהיר יותר, תזכורות בזמן, ואתם לא שוכחים לטפל בפניות שלהם." // Changed
              },
              {
                icon: <Zap className="w-10 h-10 text-white" />,
                title: "קל יותר לגדול", // Changed
                description: "העסק יכול להתמודד עם יותר לקוחות או יותר עבודה בלי שתצטרכו מיד לגייס עוד עובדים שיעשו את העבודה השחורה." // Changed
              },
              {
                icon: <CheckCircle className="w-10 h-10 text-white" />,
                title: "שקט נפשי", // Kept
                description: "אתם יכולים להיות רגועים שהדברים החשובים לא נופלים בין הכיסאות, שהכול מטופל ומסודר." // Changed
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
              אז מה בעצם ה&apos;עוזר האוטומטי&apos; הזה יכול לעשות? {/* Kept */}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              הנה חלק מהפעולות שאפשר לבצע באופן אוטומטי {/* Kept */}
            </p>
          </div>

          <OrbitCapabilitiesSimplified />

          <div className="text-center mt-12">
              <Button
                onClick={openChat}
                size="lg"
                className="bg-[#FF9900] hover:bg-[#E68A00] text-white text-base md:text-lg px-4 md:px-8 py-4 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
              >
                {/* Changed */}
יוני, תאטמץ לי את העסק              </Button>
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
                  <img
                    src={headshot}
                    alt="יונתן רינת - מומחה לאוטומציה עסקית" // Kept
                    className="w-72 h-72 rounded-3xl object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <h2 className="text-3xl font-bold mb-6">
                {/* Changed */}
                נעים מאוד, אני יונתן רינת – המומחה שלכם ל&apos;עוזר האוטומטי&apos;
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                {/* Changed */}
                היי, אני יונתן. אני מתמחה בלמצוא פתרונות פשוטים וחכמים לעסקים קטנים ובינוניים שרוצים לעבוד בצורה יעילה יותר ולפנות זמן יקר לבעלים ולצוות.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                {/* Changed */}
                במשך יותר מעשר שנים עבדתי עם מאות בעלי עסקים כמוכם. גיליתי שרובם נאבקים באותם קשיים: עומס מטורף של משימות, הרים של ניירת, ותחושה מתמדת שהם רודפים אחרי הזנב של עצמם והעסק מנהל אותם.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {/* Changed */}
                הגישה שלי היא מעשית ופשוטה. אני לא מאמין בפתרונות מסובכים שידרשו מכם ללמוד דברים חדשים או להוציא הון. אני מתמקד במה שכואב לכם *עכשיו* ובונה פתרונות שעובדים מהר ומביאים תוצאות שאפשר להרגיש מיד ביומיום. אני פה כדי להוריד מכם את כאב הראש הטכנולוגי.
              </p>
              <Button
                onClick={openChat}
                className="bg-[#1E5FA8] hover:bg-blue-700"
              >
                {/* Changed */}
                רוצים לדבר איתי על איך אני יכול לעזור לעסק שלכם?
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
            <h2 className="text-3xl font-bold mb-4">איך זה עובד? פשוט וקל</h2> {/* Changed */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              {/* Changed */}
              התהליך שלנו ביחד יהיה פשוט ויעיל:
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
                  title: "נדבר ונבין", // Changed
                  description: "נשב יחד (או נדבר בטלפון) ואתם תספרו לי מה הכי מציק לכם בעסק, איפה אתם מרגישים שאתם מבזבזים הכי הרבה זמן." // Changed
                },
                {
                  number: "2",
                  title: "נמצא פתרון", // Changed
                  description: "אני אחשוב על הדרך הכי טובה ופשוטה לעזור לכם, ואסביר לכם מה אני מציע. נחליט ביחד מה עושים." // Changed
                },
                {
                  number: "3",
                  title: "אני אדאג להכול", // Changed
                  description: "אני אקים ואסדר את כל מה שצריך מאחורי הקלעים. אתם לא צריכים להתעסק עם שום דבר טכני. זה פשוט יתחיל לעבוד." // Changed
                },
                {
                  number: "4",
                  title: "נשארים בקשר", // Changed
                  description: "אני לא נעלם. אהיה שם כדי לוודא שהכול עובד כמו שצריך, לענות על שאלות, ולעזור אם צריך. אם תרצו, נוכל גם למצוא עוד דברים שנוכל להפוך לאוטומטיים בהמשך." // Changed
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
              {/* Changed */}
              שאלות שאולי יש לכם
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              התשובות לשאלות הנפוצות ביותר על אוטומציה עסקית {/* Kept */}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "למה העסק שלי בכלל צריך את זה?", // Changed
                answer: "כי זה יחסוך לכם המון זמן וכאב ראש, יעזור לכם לעשות פחות טעויות, ויפנה אתכם לעשות את מה שאתם באמת אוהבים וטובים בו – לנהל ולפתח את העסק." // Changed
              },
              {
                question: "אני צריך לדעת משהו במחשבים?", // Changed
                answer: "ממש לא! כל הקטע הוא שאני עושה את כל העבודה הטכנית בשבילכם. אתם רק צריכים להסביר לי מה הצרכים שלכם ואיך העסק שלכם עובד." // Changed
              },
              {
                question: "כמה זמן לוקח עד שזה עובד?", // Changed
                answer: "בדרך כלל, תוך מספר שבועות אפשר כבר להרגיש את השינוי. אנחנו מתחילים עם הדברים שהכי יקלו עליכם ומרחיבים משם לפי הצורך." // Changed
              },
              {
                question: "זה יחליף לי עובדים?", // Changed
                answer: "המטרה היא ממש לא לפטר אף אחד. להפך, המטרה היא לשחרר אתכם ואת העובדים שלכם (אם יש) מהעבודה השחורה והמשעממת, כדי שתוכלו להתפנות לדברים יותר חשובים ויצירתיים שבאמת מקדמים את העסק." // Changed
              },
              {
                question: "זה מתאים גם לעסק קטן כמו שלי?", // Changed
                answer: "בהחלט! לפעמים דווקא לעסקים קטנים זה עוזר הכי הרבה, כי כל שעה שמתפנה היא קריטית והפתרונות לא חייבים להיות יקרים." // Changed
              },
              {
                question: "ומה אם משהו משתבש או לא עובד?", // Changed
                answer: "אני כאן בשבילכם. חלק מהשירות שלי זה ליווי ותמיכה. אם יש בעיה, אני זמין לפתור אותה במהירות." // Changed
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
            {/* Changed */}
            מוכנים להתחיל לנהל את העסק בקלות?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {/* Changed */}
            הצעד הראשון להפוך את העסק שלכם למקום שנעים וקל יותר לעבוד בו, הוא פשוט לדבר איתי. בואו נבדוק ביחד איפה מסתתר הזמן האבוד שלכם ואיך אפשר להחזיר אותו אליכם.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={openChat}
              size="lg"
              className="bg-[#FF9900] hover:bg-[#E68A00] text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {/* Changed */}
              רוצים לשחרר זמן? דברו איתי
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E5FA8] text-lg px-8 py-6 rounded-xl transition-colors"
              onClick={() => window.location.href = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER || '972526485138'}`}
            >
              {/* Changed */}
              אפשר פשוט לשלוח לי הודעה בוואטסאפ
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}