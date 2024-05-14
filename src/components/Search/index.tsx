import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Carousel } from '../Carousel/Carousel';
import { UserModel } from '@/models/UserModel';
import toast from 'react-hot-toast';




export function Search() {
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [user, setUser] = useState<UserModel[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [showCarousel, setShowCarousel] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumModel | null>(null);


  useEffect(() => {
    setShowCarousel(searchText.trim() === '' || albums.length === 0);
  }, [searchText, albums]);
  
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
          toast.success("Compra efetuado com sucesso!");
        })
        .catch(error => {
          console.error("Erro ao realizar a compra:", error);
        });
    } else {
      console.error("Token or user not found in localStorage.");
    }
  }

  
  useEffect(() => {
    if (searchText.trim() !== '') {
      const tokenWithQuotes = localStorage.getItem("@Auth.Token");
      if (tokenWithQuotes) {
        const token = tokenWithQuotes.replace(/['"]+/g, '');
  
        album_api.defaults.headers.common.Authorization = `Basic ${token}`;
  
        album_api.get(`/albums/all?searchText=${searchText}`)
          .then((resp) => {
            setAlbums(resp.data);
            setShowCarousel(resp.data.length === 0); 
          })
          .catch(error => {
            console.error("Error fetching albums:", error);
          });
      } else {
        console.error("Token or not found in localStorage.");
      }
    } else {
      setShowCarousel(true);
    }
  }, [searchText]);
  
  


  return (
    <main className="pt-10">
      <div className='flex flex-col items-center justify-center'>
        <div className="relative ">
          <input
            type="text"
            className='rounded-lg py-2 px-4 bg-[#19181f] text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            style={{ width: '280px' }}
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaSearch className="absolute top-0 right-0 my-3 mx-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

    
      <section className="flex flex-wrap justify-center h-full gap-8 pb-10 pt-5">
  {/* Card */}
  {searchText.trim() !== '' && albums?.map((album, i) => (
    <div key={i} style={{ '--bg-fundo': `url(${album.images[0].url})` } as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md hover:scale-110 transition">
      <div onClick={() => handleAlbumClick(album)} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer ">
        <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
      </div>
    </div>
  ))}

</section>
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
                <h1 className="text-xl p-5 font-bold text-center">{selectedAlbum.name}</h1>
                <p className='text-ms font-semibold'>{selectedAlbum.artists[0].name}</p>
                <p>Valor: <span className='font-semibold text-lg'>R${selectedAlbum.value}</span></p>
                <button onClick={handleBuy} className='py-2 px-20 m-5 bg-yellow-500 text-white rounded-full  hover:bg-yellow-600 transition'>Comprar</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
{showCarousel && <Carousel />}   
 </main>
  )
}
