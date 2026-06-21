import jsPDF from "jspdf";
import QRCode from "qrcode";

export type Certificate = {
  certificate_id: string;
  student_name: string;
  domain: string;
  college_name: string;
  internship_start_date: string;
  internship_end_date: string;
  issue_date: string;
  certificate_status: string;
};

export const VERIFY_BASE_URL = "https://www.deplorixtechnologies.site/verify";

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export const formatDuration = (start: string, end: string) =>
  `${formatDate(start)} to ${formatDate(end)}`;

export async function generateCertificatePdf(cert: Certificate) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  // Outer border
  doc.setDrawColor(20, 20, 20);
  doc.setLineWidth(3);
  doc.rect(24, 24, pageW - 48, pageH - 48);
  doc.setLineWidth(0.6);
  doc.rect(36, 36, pageW - 72, pageH - 72);

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text("DEPLORIX TECHNOLOGIES", pageW / 2, 90, { align: "center" });

  doc.setFontSize(28);
  doc.setTextColor(15, 15, 15);
  doc.text("INTERNSHIP COMPLETION CERTIFICATE", pageW / 2, 130, { align: "center" });

  doc.setDrawColor(15, 15, 15);
  doc.setLineWidth(1);
  doc.line(pageW / 2 - 140, 145, pageW / 2 + 140, 145);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(80, 80, 80);
  doc.text("This certificate is proudly presented to", pageW / 2, 180, { align: "center" });

  // Name
  doc.setFont("times", "bolditalic");
  doc.setFontSize(38);
  doc.setTextColor(15, 15, 15);
  doc.text(cert.student_name, pageW / 2, 230, { align: "center" });

  // Description
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  const desc = `for successfully completing the internship program in ${cert.domain}`;
  doc.text(desc, pageW / 2, 265, { align: "center" });
  doc.text(`from ${formatDuration(cert.internship_start_date, cert.internship_end_date)}.`, pageW / 2, 285, { align: "center" });

  // Detail rows
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  const detailsY = 330;
  doc.setFont("helvetica", "bold");
  doc.text("Certificate ID:", 90, detailsY);
  doc.text("Domain:", 90, detailsY + 22);
  doc.text("Issue Date:", 90, detailsY + 44);

  doc.setFont("helvetica", "normal");
  doc.text(cert.certificate_id, 200, detailsY);
  doc.text(cert.domain, 200, detailsY + 22);
  doc.text(formatDate(cert.issue_date), 200, detailsY + 44);

  // QR code
  const qrDataUrl = await QRCode.toDataURL(`${VERIFY_BASE_URL}/${cert.certificate_id}`, {
    margin: 1,
    width: 240,
  });
  const qrSize = 110;
  doc.addImage(qrDataUrl, "PNG", pageW - 90 - qrSize, detailsY - 10, qrSize, qrSize);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text("Scan to verify authenticity", pageW - 90 - qrSize / 2, detailsY + qrSize + 8, { align: "center" });

  // Signature
  doc.setDrawColor(15, 15, 15);
  doc.setLineWidth(0.6);
  doc.line(90, pageH - 100, 290, pageH - 100);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 15, 15);
  doc.text("Kiran Shetty", 90, pageH - 85);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text("Founder & CEO", 90, pageH - 70);
  doc.text("DeploriX Technologies", 90, pageH - 56);

  // Footer text
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(
    `Verify at ${VERIFY_BASE_URL}/${cert.certificate_id}`,
    pageW / 2,
    pageH - 40,
    { align: "center" }
  );

  doc.save(`DeploriX-Certificate-${cert.certificate_id}.pdf`);
}

export async function generateQrDataUrl(certificateId: string) {
  return QRCode.toDataURL(`${VERIFY_BASE_URL}/${certificateId}`, {
    margin: 1,
    width: 320,
  });
}
