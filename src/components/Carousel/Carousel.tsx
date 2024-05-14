import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import toast from 'react-hot-toast';

export function Carousel() {
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  useEffect(() => {  
    const tokenWithQuotes = localStorage.getItem("@Auth.Token");
    if (tokenWithQuotes) {
      const token = tokenWithQuotes.replace(/['"]+/g, '');  
      album_api.defaults.headers.common.Authorization = `Basic ${token}`;
      console.log(album_api.defaults.headers.common.Authorization)
     album_api.get('/albums/all?searchText=rap')
     .then((resp) => {
       setAlbums(resp.data);
       console.log(albums);
     })}
   }, []);

  function handleAlbumClick(album: AlbumModel) {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleBuy() {

    if (!selectedAlbum) {
      console.error("Nenhum álbum selecionado para compra.");
      return;
    }

    const tokenWithQuotes = localStorage.getItem("@Auth.Token");
    if (tokenWithQuotes) {
      const token = tokenWithQuotes.replace(/['"]+/g, '');

  
       
       console.log(selectedAlbum)
      console.log(token)

      album_api.defaults.headers.common.Authorization = `Basic ${token}`;

      const albumData = {
        name: selectedAlbum.name,
        idSpotify: selectedAlbum.id,
        artistName: selectedAlbum.artists[0].name,
        imageUrl: selectedAlbum.images[0].url,
        value: selectedAlbum.value,
      }



      album_api.post('/albums/sale', albumData)
        .then(response => {
          toast   .success("Login efetuado com sucesso!")
        })
        .catch(error => {
          console.error("Erro ao realizar a compra:", error);
        });
    } else {
      console.error("Token or user not found in localStorage.");
    }
  }

  return (
    <div>
      <div className='flex'>
        <p className='text-white text-3xl mx-20'>Trends</p>
      </div>
      <div className="flex items-center justify-center relative overflow-hidden" style={{height: '300px'}}>
        <div className="carousel-home absolute left-0 flex items-center w-full">
          {albums.map((album, i) =>(
            <div className="pr-8" key={i}>
              <div style={{'--bg-fundo': `url(${album.images[0].url})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md hover:scale-110 transition">
                <div onClick={() => handleAlbumClick(album)} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
                  <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center'>
      {isModalOpen && selectedAlbum && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className='bg-white rounded-lg w-[520px] h-[245px] relative'>
            <span className="close absolute top-0 right-0 m-1 text-2xl cursor-pointer" onClick={closeModal}>&times;</span>
            <div className='flex flex-row'>
              <div>
                <div style={{'--bg-fundo': `url(${selectedAlbum.images[0].url})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md"></div>
              </div>
              <div className='flex flex-col justify-between items-center'>
                <h1 className="text-2xl p-5 font-bold text-center">{selectedAlbum.name}</h1>
                <p className='text-ms font-semibold'>{selectedAlbum.artists[0].name}</p>
                <p>Valor: <span className='font-semibold text-2xl'>R${selectedAlbum.value}</span></p>
                <button onClick={handleBuy} className='py-2 px-20 m-5 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition'>Comprar</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
