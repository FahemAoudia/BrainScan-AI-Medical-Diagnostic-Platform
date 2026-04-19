import smtplib
from email.message import EmailMessage
import os

def send_email(recipient, subject, body, attachment=None):
    sender_email = "your-email@example.com"  
    sender_password = "your-email-password"  

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = recipient
    msg.set_content(body)

    if attachment:
        with open(attachment, "rb") as f:
            file_data = f.read()
            file_name = os.path.basename(attachment)
            msg.add_attachment(file_data, maintype="application", subtype="pdf", filename=file_name)

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(sender_email, sender_password)
            smtp.send_message(msg)
        print(f"✅ Le rapport a été envoyé à : {recipient}")
    except Exception as e:
        print(f"❌ Échec de l'envoi de l'e-mail : {e}")