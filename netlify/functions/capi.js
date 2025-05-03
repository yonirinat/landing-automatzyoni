/* global process */
export default async (req, res) => {
    const crypto = await import('crypto');
    const hash = v =>
      crypto.createHash('sha256').update(v.trim().toLowerCase()).digest('hex');
  
    // קבלת גוף הבקשה
    const body = JSON.parse(req.body || '{}');
    const { 
      email, 
      phone, 
      firstName, 
      lastName, 
      leadId, 
      fbp, 
      fbc, 
      url,
      test_event_code, // קוד אירוע בדיקה
      doNotTrack      // דגל Opt-out
    } = body;

    // אם יש דגל doNotTrack=true, עצור את הבקשה
    if (doNotTrack === true) {
      return res.status(200).json({ status: "skipped", reason: "user_opted_out" });
    }
    
    // קבלת משתני סביבה
    const { FB_PIXEL_ID, FB_ACCESS_TOKEN } = process.env || {};
  
    // בדיקה אם קוד אירוע הבדיקה נמצא ב-URL
    const url_params = new URL(req.url, `https://${req.headers.host}`).searchParams;
    const test_code = test_event_code || url_params.get('test_event_code') || null;
  
    const payload = {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: url,
        action_source: 'website',
        event_id: `lead-${leadId}`,
        user_data: {
          em: [hash(email)], ph: [hash(phone)],
          fn: [hash(firstName)], ln: [hash(lastName)],
          external_id: hash(String(leadId)),
          client_ip_address: req.headers['x-nf-client-connection-ip'],
          client_user_agent: req.headers['user-agent'],
          fbp, fbc
        },
        custom_data: { currency: 'ILS', value: 0 }
      }]
    };

    // הוספת קוד אירוע בדיקה אם קיים
    if (test_code) {
      payload.test_event_code = test_code;
    }
  
    // שליחה לפייסבוק
    const fbRes = await fetch(
      `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
      { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } }
    );
  
    const fbJson = await fbRes.json();
    return res.status(200).json(fbJson);
  }; 