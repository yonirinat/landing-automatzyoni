import { useState, useEffect } from 'react';
import { 
  Calendar, 
  FileText, 
  Mail, 
  Users, 
  Database, 
  Send, 
  MessageSquare, 
  Smartphone, 
  PenTool 
} from 'lucide-react';

const OrbitCapabilitiesSimplified = () => {
  const capabilitiesData = [
    {
      icon: <Calendar className="w-8 h-8 text-[#1E5FA8]" />,
      title: "תיאום פגישות",
      description: "מערכת אוטומטית לקביעת פגישות, כולל תזכורות ומעקב."
    },
    {
      icon: <FileText className="w-8 h-8 text-[#1E5FA8]" />,
      title: "יצירת מסמכים",
      description: "הפקה אוטומטית של הצעות מחיר, חשבוניות וחוזים."
    },
    {
      icon: <Mail className="w-8 h-8 text-[#1E5FA8]" />,
      title: "ניהול מיילים",
      description: "מערכת תזכורות ומעקב אחרי מיילים חשובים וסינון מיילים לא רלוונטיים."
    },
    {
      icon: <Users className="w-8 h-8 text-[#1E5FA8]" />,
      title: "ניהול לקוחות",
      description: "מעקב אחרי אינטראקציות, מענה אוטומטי לשאלות נפוצות ועוד."
    },
    {
      icon: <Database className="w-8 h-8 text-[#1E5FA8]" />,
      title: "ניהול מלאי",
      description: "התראות אוטומטיות על מלאי נמוך והזמנות אוטומטיות מספקים."
    },
    {
      icon: <Send className="w-8 h-8 text-[#1E5FA8]" />,
      title: "אוטומציה שיווקית",
      description: "שליחת מסרים ללקוחות בנקודות מגע חשובות בדרך הלקוח."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#1E5FA8]" />,
      title: "תקשורת פנימית",
      description: "עדכונים אוטומטיים לצוות, ניהול משימות ומעקב אחרי התקדמות."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#1E5FA8]" />,
      title: "תזכורות וטריגרים",
      description: "הפעלה אוטומטית של תהליכים בהתאם לזמן או פעולות מסוימות."
    },
    {
      icon: <PenTool className="w-8 h-8 text-[#1E5FA8]" />,
      title: "פתרונות מותאמים",
      description: "פיתוח אוטומציות ייחודיות בהתאם לצרכים ספציפיים של העסק שלך."
    }
  ];

  const [activeCapability, setActiveCapability] = useState(0);

  useEffect(() => {
    // אוטומטית מעבר בין היכולות כל 4 שניות
    const interval = setInterval(() => {
      setActiveCapability((prev) => (prev + 1) % capabilitiesData.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const handleItemClick = (index) => {
    setActiveCapability(index);
  };

  // חישוב מיקום עבור כל פריט במסלול המעגלי
  const getOrbitPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 160; // רדיוס המסלול
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <section className="bg-transparent overflow-hidden rtl">
      <div className="container mx-auto px-4">

        <div className="flex flex-col items-center justify-center">
          {/* תצוגת המסלול */}
          <div className="relative mb-16">
            <div className="orbit-container mx-auto" style={{ height: '400px', width: '400px' }}>
              {/* המסלול המעגלי */}
              <div className="orbit-ring"></div>
              
              {/* הפריט המרכזי */}
              <div className="orbit-center">
                <div className="bg-white rounded-full shadow-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-blue-50 p-4 rounded-full inline-block mb-3">
                      {capabilitiesData[activeCapability].icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {capabilitiesData[activeCapability].title}
                    </h3>
                  </div>
                </div>
              </div>
              
              {/* הפריטים במסלול */}
              {capabilitiesData.map((item, index) => {
                const { x, y } = getOrbitPosition(index, capabilitiesData.length);
                const isActive = index === activeCapability;
                
                return (
                  <div 
                    key={index}
                    className={`orbit-item ${isActive ? 'active' : ''}`}
                    style={{ 
                      transform: `translate(${x}px, ${y}px)`,
                      transition: 'all 0.5s ease-out'
                    }}
                    onClick={() => handleItemClick(index)}
                  >
                    <div className={`bg-white rounded-full shadow p-3 cursor-pointer transition-all duration-300 ${
                      isActive ? 'scale-125 shadow-lg' : 'scale-100 opacity-60'
                    }`}>
                      {item.icon}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* תיאור היכולת הנבחרת מתחת לגלגל */}
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              {capabilitiesData[activeCapability].title}
            </h3>
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <p className="text-slate-700 text-lg leading-relaxed">
                {capabilitiesData[activeCapability].description}
              </p>
            </div>
            
          </div>
        </div>
      </div>
      
      <style>{`
        .orbit-container {
          position: relative;
        }
        
        .orbit-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 320px;
          height: 320px;
          border: 1px dashed rgba(59, 130, 246, 0.3);
          border-radius: 50%;
        }
        
        .orbit-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }
        
        .orbit-item {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -20px;
          margin-left: -20px;
          z-index: 5;
        }
        
        .orbit-item.active {
          z-index: 20;
        }
      `}</style>
    </section>
  );
};

export default OrbitCapabilitiesSimplified;