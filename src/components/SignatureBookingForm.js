import React, { useRef, useState } from "react";
import SignaturePad from "signature_pad";

const SignatureBookingForm = () => {
  const canvasRef = useRef(null);
  const [sigPad, setSigPad] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const initializeSignaturePad = () => {
    if (canvasRef.current && !sigPad) {
      const pad = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgba(255,255,255,1)",
      });
      setSigPad(pad);
    }
  };

  const clearSignature = () => {
    sigPad?.clear();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || sigPad?.isEmpty()) {
      setError("Please fill all fields and sign the form.");
      return;
    }

    setError("");

    const signatureImage = sigPad.toDataURL(); // base64 PNG

    // Optional: send this signatureImage to a server or save it

    // Redirect to Calendly with prefilled name & email
    const calendlyURL = `https://calendly.com/your-link?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}`;
    window.location.href = calendlyURL;
  };

  return (
    <div className="max-w-xl mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Signature</label>
          <canvas
            ref={canvasRef}
            width={400}
            height={150}
            className="border rounded"
            onMouseDown={initializeSignaturePad}
          ></canvas>
          <button
            type="button"
            onClick={clearSignature}
            className="text-sm mt-2 underline text-blue-600"
          >
            Clear Signature
          </button>
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit & Book
        </button>
      </form>
    </div>
  );
};

export default SignatureBookingForm;
