import React, { useState, useEffect } from 'react';
import { Settings, PlusCircle, MinusCircle, Sun, Moon, Type, Zap, MousePointer, Monitor, Underline } from 'lucide-react';

const AccessibilityWidget = () => {
  // מצב פתיחת הוידג'ט
  const [isOpen, setIsOpen] = useState(false);
  
  // מצבי נגישות
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 100, // אחוז
    contrast: 'default', // default, high, inverted
    animations: true, // האם אנימציות מופעלות
    linkHighlight: false, // הדגשת קישורים
    headingsHighlight: false, // הדגשת כותרות
    biggerCursor: false, // עכבר גדול
    readableFont: false, // גופן קריא
    lineSpacing: 100, // אחוז
    focusIndicator: false, // הדגשת מיקוד
  });
  
  // טעינת הגדרות משמורות
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('accessibilitySettings');
      if (savedSettings) {
        setAccessibilitySettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
    }
    
    // החל הגדרות באתר
    applySettings();
  }, []);
  
  // שמירת הגדרות בכל שינוי והחלתן
  useEffect(() => {
    try {
      localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
    }
    
    applySettings();
  }, [accessibilitySettings]);
  
  // פונקציה להחלת ההגדרות
  const applySettings = () => {
    // גודל טקסט
    document.documentElement.style.fontSize = `${accessibilitySettings.fontSize}%`;
    
    // ניגודיות
    document.body.classList.remove('high-contrast', 'inverted-colors');
    if (accessibilitySettings.contrast === 'high') {
      document.body.classList.add('high-contrast');
    } else if (accessibilitySettings.contrast === 'inverted') {
      document.body.classList.add('inverted-colors');
    }
    
    // אנימציות
    if (!accessibilitySettings.animations) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
    
    // הדגשת קישורים
    if (accessibilitySettings.linkHighlight) {
      document.body.classList.add('highlight-links');
    } else {
      document.body.classList.remove('highlight-links');
    }
    
    // הדגשת כותרות
    if (accessibilitySettings.headingsHighlight) {
      document.body.classList.add('highlight-headings');
    } else {
      document.body.classList.remove('highlight-headings');
    }
    
    // עכבר גדול
    if (accessibilitySettings.biggerCursor) {
      document.body.classList.add('bigger-cursor');
    } else {
      document.body.classList.remove('bigger-cursor');
    }
    
    // גופן קריא
    if (accessibilitySettings.readableFont) {
      document.body.classList.add('readable-font');
    } else {
      document.body.classList.remove('readable-font');
    }
    
    // ריווח שורות
    document.body.style.setProperty('--line-height-multiplier', `${accessibilitySettings.lineSpacing / 100}`);
    
    // הדגשת מיקוד
    if (accessibilitySettings.focusIndicator) {
      document.body.classList.add('focus-indicator');
    } else {
      document.body.classList.remove('focus-indicator');
    }
  };
  
  // עדכון ערך הגדרה
  const updateSetting = (setting, value) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  // איפוס כל ההגדרות
  const resetSettings = () => {
    setAccessibilitySettings({
      fontSize: 100,
      contrast: 'default',
      animations: true,
      linkHighlight: false,
      headingsHighlight: false,
      biggerCursor: false,
      readableFont: false,
      lineSpacing: 100,
      focusIndicator: false,
    });
  };
  
  // פתיחת/סגירת הוידג'ט
  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };
  
  // הגדלת גודל הגופן
  const increaseFontSize = () => {
    if (accessibilitySettings.fontSize < 200) {
      updateSetting('fontSize', accessibilitySettings.fontSize + 10);
    }
  };
  
  // הקטנת גודל הגופן
  const decreaseFontSize = () => {
    if (accessibilitySettings.fontSize > 80) {
      updateSetting('fontSize', accessibilitySettings.fontSize - 10);
    }
  };
  
  // הגדלת ריווח שורות
  const increaseLineSpacing = () => {
    if (accessibilitySettings.lineSpacing < 200) {
      updateSetting('lineSpacing', accessibilitySettings.lineSpacing + 10);
    }
  };
  
  // הקטנת ריווח שורות
  const decreaseLineSpacing = () => {
    if (accessibilitySettings.lineSpacing > 100) {
      updateSetting('lineSpacing', accessibilitySettings.lineSpacing - 10);
    }
  };
  
  // החלפת מצב ניגודיות
  const cycleContrast = () => {
    const modes = ['default', 'high', 'inverted'];
    const currentIndex = modes.indexOf(accessibilitySettings.contrast);
    const nextIndex = (currentIndex + 1) % modes.length;
    updateSetting('contrast', modes[nextIndex]);
  };
  
  return (
    <div className="accessibility-widget-container">
      {/* כפתור פתיחת הוידג'ט */}
      <button 
        className="accessibility-toggle-button"
        onClick={toggleWidget}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label="פתח אפשרויות נגישות"
      >
        <Settings size={24} />
        <span className="accessibility-button-text">נגישות</span>
      </button>
      
      {/* פאנל הגדרות נגישות */}
      {isOpen && (
        <div 
          id="accessibility-panel" 
          className="accessibility-panel"
          role="dialog"
          aria-label="הגדרות נגישות"
        >
          <div className="accessibility-header">
            <h2>הגדרות נגישות</h2>
            <button 
              className="close-button" 
              onClick={toggleWidget}
              aria-label="סגור הגדרות נגישות"
            >
              &times;
            </button>
          </div>
          
          <div className="accessibility-options">
            {/* גודל טקסט */}
            <div className="option-group">
              <div className="option-header">
                <Type size={18} />
                <h3 id="font-size-label">גודל טקסט</h3>
              </div>
              <div className="option-controls" role="group" aria-labelledby="font-size-label">
                <button 
                  onClick={decreaseFontSize} 
                  aria-label="הקטן גודל טקסט"
                  disabled={accessibilitySettings.fontSize <= 80}
                >
                  <MinusCircle size={18} />
                </button>
                <span className="value-display">{accessibilitySettings.fontSize}%</span>
                <button 
                  onClick={increaseFontSize} 
                  aria-label="הגדל גודל טקסט"
                  disabled={accessibilitySettings.fontSize >= 200}
                >
                  <PlusCircle size={18} />
                </button>
              </div>
            </div>
            
            {/* ריווח שורות */}
            <div className="option-group">
              <div className="option-header">
                <Underline size={18} />
                <h3 id="line-spacing-label">ריווח שורות</h3>
              </div>
              <div className="option-controls" role="group" aria-labelledby="line-spacing-label">
                <button 
                  onClick={decreaseLineSpacing} 
                  aria-label="הקטן ריווח שורות"
                  disabled={accessibilitySettings.lineSpacing <= 100}
                >
                  <MinusCircle size={18} />
                </button>
                <span className="value-display">{accessibilitySettings.lineSpacing}%</span>
                <button 
                  onClick={increaseLineSpacing} 
                  aria-label="הגדל ריווח שורות"
                  disabled={accessibilitySettings.lineSpacing >= 200}
                >
                  <PlusCircle size={18} />
                </button>
              </div>
            </div>
            
            {/* ניגודיות */}
            <div className="option-group">
              <div className="option-header">
                {accessibilitySettings.contrast === 'default' ? <Sun size={18} /> : <Moon size={18} />}
                <h3 id="contrast-label">ניגודיות</h3>
              </div>
              <div className="option-controls single-control" role="group" aria-labelledby="contrast-label">
                <button 
                  onClick={cycleContrast} 
                  className="option-button"
                  aria-pressed={accessibilitySettings.contrast !== 'default'}
                >
                  {accessibilitySettings.contrast === 'default' && 'רגיל'}
                  {accessibilitySettings.contrast === 'high' && 'ניגודיות גבוהה'}
                  {accessibilitySettings.contrast === 'inverted' && 'צבעים הפוכים'}
                </button>
              </div>
            </div>
            
            {/* ביטול אנימציות */}
            <div className="option-group">
              <div className="option-header">
                <Zap size={18} />
                <h3 id="animations-label">אנימציות</h3>
              </div>
              <div className="option-controls single-control" role="group" aria-labelledby="animations-label">
                <button 
                  onClick={() => updateSetting('animations', !accessibilitySettings.animations)} 
                  className={`option-button ${!accessibilitySettings.animations ? 'active' : ''}`}
                  aria-pressed={!accessibilitySettings.animations}
                >
                  {accessibilitySettings.animations ? 'כבה אנימציות' : 'אנימציות כבויות'}
                </button>
              </div>
            </div>
            
            {/* הדגשת קישורים */}
            <div className="option-group">
              <div className="option-header">
                <Underline size={18} />
                <h3 id="links-label">הדגשת קישורים</h3>
              </div>
              <div className="option-controls single-control" role="group" aria-labelledby="links-label">
                <button 
                  onClick={() => updateSetting('linkHighlight', !accessibilitySettings.linkHighlight)} 
                  className={`option-button ${accessibilitySettings.linkHighlight ? 'active' : ''}`}
                  aria-pressed={accessibilitySettings.linkHighlight}
                >
                  {accessibilitySettings.linkHighlight ? 'הדגשה פעילה' : 'הפעל הדגשה'}
                </button>
              </div>
            </div>
            
            {/* הדגשת כותרות */}
            <div className="option-group">
              <div className="option-header">
                <Type size={18} />
                <h3 id="headings-label">הדגשת כותרות</h3>
              </div>
              <div className="option-controls single-control" role="group" aria-labelledby="headings-label">
                <button 
                  onClick={() => updateSetting('headingsHighlight', !accessibilitySettings.headingsHighlight)} 
                  className={`option-button ${accessibilitySettings.headingsHighlight ? 'active' : ''}`}
                  aria-pressed={accessibilitySettings.headingsHighlight}
                >
                  {accessibilitySettings.headingsHighlight ? 'הדגשה פעילה' : 'הפעל הדגשה'}
                </button>
              </div>
            </div>
            
            {/* סמן עכבר מוגדל */}
            <div className="option-group">
              <div className="option-header">
                <MousePointer size={18} />
                <h3 id="cursor-label">סמן עכבר מוגדל</h3>
              </div>
              <div className="option-controls single-control" role="group" aria-labelledby="cursor-label">
                <button 
                  onClick={() => updateSetting('biggerCursor', !accessibilitySettings.biggerCursor)} 
                  className={`option-button ${accessibilitySettings.biggerCursor ? 'active' : ''}`}
                  aria-pressed={accessibilitySettings.biggerCursor}
                >
                  {accessibilitySettings.biggerCursor ? 'סמן מוגדל פעיל' : 'הפעל סמן מוגדל'}
                </button>
              </div>
            </div>
            
            {/* גופן קריא */}
            <div className="option-group">
              <div className="option-header">
                <Type size={18} />
                <h3 id="font-label">גופן קריא</h3>
              </div>
              <div className="option-controls single-control" role="group" aria-labelledby="font-label">
                <button 
                  onClick={() => updateSetting('readableFont', !accessibilitySettings.readableFont)} 
                  className={`option-button ${accessibilitySettings.readableFont ? 'active' : ''}`}
                  aria-pressed={accessibilitySettings.readableFont}
                >
                  {accessibilitySettings.readableFont ? 'גופן קריא פעיל' : 'הפעל גופן קריא'}
                </button>
              </div>
            </div>
            
            {/* הדגשת מיקוד */}
            <div className="option-group">
              <div className="option-header">
                <Monitor size={18} />
                <h3 id="focus-label">הדגשת מיקוד</h3>
              </div>
              <div className="option-controls single-control" role="group" aria-labelledby="focus-label">
                <button 
                  onClick={() => updateSetting('focusIndicator', !accessibilitySettings.focusIndicator)} 
                  className={`option-button ${accessibilitySettings.focusIndicator ? 'active' : ''}`}
                  aria-pressed={accessibilitySettings.focusIndicator}
                >
                  {accessibilitySettings.focusIndicator ? 'הדגשה פעילה' : 'הפעל הדגשה'}
                </button>
              </div>
            </div>
            
            {/* איפוס הגדרות */}
            <div className="reset-container">
              <button 
                onClick={resetSettings} 
                className="reset-button"
                aria-label="איפוס כל הגדרות הנגישות"
              >
                איפוס הגדרות
              </button>
            </div>
          </div>
          
          <div className="accessibility-footer">
            <p>התאמות אלו נשמרות במכשיר שלך.</p>
          </div>
        </div>
      )}
      
      {/* סגנונות CSS לוידג'ט ולהגדרות שהוא מחיל */}
      <style>{`
        /* מיקום הוידג'ט */
        .accessibility-widget-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: Arial, sans-serif;
          direction: rtl;
        }
        
        /* כפתור פתיחה */
        .accessibility-toggle-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 10px 16px;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          transition: background-color 0.2s;
          font-weight: bold;
        }
        
        .accessibility-toggle-button:hover {
          background-color: #1d4ed8;
        }
        
        .accessibility-toggle-button:focus {
          outline: 3px solid #93c5fd;
          background-color: #1d4ed8;
        }
        
        .accessibility-button-text {
          white-space: nowrap;
        }
        
        /* פאנל ההגדרות */
        .accessibility-panel {
          position: absolute;
          bottom: 60px;
          right: 0;
          width: 320px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        
        /* כותרת הפאנל */
        .accessibility-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background-color: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .accessibility-header h2 {
          margin: 0;
          font-size: 18px;
          color: #1e293b;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #64748b;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .close-button:hover {
          background-color: #e5e7eb;
        }
        
        /* מיכל האפשרויות */
        .accessibility-options {
          padding: 16px;
          max-height: 70vh;
          overflow-y: auto;
        }
        
        /* קבוצת אפשרויות */
        .option-group {
          margin-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 16px;
        }
        
        .option-group:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        
        /* כותרת האפשרות */
        .option-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .option-header h3 {
          margin: 0;
          font-size: 16px;
          color: #334155;
          font-weight: 600;
        }
        
        /* פקדי האפשרות */
        .option-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .option-controls button {
          background-color: #f1f5f9;
          border: none;
          border-radius: 4px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #334155;
          transition: background-color 0.2s, color 0.2s;
        }
        
        .option-controls button:hover:not(:disabled) {
          background-color: #e2e8f0;
        }
        
        .option-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .value-display {
          min-width: 60px;
          text-align: center;
          font-weight: 600;
          color: #475569;
        }
        
        /* פקד בודד */
        .single-control {
          justify-content: flex-start;
        }
        
        .option-button {
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          color: #334155;
          font-weight: 600;
          transition: background-color 0.2s, border-color 0.2s;
        }
        
        .option-button:hover {
          background-color: #e2e8f0;
        }
        
        .option-button.active {
          background-color: #dbeafe;
          border-color: #93c5fd;
          color: #1e40af;
        }
        
        /* איפוס הגדרות */
        .reset-container {
          display: flex;
          justify-content: center;
          margin-top: 24px;
        }
        
        .reset-button {
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          color: #334155;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        
        .reset-button:hover {
          background-color: #fee2e2;
          color: #b91c1c;
        }
        
        /* כותרת תחתונה */
        .accessibility-footer {
          padding: 12px 16px;
          background-color: #f8fafc;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #64748b;
          text-align: center;
        }
        
        /* סגנונות גלובליים שיוחלו על האתר */
        .high-contrast {
          filter: contrast(150%) brightness(120%);
          background-color: white !important;
          color: black !important;
        }
        
        .high-contrast * {
          background-color: white !important;
          color: black !important;
          border-color: black !important;
        }
        
        .high-contrast a {
          color: #0000EE !important;
          font-weight: bold !important;
        }
        
        .high-contrast button {
          background-color: black !important;
          color: white !important;
          border: 2px solid white !important;
          outline: 2px solid black !important;
        }
        
        .inverted-colors {
          filter: invert(100%) hue-rotate(180deg);
        }
        
        .reduce-motion * {
          animation: none !important;
          transition: none !important;
        }
        
        .highlight-links a {
          background-color: #FFFFA5 !important;
          color: #00008B !important;
          border-bottom: 3px solid #00008B !important;
          font-weight: bold !important;
          text-decoration: none !important;
        }
        
        .highlight-headings h1, .highlight-headings h2, .highlight-headings h3, .highlight-headings h4, .highlight-headings h5, .highlight-headings h6 {
          background-color: #DDDDFF !important;
          border: 2px solid #9999FF !important;
          padding: 5px !important;
        }
        
        .bigger-cursor {
          cursor: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V3h7M4 5l13 13"/></svg>') 3 3, auto !important;
        }
        
        .readable-font {
          font-family: Arial, sans-serif !important;
          letter-spacing: 0.12em !important;
          word-spacing: 0.16em !important;
        }
        
        .readable-font p, .readable-font li, .readable-font span {
          line-height: calc(1.5 * var(--line-height-multiplier, 1)) !important;
        }
        
        .focus-indicator *:focus {
          outline: 3px solid #2563eb !important;
          outline-offset: 3px !important;
        }
        
        /* תמיכה במסכים קטנים */
        @media (max-width: 480px) {
          .accessibility-widget-container {
            bottom: 10px;
            right: 10px;
          }
          
          .accessibility-button-text {
            display: none;
          }
          
          .accessibility-toggle-button {
            border-radius: 50%;
            width: 48px;
            height: 48px;
            padding: 0;
          }
          
          .accessibility-panel {
            width: calc(100vw - 20px);
            max-height: 80vh;
            right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AccessibilityWidget;