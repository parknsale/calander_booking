import { useEffect, useRef, useState } from 'react';

const CalendlyWidget = () => {
  const ref = useRef(null);
  const [calendlyUrl, setCalendlyUrl] = useState('');

  useEffect(() => {
    const scriptId = 'calendly-widget-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // 🔄 Pull stored form data
    const data = JSON.parse(localStorage.getItem('drivingLicenseData') || '{}');

    // 🧠 Fallback to dummy signature if none exists
    // const signature = data.signature?.startsWith('data:image')
    //   ? 'https://example.com/default-signature.png'
    //   : data.signature || 'https://example.com/default-signature.png';
    let signature;
    if (data.signature && data.signature.startsWith('data:image')) {
      signature = data.signature; // Use the base64 string
      // } else {
      // signature = 'https://example.com/default-signature.png'; // Fallback
    }
    const url = new URL("https://calendly.com/d/cv9z-369-mm5/select-date-and-time");

    const params = new URLSearchParams();

    if (data.fullName) params.set('name', data.fullName);
    if (data.email) params.set('email', data.email);
    if (data.intent) params.set('a1', data.intent);
    if (data.carModel) params.set('a2', data.carModel);
    if (data.phone) params.set('a3', data.phone);
    if (data.licenseNumber) params.set('a4', data.licenseNumber);
    if (data.dateOfBirth) params.set('a5', data.dateOfBirth);
    if (data.nationality) params.set('a6', data.nationality);
    if (data.licenseIssueDate) params.set('a7', data.licenseIssueDate);
    if (data.licenseExpiryDate) params.set('a8', data.licenseExpiryDate);
    if (data.placeOfIssue) params.set('a9', data.placeOfIssue);
    params.set('a10', signature);

    // 🛠️ Force spaces instead of `+` in final URL
    const finalUrl = `${url.origin}${url.pathname}?${params.toString().replace(/\+/g, '%20')}`;
    // const finalUrl = `${baseUrl}${url.pathname}?${params.toString().replace(/\+/g, '%20')}`;

    setCalendlyUrl(finalUrl);
  }, []);

  return (
    <div className="my-6">
      {calendlyUrl && (
        <div
          ref={ref}
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{ minWidth: '320px', height: '700px' }}
        />
      )}
    </div>
  );
};

export default CalendlyWidget;
