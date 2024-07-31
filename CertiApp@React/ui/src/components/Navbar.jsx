import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <section className="flex justify-end space-x-4 mt-[10px] pr-[10px]">
        <Link to='/'>
          <button className="text-white bg-blue-500 border rounded-lg px-2 py-2">
            Home
          </button>
        </Link>
        <Link to='/issuecertificate'>
          <button className="text-black bg-gray-200 border rounded-lg px-2 py-2">
            Issue Certificate
          </button>
        </Link>
      </section>
    </>
  );
};

export default Navbar;
