import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/scholar.png';

const Homepage = () => {
  const [certificateid, setCertificateid] = useState("");
  const navigate = useNavigate();

  const searchCertificate = (e) => {
    e.preventDefault();
    if (certificateid) {
      navigate(`/viewcertificate/${certificateid}`);
    }
  };

  return (
    <>
      <h1 className="font-bold text-center text-3xl mt-4">Certificate Dapp</h1>
      <section className="flex justify-center mt-24">
        <img src={Logo} alt="Scholar Logo" className="h-26" />
      </section>

      <div className="text-center mt-10">
        <form onSubmit={searchCertificate} className="inline-flex items-center">
          <input
            type="text"
            placeholder="Enter Certificate ID to View"
            className="w-52 border border-blue-400 px-2 py-1"
            value={certificateid}
            onChange={(e) => setCertificateid(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-blue-400 border px-2 py-2 ml-2"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default Homepage;
