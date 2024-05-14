import { Header } from '@/components/Header';
import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import { useEffect, useState } from 'react';


export function MyDisc(){
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {  
    
    const tokenWithQuotes = localStorage.getItem("@Auth.Token");
    if (tokenWithQuotes) {
      const token = tokenWithQuotes.replace(/['"]+/g, '');  

      album_api.defaults.headers.common.Authorization = `Basic ${token}`;

      console.log(album_api.defaults.headers.common.Authorization)

     album_api.get('/albums/my-collection')
     .then((resp) => {
       setAlbums(resp.data);

       const total = resp.data.reduce((acc: any, album: any) => acc + album.value, 0);
       setTotalPrice(Number(total.toFixed(2)));
       
     })}
   }, []);
   console.log(albums);



  return(
    <div className='bg-[#19181f] h-screen'>
      <Header className='bg-white'/>
      <div className='mt-20 ml-20'>
      <div className='mb-10 pt-10 ml-10'>
        <h1 className='text-white text-4xl font-semibold'>Meus Discos</h1>
      </div>
      <div className='flex gap-5'>
      <div className='bg-white w-[237px] h-[87px] rounded-lg flex justify-center items-center ml-10 gap-5'>
        <div className='bg-black w-[40px] h-[40px] rounded-full flex justify-center items-center'>
         <img src="src\assets\file-video.png" alt="video" className='w-[24px] h-[24px]'/>
        </div>
        <div>
         <p className='text-sm font-semibold' >Total de albums</p>
         <p className='text-2xl'>{albums.length}</p>
        </div>
      </div>
      <div className='bg-white w-[250px] h-[87px] rounded-lg flex justify-center items-center gap-5 p-3' style={{maxWidth: 'auto'}}>
        <div className='bg-black w-[40px] h-[40px] rounded-full flex justify-center items-center'>
         <img src="src\assets\dollar-sign.png" alt="dollar" className='w-[24px] h-[24px]'/>
        </div>
        <div>
         <p className='text-sm font-semibold'>Valor investido</p>
         <p className='text-2xl'>R$ {totalPrice}</p>
        </div>
      </div>
      </div>
      </div>

      {albums.length > 0 ? (
        <div className='max-w-[1500px] ml-10 px-10 py-10 flex gap-8 flex-wrap'>
          {albums?.map((album, i) => (
            <div key={i} style={{ '--bg-fundo': `url(${album.imageUrl})` } as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-[245px] h-[245px] rounded-md hover:scale-110 transition">
              <div className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer ">
                <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-white flex flex-col gap-5 p-10 m-10'>
          <p className='text-4xl font-semibold'>Você ainda não possui nenhum disco...</p>
          <p className='text-2xl'>Experimente comprar alguns discos!</p>
        </div>
      )}
    </div>
  )
}