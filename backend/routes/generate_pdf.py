from fpdf import FPDF
import os
import re

REPORT_FOLDER = "static/reports/"
os.makedirs(REPORT_FOLDER, exist_ok=True)

def clean_text(text):
    if text is None:
        return ""
    return re.sub(r'[^\x00-\x7F]+', '', text) 

class PDF(FPDF):
    def header(self):
        self.set_font("Arial", "B", 14)  
        self.cell(0, 10, "RAPPORT MÉDICAL", ln=True, align="C")
        self.ln(5)

def generate_medical_report(patient, doctor, diagnosis, confidence, recommendations, scan_image_url):
    try:
        pdf = PDF()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_page()

        pdf.set_font("Arial", "", 12)

        pdf.cell(0, 10, "RAPPORT MÉDICAL", ln=True, align="C")
        pdf.ln(5)

        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 10, "Informations du Médecin:", ln=True)
        pdf.set_font("Arial", "", 12)
        pdf.multi_cell(180, 10, clean_text(f"Dr. {doctor.get('name', 'Inconnu')} - {doctor.get('email', 'Inconnu')}"))
        pdf.ln(2)

        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 10, "Informations du Patient:", ln=True)
        pdf.set_font("Arial", "", 12)
        pdf.multi_cell(180, 10, clean_text(f"{patient.get('name', 'Inconnu')} - {patient.get('email', 'Inconnu')}"))
        pdf.ln(5)

        pdf.set_font("Arial", "B", 12)
        pdf.cell(95, 10, "DIAGNOSTIC", ln=False, align="L")  
        pdf.cell(95, 10, "Confiance", ln=True, align="R") 

        pdf.set_font("Arial", "", 12)
        pdf.cell(95, 10, clean_text(f"Résultat: {diagnosis}"), ln=False, align="L") 
        pdf.cell(95, 10, f"{confidence:.2f}%", ln=True, align="R") 
        pdf.ln(5)

        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 10, "RECOMMANDATIONS", ln=True)
        pdf.set_font("Arial", "", 12)
        pdf.multi_cell(180, 10, clean_text(recommendations or "Aucune recommandation spécifiée."))
        pdf.ln(5)


        if scan_image_url and os.path.exists(scan_image_url):
            pdf.ln(10)
            pdf.cell(0, 10, "Image de l'examen:", ln=True)

            pdf.image(scan_image_url, x=55, w=100, h=100)  
        report_filename = f"report_{clean_text(patient.get('name', 'Inconnu')).replace(' ', '_')}.pdf"
        report_path = os.path.join(REPORT_FOLDER, report_filename)
        pdf.output(report_path, "F")

        print(f"✅ Rapport généré avec succès: {report_path}")
        return {"message": "Rapport généré avec succès", "pdf_url": report_path}

    except Exception as e:
        print(f"❌ Erreur lors de la génération du rapport: {e}")
        return None
