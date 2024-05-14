import React, { FormEvent, useState } from 'react'
import Input from '../../components/ui/Input'
import { api, user_api } from '../../services/apiService'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./style.css"

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSigup(event : FormEvent) {
    setLoading(true);
    event.preventDefault();

    const data = {
      name,
      email,
      password
    };
    
    await user_api.post('/users/create', data)
    .then( resp => {
      console.log(resp.data)
      toast.success("Conta criada com sucesso!")
      setLoading(false);
      navigate('/login')
    }).catch(err => {
      setLoading(false);
      console.log(err);
    });

    console.log(data);


  }

  return (
    <main className="bg-fundo bg-cover bg-no-repeat ">
      <div className='container flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm'>
        <div className="card flex flex-col bg-white rounded-md h-fit w-full max-w-[350px] items-center p-10 shadow-md">
        <img src="src\assets\logo.svg" alt="logo" className='w-full max-w-[35px]' />
        <h1 className="title text-2xl font-bold ">Criar conta</h1>
        <form onSubmit={handleSigup} className="flex flex-col w-full mt-8 gap-2">
          <Input type='text' onChange={event => setName(event.target.value)}>Nome</Input>
          <Input type='email' required onChange={event => setEmail(event.target.value)}>Email</Input>
          <Input type='tel' onChange={event => setTel(event.target.value)}>Telefone</Input>
          <Input type='password' required onChange={event => setPassword(event.target.value)}>Senha</Input>

          { loading ? 
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </Button>
            :
            <Button type='submit' disabled={false} className=" btn bg-zinc-900  hover:bg-zinc-900/90 transition text-white">
              Criar conta
            </Button>
          }
          <p className="text text-xs font-light flex justify-center py-2">Já tem uma conta ? <a href="/login" className="font-semibold underline px-1">Entrar</a></p>
        </form>
        </div>
      </div>
    </main>
  )
}
