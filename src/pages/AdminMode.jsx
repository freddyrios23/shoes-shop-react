
import { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import { Input } from '../components/atoms/Input';

import ProductForm from '../components/molecules/ProductForm';

import { obtenerMarcas } from "../services/marcasService";
import {
    registrarZapatilla,
    actualizarZapatilla,
    eliminarZapatilla
} from "../services/zapatillasService";

function AdminMode({ productos, setProductos }) {

    // Guardamos las marcas que vienen del backend
    const [marcas, setMarcas] = useState([]);

    // Guardamos la marca seleccionada
    const [marcaId, setMarcaId] = useState("");

    // Estados del formulario para agregar
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');

    // Estados para editar productos
    const [idEditar, setIdEditar] = useState(null);
    const [nombreEditar, setNombreEditar] = useState('');
    const [precioEditar, setPrecioEditar] = useState('');

    // Consultar marcas al abrir el administrador
    useEffect(() => {

        const cargarMarcas = async () => {
            try {
                const respuesta = await obtenerMarcas();

                const lista = respuesta?._embedded?.marcaDTOList || [];

                setMarcas(lista);

            } catch (error) {
                console.error("Error al cargar marcas:", error);
                alert("No se pudieron cargar las marcas.");
            }
        };

        cargarMarcas();

    }, []);

    // Registrar zapatilla en Spring Boot
    async function agregarProducto() {

        if (nombre.trim() === '' || precio === '' || marcaId === '') {
            alert('Debe completar el nombre, precio y seleccionar una marca');
            return;
        }

        try {

            const nuevaZapatilla = {
                nombre: nombre.trim(),
                precio: Number(precio),
                imagen: imagen,
                marca: {
                    id: Number(marcaId)
                }
            };

            const respuesta = await registrarZapatilla(nuevaZapatilla);

            const marcaSeleccionada = marcas.find(
                (marca) => Number(marca.id) === Number(marcaId)
            );

            const productoCreado = {
                ...respuesta,
                marcaId: Number(marcaId),
                nombreMarca: marcaSeleccionada?.nombre || '',
                imagen: respuesta.imagen || imagen
            };

            setProductos([...productos, productoCreado]);

            // Limpiar formulario
            setNombre('');
            setPrecio('');
            setImagen('');
            setMarcaId('');

            alert('¡Zapatilla registrada correctamente!');

        } catch (error) {

            console.error("Error al registrar zapatilla:", error);

            alert(
                error.response?.data?.message ||
                "No se pudo registrar la zapatilla."
            );
        }
    }

    // Seleccionar producto para editar
    function editarProducto(producto) {
        setIdEditar(producto.id);
        setNombreEditar(producto.nombre);
        setPrecioEditar(producto.precio);
    }

    // Guardar cambios del producto en Spring Boot
    async function guardarEdicion() {

        if (nombreEditar.trim() === '' || precioEditar === '') {
            alert('Debe completar el nombre y el precio');
            return;
        }

        try {
            const datosActualizados = {
                nombre: nombreEditar.trim(),
                precio: Number(precioEditar)
            };

            const respuesta = await actualizarZapatilla(
                idEditar,
                datosActualizados
            );

            // Actualizamos el producto en React
            setProductos(productos.map(p =>
                p.id === idEditar
                    ? {
                        ...p,
                        nombre: respuesta.nombre,
                        precio: respuesta.precio
                    }
                    : p
            ));

            setIdEditar(null);

            alert('¡Zapatilla actualizada correctamente!');

        } catch (error) {
            console.error("Error al actualizar zapatilla:", error);

            alert(
                error.response?.data?.message ||
                "No se pudo actualizar la zapatilla."
            );
        }
    }   
    
    // Eliminar zapatilla desde Spring Boot
    async function eliminarProducto(id) {

        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar esta zapatilla?"
        );

        if (!confirmar) return;

        try {

            await eliminarZapatilla(id);

            // Actualizamos el listado de React
            setProductos(productos.filter(p => p.id !== id));

            alert("¡Zapatilla eliminada correctamente!");

        } catch (error) {

            console.error("Error al eliminar zapatilla:", error);

            alert(
                error.response?.data?.message ||
                "No se pudo eliminar la zapatilla."
            );
        }
    }

    return (
        <Container className="my-5">

            <Text variant="h1">Modo administrador</Text>

            {/* Formulario separado en una molécula */}
            <ProductForm
                nombre={nombre}
                setNombre={setNombre}
                precio={precio}
                setPrecio={setPrecio}
                imagen={imagen}
                setImagen={setImagen}
                marcas={marcas}
                marcaId={marcaId}
                setMarcaId={setMarcaId}
                onSubmit={agregarProducto}
            />

            {/* Listado de productos */}
            <Row>
                {productos.map(producto => (
                    <Col xs={12} sm={6} lg={4} key={producto.id}>

                        <Card
                            className="my-3 p-3"
                            style={{ width: '100%', minHeight: '350px' }}
                        >

                            <Card.Img
                                src={producto.imagen}
                                style={{
                                    width: '150px',
                                    height: '120px',
                                    objectFit: 'contain'
                                }}
                            />

                            <Card.Body>

                                <Text variant="h5">
                                    {producto.nombre}
                                </Text>

                                <Text variant="p">
                                    Precio: ${producto.precio}
                                </Text>

                                {idEditar === producto.id && (
                                    <div>

                                        <Input
                                            type="text"
                                            className="mb-2"
                                            value={nombreEditar}
                                            onChange={(e) => setNombreEditar(e.target.value)}
                                            placeholder="Nuevo nombre"
                                        />

                                        <Input
                                            type="number"
                                            className="mb-2"
                                            value={precioEditar}
                                            onChange={(e) => setPrecioEditar(e.target.value)}
                                            placeholder="Nuevo precio"
                                        />

                                    </div>
                                )}

                                <div
                                    className="botones-admin"
                                    style={{
                                        display: 'flex',
                                        gap: '20px'
                                    }}
                                >

                                    <Button
                                        variant="warning"
                                        size="md"
                                        style={{ width: '80px' }}
                                        onClick={() => editarProducto(producto)}
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        variant="danger"
                                        size="md"
                                        style={{ width: '90px' }}
                                        onClick={() => eliminarProducto(producto.id)}
                                    >
                                        Eliminar
                                    </Button>

                                    <Button
                                        variant="success"
                                        style={{ width: '90px' }}
                                        onClick={guardarEdicion}
                                    >
                                        Guardar
                                    </Button>

                                </div>

                            </Card.Body>
                        </Card>

                    </Col>
                ))}
            </Row>

        </Container>
    );
}

export default AdminMode;
