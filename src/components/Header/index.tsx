import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap'; 
import "./style.css"

interface HeaderProps {
  className?: string;
}

export function Header( { className } : HeaderProps ) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    setModalOpen(false);
  };

  return (
    <header className={`${className} bg-cover bg-opacity-50 relative`}>
      <div className="p-2 flex items-center justify-between bg-white/30 backdrop-blur-md backdrop-brightness-50">
        <div className="flex px-20 navHeader2">
          <Link to={'/home'} className='flex'> 
          <img src="src\assets\logo.svg" alt="img" className='logoImg'/>
          <p className="px-2 py-3 textHeader text-white">Bootplay</p>
          </Link>
        </div>
        <div className="px-20 flex navHeader relative">
          <Link to='/myDiscs' className=" btn p-2 mx-4 text-white hover:text-gray-300 transition">Meus discos</Link>                 
          <Link to="/login" className=" btn p-2 mx-4 text-white hover:text-gray-300 transition">Carteira</Link>
          <button onClick={toggleModal} className="relative">
            <img src="src\assets\icon.jpg" alt="icon" className="w-10 rounded-full mx-4 navImg" />
            {modalOpen && (
              <div className="absolute bg-white p-3 rounded-lg shadow-md bottom-0 left-0 transform -translate-x-10 translate-y-20">
   
                <div className="flex justify-between gap-2">
                  <Link to="/profile">
                    <Button className='bg-transparent border-green-500 hover:border-green-800 transition border-2 rounded-lg py-1 px-3'>Perfil</Button>
                  </Link>
                  <Button className='bg-transparent border-2 border-red-500  hover:border-red-800 transition rounded-lg py-1 px-3' onClick={handleLogout}>Sair</Button>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
