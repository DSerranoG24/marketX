'use client';

import React, { useEffect, useState } from 'react';
import styles from './misCompras.module.css';
import { useGetVentasQuery } from '../../redux/services/ventasApi';
import Loading from '@/src/components/Loaders/Loaders';
import { useRouter } from 'next/navigation';

function Page() {
	const { data, refetch, isLoading } = useGetVentasQuery(null);
	const router = useRouter();
	const [ventas, setVentas] = useState([]);
	const [usuario, setUsuario] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			await refetch();
		};

		fetchData();
	}, [refetch]);

	useEffect(() => {
		if (data) {
			setVentas(data.result);

			if (typeof window !== 'undefined') {
				const usuarioJSON = localStorage.getItem('usuario');
				const parsedUsuario = JSON.parse(usuarioJSON);
				setUsuario(parsedUsuario);
			}
		}
	}, [data]);

	if (isLoading) {
		return <Loading />;
	}

	const misCompras = Array.isArray(ventas)
		? ventas.filter((venta) => venta.comprador.correo === usuario?.correo)
		: [];

	const goBack = () => {
		router.back();
		};

	return (
		<div>
			<div >
			<button onClick={goBack} className={styles.link}>Volver</button>
			</div>
			<div className={styles.conteiner}>
				<div className={styles.contenedorTitulo}>
					<h1 className={styles.titulo}>Mis compras</h1>
				</div>

				<div className={styles.addButtonContainer}></div>
				<table className={styles.userTable}>
					<thead>
						<tr>
							<th>PRODUCTO</th>
							<th>CANTIDAD</th>
							<th>EMAIL VENDEDOR</th>
							<th>PRECIO</th>
							<th>FECHA</th>
							<th>ESTADO</th>
						</tr>
					</thead>
					<tbody>
						{misCompras.map((venta, index) => (
							<tr key={index}>
								<td>{venta.producto}</td>
								<td>{venta.cantidad}</td>
								<td>{venta.vendedor.correo}</td>
								<td>{venta.monto}</td>
								<td>{new Date(venta.fecha).toLocaleDateString('es-ES')}</td>
								<td
									className={styles.estados}
									style={{ color: venta.despachado ? 'green' : 'black' }}
								>
									{venta.despachado ? 'Despachado' : 'Envío Pendiente'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Page;