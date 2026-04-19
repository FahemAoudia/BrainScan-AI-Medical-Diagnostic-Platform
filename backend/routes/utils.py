import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

def send_email_with_report(receiver_email, report_path):
    sender_email = "votre_email@gmail.com"
    sender_password = "votre_mot_de_passe"

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "📄 Votre rapport médical"

    body = "Bonjour,\n\nVeuillez trouver ci-joint votre rapport médical.\n\nCordialement."
    msg.attach(MIMEText(body, "plain"))

    with open(report_path, "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f"attachment; filename={report_path}")
        msg.attach(part)

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print("✅ Email envoyé avec succès !")
    except Exception as e:
        print(f"❌ Erreur lors de l'envoi de l'email : {e}")
