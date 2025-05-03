/**
 * פונקציה לקבלת ערך עוגיה לפי שם
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}

/**
 * פונקציה לבדיקה אם המשתמש בחר לא להיות מעוקב (Opt-out)
 * @returns {boolean} האם המשתמש בחר לא להיות מעוקב
 */
function isOptedOut() {
  // דוגמאות לבדיקות Opt-out:
  
  // בדיקה 1: האם קיימת עוגיית Opt-out
  if (getCookie('privacy_optout') === 'true') {
    return true;
  }
  
  // בדיקה 2: האם יש דגל DoNotTrack בדפדפן
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
    return true;
  }
  
  // בדיקה 3: האם יש דגל מקומי בלוקל סטורג'
  if (localStorage.getItem('privacy_optout') === 'true') {
    return true;
  }
  
  return false;
}

/**
 * פונקציה לשליחת אירוע Lead עם דדופליקציה
 * @param {Object} userData - נתוני המשתמש (אימייל, טלפון, שם פרטי, שם משפחה)
 * @param {string|number} leadId - מזהה ייחודי לליד
 * @param {Object} options - אפשרויות נוספות
 * @param {string} options.test_event_code - קוד אירוע בדיקה עבור Events Manager
 * @param {boolean} options.respectOptOut - האם לכבד הגדרות Opt-out (ברירת מחדל: true)
 */
function sendLeadEvent(userData, leadId, options = {}) {
  // וודא שהמזהה הוא מחרוזת
  const eventId = `lead-${leadId}`;
  const { test_event_code, respectOptOut = true } = options;
  
  // בדיקת Opt-out - אם יש, ולא דורסים את זה
  const optedOut = respectOptOut && isOptedOut();
  
  // אם המשתמש בחר לא להיות מעוקב
  if (optedOut) {
    console.log('CAPI: המשתמש בחר לא להיות מעוקב, אירוע Lead לא נשלח');
    
    // אפשרות 1: פשוט לא לשלוח כלום
    // אפשרות 2: לשלוח אירוע שמסמן DoNotTrack עם פרטים מינימליים
    fetch('/api/capi', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        doNotTrack: true,
        leadId
      })
    }).catch(() => {});
    
    return;
  }
  
  // שליחת אירוע Pixel רגיל עם מזהה אירוע לדדופליקציה
  if (typeof fbq === 'function') {
    fbq('track', 'Lead', {}, {eventID: eventId});
  }

  // מיזוג נתוני המשתמש עם המזהה ונתוני עוגיות
  const payload = {
    ...userData,
    leadId,
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),
    url: window.location.href
  };
  
  // הוספת קוד אירוע בדיקה אם יש
  if (test_event_code) {
    payload.test_event_code = test_event_code;
  }

  // שליחת קריאת CAPI לשרת
  fetch('/api/capi', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      console.error('שגיאה בשליחת CAPI:', response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log('תשובת CAPI:', data);
  })
  .catch(error => {
    console.error('שגיאה בשליחת CAPI:', error);
  });
}

/**
 * פונקציה להגדרת עמדת משתמש בעניין מעקב פרטיות
 * @param {boolean} allowTracking האם לאפשר מעקב
 */
function setUserPrivacyChoice(allowTracking) {
  if (allowTracking) {
    // מחיקת סימוני Opt-out
    document.cookie = 'privacy_optout=false; path=/; max-age=31536000';
    localStorage.removeItem('privacy_optout');
  } else {
    // הגדרת סימוני Opt-out
    document.cookie = 'privacy_optout=true; path=/; max-age=31536000';
    localStorage.setItem('privacy_optout', 'true');
  }
}

// דוגמה לשימוש:
// sendLeadEvent({
//   email: 'example@mail.com',
//   phone: '0541234567',
//   firstName: 'Yoni',
//   lastName: 'Rinat'
// }, 123, { test_event_code: 'TEST123' }); 