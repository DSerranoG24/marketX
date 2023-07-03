'use client';

import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setSortOrder } from "../../redux/features/sortSlice";
// import Paginacion from "../../components/Paginacion/Paginacion";
import style from "./home.module.css";
import { useSession } from "next-auth/react";
import Loader from "../../components/Loaders/Loaders";
import { useGetUsersQuery } from "@/src/redux/services/userApi";
import axios from "axios";
// import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";
import Carousel from "../../components/Carousel/Carousel";
import CardsCarousel from '../../components/CardsCarousel/CardsCarousel'
import Link from "next/link";
// require('dotenv').config();

// const {  LOCALHOST } = process.env;

export default function HomePage() {
	const { data: session, status } = useSession();

  const objeto = {
    nombre: session?.user.name,
    correo: session?.user.email,
    contraseña: "65564521-44654894sda",
  };

  const { data, refetch } = useGetUsersQuery(null);

  useEffect(() => {
    refetch();
  }, []);
  const existente = data?.find((user) => user.correo === session?.user.email);

  const google = async () => {
    if (existente) {
      const guardadoString = JSON.stringify(existente);
      localStorage.setItem("usuario", guardadoString);
    } else {
      const url = await axios
        .post("https://marketx-production.up.railway.app/Usuario", objeto)
        .then((result) => {
          const guardadoString = JSON.stringify(url);
          localStorage.setItem("usuario", guardadoString);
          return result.data;
        })
        .catch((error) => error);
    }
  };
  let usuario= 0;
  if (typeof window !== 'undefined') {
    // Código que accede a localStorage aquí
    const usuarioJSON = localStorage.getItem("usuario") ?? null;
    usuario = JSON.parse(usuarioJSON);
  }

  if (!usuario) {
    google();
  }

	// const dispatch = useDispatch();
	// const [currentPage, setCurrentPage] = useState(0);
	// const [selectedCategory, setSelectedCategory] = useState('');

	// const handleSortOrder = (order) => {
	// 	if (order === 'restore') {
	// 		setSelectedCategory('');
	// 	} else {
	// 		dispatch(setSortOrder(order));
	// 	}
	// 	setCurrentPage(0);
	// };

	// const handleCategoryChange = (event) => {
	// 	setSelectedCategory(event.target.value);
	// 	setCurrentPage(0);
	// };

  // const router = useRouter();
  // const handelrRouter = (value) => {
  //   localStorage.clear();
  //   router.push(`/${value}`);
  // };

  // const routerDashBoard = () => {
  //   router.push("/admin");
  // };

  // const routerMisProductos = () => {
  //   router.push("/misProductos");
  // };

// 	const routerMisVentas = () => {
// 		router.push('/misVentas');
// 	};

// 	const routerMisCompras = () => {
// 		router.push('/misCompras');
// 	};

	if (status === 'loading') {
		return <Loader />;
	}

//   const handlerSalir =()=>{
//     signOut({ callbackUrl: `${LOCALHOST}/` })
//     localStorage.clear()
//     router.push('/')
//   }

  return (
    <div className={style.contenedor1}>
      <div className={style.contenedor2}>
      <Carousel/>

        {/* <div className={style.contenedorFiltros}>
          <select
            className={style.orfilbtn}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Todas las categorías</option>
            <option value="Placas de Video">Placas de video</option>
            <option value="Procesadores">Procesadores</option>
            <option value="Motherboard">Motherboards</option>
          </select>

          <button
            className={style.orfilbtn}
            onClick={() => handleSortOrder("price")}
          >
            MENOR A MAYOR PRECIO
          </button>
          <button
            className={style.orfilbtn}
            onClick={() => handleSortOrder("price-reverse")}
          >
            MAYOR A MENOR PRECIO
          </button> */}
          {/* <button onClick={() => handleSortOrder('quantitySold')}>
              MÁS VENDIDO
            </button> */}
          {/* <button className={style.orfilbtn} onClick={() => handleSortOrder('restore')}>RESTORE</button> */}
        
        
        <div className={style.contenedor3}>
          <h3 className={style.publiRecientes} style={{marginLeft: '20px', fontWeight: 'bold'}}>Publicaciones recientes</h3>
          <Link href={'/productos'}>
            <button type="button" class="btn btn-primary btn-lg" style={{marginRight: '20px', marginBottom: '10px', fontSize: '25px'}}> Ver todos los productos</button>
          </Link>
        </div>

          <CardsCarousel/>
        </div>
      </div>
  )



         {/* <Paginacion
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          selectedCategory={selectedCategory}
        />  */}

      {/* <div className={style.contenedor3}>
        <div className={style.panel}>
          <div className={style.linea}></div>

					<div className={style.panel2}>
						<span className={style.dropdownItemMenu}>Menu</span>
						{session ? (
							<li
								className={style.dropdownItem5}
								style={{ textDecoration: 'none', color: 'inherit' }}
								onClick={handlerSalir}
							>
								cerrar sesion
							</li>
						) : (
							<>
								<li
									className={style.dropdownItem}
									style={{
										textDecoration: 'none',
										color: 'inherit',
										cursor: 'pointer',
									}}
									onClick={() => handelrRouter('loging')}
								>
									Iniciar sesión
								</li>

								<li
									className={style.dropdownItem2}
									style={{
										textDecoration: 'none',
										color: 'inherit',
										cursor: 'pointer',
									}}
									onClick={() => handelrRouter('registrarse')}
								>
									Registrarse
								</li>
							</>
						)}

						<li
							className={style.dropdownItem4}
							style={{ textDecoration: 'none', color: 'inherit' }}
							onClick={routerMisProductos}
						>
							mis productos
						</li>
						<li
							className={style.dropdownItem4}
							style={{ textDecoration: 'none', color: 'inherit' }}
							onClick={routerMisVentas}
						>
							Mis Ventas
						</li>
						<li
							className={style.dropdownItem4}
							style={{ textDecoration: 'none', color: 'inherit' }}
							onClick={routerMisCompras}
						>
							Mis Compras
						</li>

          </div>
        </div>
      </div> */}

}
