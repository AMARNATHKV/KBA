import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IssueCertificate = () => {
  const [course, setCourse] = useState('Certified Blockchain Associate');
  const [certificateid, setCertificateid] = useState('');
  const [candidatename, setCandidatename] = useState('');
  const [grade, setGrade] = useState('S');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const newCertificate = {
      course,
      certificateid,
      candidatename,
      grade,
      date,
    };
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCertificate),
      });
      if (response.ok) {
        toast.success("Certificate issued successfully");
        navigate('/');
      } else {
        toast.error("Failed to issue certificate");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  return (
    <>
      <h3 className="font-bold text-2xl">Certificate Dapp</h3>
      <section>
        <div className="bg-gray-100 p-10 mx-24 m-10 rounded-lg">
          <h3 className="font-semibold text-xl">Issue New Certificate</h3>

          <form onSubmit={submitForm} className="space-y-5">
            <div className="flex flex-col">
              <label>Select Course*</label>
              <select
                name="course"
                className="w-96 border border-black"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="Certified Blockchain Associate">Certified Blockchain Associate</option>
                <option value="Certified Ethereum Network Administrator">Certified Ethereum Network Administrator</option>
                <option value="Certified Hyperledger Fabric Developer">Certified Hyperledger Fabric Developer</option>
                <option value="Certified Ethereum Developer">Certified Ethereum Developer</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label>Certificate ID*</label>
              <input
                type="text"
                name="certificateid"
                required
                placeholder="Certificate ID"
                className="w-96 border border-black"
                value={certificateid}
                onChange={(e) => setCertificateid(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label>Candidate Name*</label>
              <input
                type="text"
                name="candidatename"
                required
                placeholder="Name"
                className="w-96 border border-black"
                value={candidatename}
                onChange={(e) => setCandidatename(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label>Select Grade*</label>
              <select
                name="grade"
                className="w-96 border border-black"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="S">S</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label>Issue Date*</label>
              <input
                type="date"
                className="w-96 border border-black"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="text-white bg-blue-400 border rounded-lg px-2 py-2"
              >
                Issue Certificate
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default IssueCertificate;
