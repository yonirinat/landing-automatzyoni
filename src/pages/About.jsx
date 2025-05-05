import React from "react";
import { Button } from "@/components/ui/button";
import { useChatbot } from "@/context/ChatbotContext";
import {
  CheckCircle,
  Heart,
  Clock,
  Users,
  MessageCircle
} from "lucide-react";

export default function About() {
  const { openChat } = useChatbot();

  return (
    <div className="bg-white font-sans">
      {/* ===== HERO ===== */}
      <section className="py-16 md:py-24 bg-[#F8FAFC] rtl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              אודות יונתן רינת
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              עוזר לבעלי עסקים לחסוך זמן, לשפר מכירות ולהפסיק "לרדוף אחרי הזנב".
            </p>
            <Button
              onClick={openChat}
              className="bg-[#FF9900] hover:bg-[#E68A00] text-white"
            >
              בוא נדבר על העסק שלך
            </Button>
          </div>

          {/* Portrait */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-5 -right-5 w-full h-full bg-[#1E5FA8] rounded-3xl transform rotate-6 opacity-10"></div>
              <div className="bg-[#1E5FA8] rounded-3xl p-1 relative">
                <div className="bg-white rounded-3xl p-1">
                  <img
                    src="/images/headshot.avif"
                    alt="יונתן רינת – צילום תדמית"
                    className="w-72 h-72 rounded-3xl object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BIO ===== */}
      <section className="py-16 bg-white rtl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">מי אני בקצרה?</h2>
          <div className="prose prose-lg max-w-none text-right leading-relaxed">
            <p>
              שלום, אני יונתן (יוני) רינת, יליד 1989 מתל‑אביב. בשנים האחרונות עזרתי
              לעשרות בעלי עסקים להיפטר ממשימות ידניות, למשוך יותר לקוחות ולהרוויח
              יותר—הכול באמצעות כלים פשוטים שכל אחד יכול לתפעל.
            </p>
            <p>
              התחלתי את דרכי כנציג מכירות ומנהל לקוחות. מהר מאוד הבנתי שבעלי עסקים
              נתקעים על פעולות שחוזרות על עצמן: עידכון טבלאות, תזכורות, מעקב אחרי
              לידים ועוד. לכן למדתי איך להפוך תהליכים לאוטומטיים ולחסוך לכל אחד שעות
              בכל שבוע.
            </p>
            <p>
              הרקע שלי משלב מכירות, שיווק דיגיטלי וניהול מערכות מידע—מה שנותן לי ראייה
              רחבה על העסק שלך: איך למשוך לקוחות, איך לנהל אותם נכון ואיך להפוך כל זה
              לתהליך שעובד בשבילך, גם כשאתה ישן.
            </p>
            <p>
              המטרה שלי פשוטה: <strong>שיהיה לך יותר זמן לדברים שבאמת חשובים לך</strong>—בין אם
              זה פיתוח העסק, משפחה או קצת אוויר לנשימה.
            </p>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-16 bg-[#F8FAFC] rtl" aria-labelledby="values-title">
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="values-title" className="text-2xl font-bold mb-12 text-center">איך אני עובד?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
            {[
              {
                icon: <Clock className="w-10 h-10 text-[#1E5FA8]" aria-hidden="true" />,
                title: "חיסכון בזמן",
                description: "מזהים משימות שחוזרות על עצמן ומעבירים אותן לטייס‑אוטומטי."
              },
              {
                icon: <CheckCircle className="w-10 h-10 text-[#1E5FA8]" aria-hidden="true" />,
                title: "תוצאה ברורה",
                description: "מודדים שעות שנחסכו והכנסות שגדלו—שקופים ושמים מספרים על השולחן."
              },
              {
                icon: <Users className="w-10 h-10 text-[#1E5FA8]" aria-hidden="true" />,
                title: "שירות אישי",
                description: "ליווי צמוד בשפה פשוטה, בלי מילים מסובכות ובלי תלות בי בעתיד."
              }
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 text-right hover:shadow-md transition-shadow" role="listitem">
                <div className="mb-4" aria-hidden="true">{card.icon}</div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPERTISE ===== */}
      <section className="py-16 bg-white rtl" aria-labelledby="expertise-title">
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="expertise-title" className="text-2xl font-bold mb-12 text-center">איך אני יכול לעזור לך?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list">
            {[
              {
                title: "סדר בתהליכים",
                items: [
                  "ניהול לידים ולקוחות במקום אחד",
                  "תזכורות אוטומטיות לפגישות ותשלומים",
                  "דוחות פשוטים להבנה בלחיצה אחת"
                ]
              },
              {
                title: "שיווק שעובד לבד",
                items: [
                  "קמפיינים בפייסבוק ובגוגל שמביאים לקוחות",
                  "אימיילים אוטומטיים ששומרים על קשר",
                  "הודעות וואטסאפ אישיות בלחיצת כפתור"
                ]
              },
              {
                title: "חיבור מערכות",
                items: [
                  "סנכרון יומן, CRM, ואתרי פרסום",
                  "טפסים אוטומטיים לאיסוף מידע",
                  "קבלת תשלומים קלה ומאובטחת"
                ]
              },
              {
                title: "הדרכה ותמיכה",
                items: [
                  "הטמעת הכלים בצוות שלך",
                  "סרטוני וידאו קצרים להסבר",
                  "מענה מהיר לשאלות גם אחרי ההטמעה"
                ]
              }
            ].map((area, idx) => (
              <div key={idx} className="bg-[#F8FAFC] rounded-xl p-6 text-right" role="listitem">
                <h3 className="text-xl font-bold mb-4">{area.title}</h3>
                <ul className="space-y-2">
                  {area.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-[#1E5FA8] mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-gradient-to-br from-[#1E5FA8] to-[#13386B] text-white text-center rtl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 leading-snug">
            רוצים להרוויח יותר ולבלות פחות במחשב?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            20 דקות שיחה. נזהה יחד תהליך אחד שאתם שונאים לעשות—ואראה איך אפשר להעלים אותו.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={openChat}
              size="lg"
              className="bg-[#FF9900] hover:bg-[#E68A00] text-white text-lg"
            >
              <MessageCircle className="w-5 h-5 ml-2" />
              דברו עם העוזר שלי
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E5FA8] text-lg"
              onClick={() => (window.location.href = "mailto:yonatan@automatzyoni.co.il")}
            >
              או שלחו לי אימייל
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
