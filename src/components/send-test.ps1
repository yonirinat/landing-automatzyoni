curl -Method POST "https://automatzyoni.app.n8n.cloud/webhook/3af81add-7eb6-45f3-98c3-c82b0ed6a5a1" `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{
    "name": " ישראל ישראלי",
    "phone": "0501234567",
    "email": "mizoo4dogs@gmail.com",
    "business_description": "שיפוצים",
    "employees": "אני לבד",
    "main_pain": "ניהול משימות ידני",
    "task_areas": "חשבוניות, תזכורות",
    "current_tools": "CRM, חשבונית ירוקה",
    "volume": "10-50",
    "desired_outcome": "פחות עבודה שחוזרת על עצמה",
    "want_summary": "Yes",
    "final_note": "לא",
    "full_conversation": "[{\"text\":\"שלום\",\"isBot\":true}]"
  }'