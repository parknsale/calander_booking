import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestDriveForm from './components/TestDriveForm';
import CalendlyWidget from './components/CalendlyWidget';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<CalendlyWidget />} />
//         <Route path="/calendly" element={<CalendlyWidget />} />
//       </Routes>
//     </Router>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestDriveForm />} />
        <Route path="/calendly" element={<CalendlyWidget />} />
      </Routes>
    </Router>
  );
}

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<CalendlyWidget />} />
//         <Route path="/calendly" element={<CalendlyWidget />} />
//       </Routes>
//     </Router>
//   );
// }
export default App;
// import React from "react";
// import SignatureBookingForm from "./components/SignatureBookingForm";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <SignatureBookingForm />
//     </div>
//   );
// }

// export default App;
