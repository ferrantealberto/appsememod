import React, { useEffect, useState } from 'react';

const QRCodeDisplay: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    const generateQRCode = async () => {
      // Using QRServer API for better quality QR codes
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://nutri40.netlify.app/')}&format=svg&bgcolor=FFFFFF`;
      setQrCodeUrl(url);
    };

    generateQRCode();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
      {qrCodeUrl ? (
        <>
          <img 
            src={qrCodeUrl} 
            alt="QR Code per accedere all'app" 
            className="mx-auto w-[150px] h-[150px]"
            width="150"
            height="150"
          />
          <p className="text-center text-xs text-gray-600 dark:text-gray-300 mt-2">
            Scansiona per aprire su mobile
          </p>
        </>
      ) : (
        <div className="h-[150px] w-[150px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 dark:border-emerald-400"></div>
        </div>
      )}
    </div>
  );
};

export default QRCodeDisplay;
