import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignaturePad from 'signature_pad';
import { uploadLicenseImage } from '../utils/uploadLicense';
import { formatDate } from '../utils/date';

const TestDriveForm = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [sigPad, setSigPad] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    licenseNumber: '',
    dateOfBirth: '',
    nationality: '',
    licenseIssueDate: '',
    licenseExpiryDate: '',
    placeOfIssue: '',
  });

  useEffect(() => {
    if (canvasRef.current) {
      const pad = new SignaturePad(canvasRef.current, {
        backgroundColor: 'rgba(255,255,255,1)',
      });
      setSigPad(pad);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg('');

    try {
      const parsed = await uploadLicenseImage(file);

      setFormData((prev) => ({
        ...prev,
        fullName: parsed.full_name || '',
        licenseNumber: parsed.license_number || '',
        dateOfBirth: formatDate(parsed.date_of_birth),
        nationality: parsed.nationality || '',
        licenseExpiryDate: formatDate(parsed.license_expiry_date),
        licenseIssueDate: formatDate(parsed.license_issue_date),
        placeOfIssue: parsed.place_of_issue || '',
      }));
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to extract license information.');
    } finally {
      setUploading(false);
    }
  };

  const clearSignature = () => {
    sigPad?.clear();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sigPad || sigPad.isEmpty()) {
      setErrorMsg('Signature is required.');
      return;
    }

    setErrorMsg('');
    const signatureImage = sigPad.toDataURL(); // base64 image

    const payload = {
      ...formData,
      signature: signatureImage,
    };

    localStorage.setItem('drivingLicenseData', JSON.stringify(payload));
    navigate('/calendly');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-8"
    >
      <h2 className="text-2xl font-semibold border-b pb-2 text-gray-800">
        Driver's License Information
      </h2>

      {/* Upload Field */}
      <div className="w-full mb-5 group">
        <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-600 bg-transparent text-sm text-gray-900 px-2 py-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-500 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full bg-transparent text-gray-700 focus:outline-none"
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">Upload License</p>
        {uploading && (
          <p className="text-blue-600 text-sm mt-1">
            Extracting license info...
          </p>
        )}
        {errorMsg && <p className="text-red-600 text-sm mt-1">{errorMsg}</p>}
      </div>

      {/* License Fields */}
      {[
        { label: 'Full Name', name: 'fullName' },
        { label: 'License Number', name: 'licenseNumber' },
        { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
        { label: 'Nationality', name: 'nationality' },
        { label: 'License Issue Date', name: 'licenseIssueDate', type: 'date' },
        { label: 'License Expiry Date', name: 'licenseExpiryDate', type: 'date' },
        { label: 'Place of Issue', name: 'placeOfIssue' },
      ].map(({ label, name, type = 'text' }) => (
        <div className="relative z-0 w-full group" key={name}>
          <input
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            required
            placeholder=" "
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {label}
          </label>
        </div>
      ))}

      {/* Signature Field */}
      <div className="mt-6">
        <label className="block font-medium mb-2">Signature (required)</label>
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          className="border rounded w-full"
        />
        <button
          type="button"
          onClick={clearSignature}
          className="text-sm mt-2 text-blue-600 underline"
        >
          Clear Signature
        </button>
      </div>

      {/* Error Display */}
      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Submit & Select Time
      </button>
    </form>
  );
};

export default TestDriveForm;
