import { jsPDF } from "jspdf";

function addRedFlags(doc, redFlags, y) {
    doc.setFont("helvetica", "bold");
    doc.text("Detected Red Flags", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");

    if (!redFlags || redFlags.length === 0) {
        doc.text("No suspicious red flags detected.", 25, y);
        y += 10;
    } else {
        redFlags.forEach((flag) => {
            const lines = doc.splitTextToSize(`• ${flag}`, 165);
            doc.text(lines, 25, y);
            y += lines.length * 7;
        });
    }

    return y;
}

export const generateTextPDF = (result, jobDescription) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("JobShield", 20, 20);

    doc.setFontSize(15);
    doc.text("AI Job Scam Detection Report", 20, 32);

    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);

    let y = 50;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Analysis Type : Text Description`, 20, y);
    y += 10;

    doc.text(`Generated On : ${new Date().toLocaleString()}`, 20, y);
    y += 10;

    doc.text(`Risk Score : ${result.risk_score}%`, 20, y);
    y += 10;

    doc.text(`Risk Level : ${result.risk_level}`, 20, y);
    y += 15;

    y = addRedFlags(doc, result.red_flags, y);

    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Job Description", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(jobDescription || "", 170);
    doc.text(lines, 20, y);

    doc.save("JobShield_Text_Report.pdf");
};

export const generateImagePDF = (result, extractedText) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("JobShield", 20, 20);

    doc.setFontSize(15);
    doc.text("AI Job Scam Detection Report", 20, 32);

    doc.line(20, 38, 190, 38);

    let y = 50;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Analysis Type : Image Poster`, 20, y);
    y += 10;

    doc.text(`Generated On : ${new Date().toLocaleString()}`, 20, y);
    y += 10;

    doc.text(`Risk Score : ${result.risk_score}%`, 20, y);
    y += 10;

    doc.text(`Risk Level : ${result.risk_level}`, 20, y);
    y += 15;

    y = addRedFlags(doc, result.red_flags, y);

    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("OCR Extracted Text", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(extractedText || "", 170);
    doc.text(lines, 20, y);

    doc.save("JobShield_Image_Report.pdf");
};