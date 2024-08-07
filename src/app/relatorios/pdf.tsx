import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadPDF2 = ({pdfRef}) => {
  const input = pdfRef.current;
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/jpg');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      const doc = new jsPDF('p', 'mm', 'a4', true);
      let position = 0;
      doc.addImage(imgData, 'JPG', 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'JPG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Relatório.pdf');
    });
}