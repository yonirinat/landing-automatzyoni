"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// קומפוננטת טופס הרשמה לניוזלטר
export default function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  // הגדרת טופס עם react-hook-form
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      marketing: false,
    },
  });

  // פונקציה לטיפול בשליחת הטופס
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // שליחת הנתונים ל-webhook של Make
      const response = await fetch(
        "https://hook.eu1.make.com/yourwebhooklink", // יש להחליף את הכתובת עם ה-webhook האמיתי
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            marketing: data.marketing,
            source: "website_newsletter",
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`שגיאה בשליחת הנתונים: ${response.status}`);
      }

      // הצלחה
      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setError(err.message || "שגיאה בשליחת הנתונים, אנא נסה שנית");
      console.error("שגיאה בשליחת נתוני ניוזלטר:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // מצב הצלחה - מציג הודעת אישור
  if (isSuccess) {
    return (
      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-bold text-green-700 mb-2">תודה שנרשמת!</h4>
        <p className="text-green-600">
          המייל שלך נוסף בהצלחה לרשימת התפוצה שלנו.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} dir="rtl" className="text-black">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "נא להזין שם" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">שם</FormLabel>
              <FormControl>
                <Input placeholder="השם שלך" {...field} className="text-black" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{ 
            required: "נא להזין כתובת אימייל", 
            pattern: { 
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
              message: "אנא הזן כתובת אימייל תקינה" 
            } 
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">אימייל</FormLabel>
              <FormControl>
                <Input
                  placeholder="your@email.com"
                  type="email"
                  {...field}
                  className="text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse my-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="my-1.5"
                />
              </FormControl>
              <div className="space-y-2 leading-none my-2">
                <FormLabel className="text-sm font-normal text-black">
                  אני מאשר/ת קבלת תכנים פרסומיים ועדכונים במייל
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full bg-orange-400 text-black" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              שולח...
            </>
          ) : (
            "הרשמה לניוזלטר"
          )}
        </Button>
      </form>
    </Form>
  );
} 