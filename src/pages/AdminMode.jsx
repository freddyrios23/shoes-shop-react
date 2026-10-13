import { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import productosIniciales from '../data/products';
import Button from '../components/atoms/Button';

function AdminMode() {

    const [productos, setProductos] = useState(productosIniciales);

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
            <h1>Modo admin Supremo</h1>

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



            <Button 
                className="mt-1"
                variant="success" onClick={agregarProducto}>
                Agregar producto
            </Button>

            <Row>
                {productos.map(producto => (


                    <Col xs={6} key={producto.id}>
                        <Card className="my-3 p-3" key={producto.id} style={{ width: '300px', height: '350px' }}>
                            <Card.Img
                                src={producto.imagen}
                                style={{ width: '150px', height: '120px', objectFit: 'contain' }}
                            />

                            <Card.Body>
                                <Card.Title>{producto.nombre}</Card.Title>
                                <Card.Text>Precio: ${producto.precio}</Card.Text>

                                {idEditar === producto.id && (
                                    <div>
                                        <input
                                            type="text"
                                            style={{ width: '250px', height: '40px' }}
                                            value={nombreEditar}
                                            onChange={(e) => setNombreEditar(e.target.value)}
                                            placeholder="Nuevo nombre"
                                        />

                                        <input
                                            type="number"
                                            style={{ width: '80px', height: '40px' }}
                                            value={precioEditar}
                                            onChange={(e) => setPrecioEditar(e.target.value)}
                                            placeholder="Nuevo precio"
                                        />

                                        <Button variant="success" onClick={guardarEdicion}>
                                            Guardar
                                        </Button>
                                    </div>
                                )}

                                <Button
                                    className="me-2"
                                    variant="warning"
                                    onClick={() => editarProducto(producto)}
                                >
                                    Editar
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => eliminarProducto(producto.id)}
                                >
                                    Eliminar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}


export default AdminMode;
