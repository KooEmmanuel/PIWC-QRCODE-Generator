import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCode = () => {
  const [url, setUrl] = useState("https://example.com"); // Hardcoded URL
  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const printQRCode = () => {
    let canvas = qrRef.current.querySelector("canvas");
    let printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <body onload="window.print();window.close()">
          <img src="${canvas.toDataURL()}" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  useEffect(() => {
    // This effect runs when the component mounts.
    // You can change the URL here if needed.
    // Example: setUrl("https://new-url.com");
  }, []); // Empty dependency array ensures this runs once

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#FFFFFF"}
      level={"H"}
    />
  );

  return (
    <div className="qrcode__container">
      <div ref={qrRef}>{qrcode}</div>
      <div className="button__group">
        <button type="submit" onClick={downloadQRCode}>
          Download QR code
        </button>
        <button type="button" onClick={printQRCode}>
          Print QR code
        </button>
      </div>
    </div>
  );
};

export default QrCode;
