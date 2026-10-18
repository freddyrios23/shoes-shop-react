import { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';

function AdminMode({ productos, setProductos }) {



    //agregar
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');

    //editar
    const [idEditar, setIdEditar] = useState(null);
    const [nombreEditar, setNombreEditar] = useState('');
    const [precioEditar, setPrecioEditar] = useState('');

    function agregarProducto() {
        if (nombre === '' || precio === '') {
            alert('Debe completar el nombre y el precio');
            return;
        }

        const nuevoProducto = {
            id: Date.now(),
            nombre: nombre,
            precio: Number(precio),
            imagen: imagen
        };

        setProductos([...productos, nuevoProducto]);

        setNombre('');
        setPrecio('');
        setImagen('');
    }

    function editarProducto(producto) {
        setIdEditar(producto.id);
        setNombreEditar(producto.nombre);
        setPrecioEditar(producto.precio);
    }

    function guardarEdicion() {
        setProductos(productos.map(p =>
            p.id === idEditar
                ? { ...p, nombre: nombreEditar, precio: Number(precioEditar) }
                : p
        ));

        setIdEditar(null);
    }





    function eliminarProducto(id) {
        setProductos(productos.filter(p => p.id !== id));
    }


    return (
        <Container className="my-5">
            <Text variant="h1">Modo administrador</Text>

            <input
                className="form-control mb-2"
                type="text"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                className="form-control mb-3"
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
            />

            <input
                className="form-control mb-3"
                type="text"
                placeholder="URL de la imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
            />



            <Button
                className="mt-1"
                variant="success" onClick={agregarProducto}>
                Agregar producto
            </Button>

            <Row>
                {productos.map(producto => (


                    <Col xs={12} sm={6} lg={4} key={producto.id}>
                        <Card className="my-3 p-3" key={producto.id} style={{ width: '100%', minHeight: '350px' }}>
                            <Card.Img
                                src={producto.imagen}
                                style={{ width: '150px', height: '120px', objectFit: 'contain' }}
                            />

                            <Card.Body>
                                <Text variant="h5">{producto.nombre}</Text>
                                <Text variant="p">Precio: ${producto.precio}</Text>

                                {idEditar === producto.id && (
                                    <div>

                                        <input
                                            type="text"
                                            style={{ width: '100%', height: '35px', marginBottom: '8px', boxSizing: 'border-box' }}
                                            value={nombreEditar}
                                            onChange={(e) => setNombreEditar(e.target.value)}
                                            placeholder="Nuevo nombre"
                                        />

                                        <input
                                            type="number"
                                            style={{ width: '100%', height: '35px', marginBottom: '8px', boxSizing: 'border-box' }}
                                            value={precioEditar}
                                            onChange={(e) => setPrecioEditar(e.target.value)}
                                            placeholder="Nuevo precio"
                                        />



                                    </div>
                                )}

                                <div className="botones-admin" style={{ display: 'flex', gap: '20px' }}>
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
