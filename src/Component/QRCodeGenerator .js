import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./QRCodeGenerator.css"; // You can customize the CSS file accordingly
import piwcLogo from "./piwc-logo-2.png"; // Import the image

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
    // Get the canvas element from the qrRef
    const qrCanvas = qrRef.current.querySelector("canvas");
  
    // Check if the qrCanvas exists
    if (qrCanvas) {
      // Create a new window with a data URL of the printable HTML document
      const printWindow = window.open("", "", "width=600,height=600");
  
      // Check if the print window was successfully opened
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <style>
                /* Customize the styles as needed */
                .header {
                  text-align: center;
                  padding: 20px;
                }
                .logo {
                  max-width: 400px; /* Adjust the logo size as needed */
                }
                .title {
                  font-size: 20px; /* Adjust the title font size as needed */
                  margin-top: 50px;
                }
                .qrcode {
                  display: block;
                  margin: 0 auto;
                  margin-top: 20px; /* Adjust the margin as needed */
                }
              </style>
            </head>
            <body onload="window.print();window.close()">
              <div class="header">
                <img src="${piwcLogo}" alt="Your Logo" class="logo" />
                <div class="title">Scan QR Code to Register for Service</div>
              </div>
              <img src="${qrCanvas.toDataURL()}" alt="QR Code" class="qrcode" />
            </body>
          </html>
        `);
  
        printWindow.document.close();
      } else {
        // Handle the case where the print window couldn't be opened
        console.error("Unable to open print window.");
      }
    } else {
      // Handle the case where the qrCanvas is not found
      console.error("QR Code canvas not found.");
    }
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
