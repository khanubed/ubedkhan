import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-black absolute top-0 left-0 w-full z-50 ">
      <div className=" mx-auto  py-4 w-full flex justify-between items-center">        
        <div className="w-full flex justify-evenly  text-sm font-semibold">
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <div key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-gray-100 hover:to-gray-400 transition"
              >
                {item}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
