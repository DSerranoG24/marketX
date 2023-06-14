'use client'

import { useState } from "react"
import Style from './registrar.module.css';
import image from '../../images/WhatsApp Image 2023-06-13 at 8.46.20 PM.jpeg';
import Image from "next/image";
import Link from "next/link";

export default function Registrarse() {
  const [usuario, setUsuario] = useState({
    usuario:'',
    correo:'',
    contraseña:'',
    confirme_su_contraseña:''
  });

  const handlerUsuario = (e)=>{
    const {value, name} = e.target;
    setUsuario({...usuario, [name]:value});
  };

  const handlerSubmit =(e)=>{
    e.preventDefault();
    console.log(usuario);
    setUsuario({
      usuario:'',
      correo:'',
      contraseña:'',
      confirme_su_contraseña:''
    })
  }

  return (
    <div className={Style.container}>
      <div className={Style.image}>
        <Image  src={image} 
        width={230} height={500} alt=""/>
      </div>
      <div className={Style.form}>
        <h1>Registrese gratis</h1>
        <span>usuario: </span>
        <input type="text" name="usuario" onChange={handlerUsuario} value={usuario.usuario}/><br />
        <span>correo: </span>
        <input type="text" name="correo" onChange={handlerUsuario} value={usuario.correo}/><br />
        <span>contraseña: </span>
        <input type="text" name="contraseña" onChange={handlerUsuario} value={usuario.contraseña}/><br />
        <span>confirme su contraseña: </span>
        <input type="text" name="confirme_su_contraseña" onChange={handlerUsuario} value={usuario.confirme_su_contraseña}/><br />
        
          <button type="submit" onClick={handlerSubmit}><Link href='/loging'>Continuar </Link></button>
       
      </div>
    </div>
  )
}
