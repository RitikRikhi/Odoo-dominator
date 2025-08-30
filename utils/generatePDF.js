//genrate pdf
const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = (booking, qrData) => {
  const doc = new PDFDocument();
  const filePath = `tickets/${booking.bookingId}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('EventHive Ticket');
  doc.text(`Booking ID: ${booking.bookingId}`);
  doc.text(`Event: ${booking.eventId}`);
  doc.image(qrData, { fit: [150, 150] });

  doc.end();
  return filePath;
};