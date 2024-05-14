import { Header } from '@/components/Header';
import { Carousel } from '../../components/Carousel/Carousel';
import { Search } from '../../components/Search';
import './style.css';

export function HomeAuth() {

  return (
    <div className='bg-fundoAuth bg-cover bg-center max-h-[540px] flex flex-col'>
      <div className='backdrop-brightness-50 '>
        <Header className='bg-fundoAuth'/>
        <div className='h-screen bg-gradient-to-b from-transparent from-20% to-[#19181f] to-30%'>
        <div className='w-full max-w-[500px] max-h-[80px]' style={{margin: '150px 50px 150px 50px'}}>
          <p className='text-4xl text text-white font-semibold py-5'>A história da música <br/> não pode ser esquecida!</p>
          <p className='text-white text2 text-lg'>Sucessos que marcaram o tempo!!!</p>
        </div>

        <div className='bg-[#19181f]'>
        <Search/>
        </div>
        </div>
      </div>
    </div>
  )
}
