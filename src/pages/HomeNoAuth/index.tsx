import { Link } from "react-router-dom"
import './style.css';


export function HomeNoAuth(){
  return(
    <div className="bg-fundo bg-cover bg-no-repeat">
      <div className="h-screen backdrop-brightness-50 bg-cover">
        <div className="bg-fundo bg-cover">
        <header className="p-2 flex items-center justify-between bg-white/30 backdrop-blur-md backdrop-brightness-50">
          <div className="flex px-20  logoNav">
            <img src="src\assets\logo.svg" alt="img" className="logo"/>
            <p className="headerText px-2 py-3 text-white">Bootplay</p>
          </div>
         <div className="navBtn px-20">
          <Link to='/login' className="headerBtn py-2 px-14 mx-2 bg-black font-semibold text-white rounded-full hover:bg-zinc-900/90 transition">Entrar</Link>                 
          <Link to="/signup" className="headerBtn py-2 px-10 mx-2 bg-blue-200 font-semibold rounded-full hover:bg-blue-300 transition">Inscrever-se</Link>
        </div>
        </header>
        </div>
      <div className="flex items-center card mx-20 my-5">
        <div className="card2 m-20 w-full max-w-[701px] h-1/2 ">
          <p className="textCard text-white text-5xl font-semibold my-5">A história da música não pode ser esquecida!</p>
          <p className="textCard2 text-white text-xl w-8/12">
             Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil.
          </p>
          <div className="pt-10">
          <Link to='/signup' className="cardBtn py-3 px-14 bg-blue-200 font-semibold rounded-full hover:bg-blue-300 transition">Inscrever-se</Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}