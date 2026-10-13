// Importamos el átomo Text para mostrar títulos y párrafos
import Text from "../components/atoms/Text";

// Importamos el componente ProductList para reutilizar las tarjetas
import ProductList from "../components/organims/ProductList";

function Home() {
    return (
        <>
            {/* Título principal de la página de inicio */}
            <Text variant="h1" className="text-center mt-4">
                Bienvenidos a Shoes Shop
            </Text>

            {/* Descripción de nuestra tienda */}
            <Text variant="p" className="text-center">
                Tu estilo, tus zapatillas. Encuentra el par perfecto para cada ocasión.
            </Text>

            {/* Título de la sección de productos destacados */}
            <Text variant="h2" className="text-center mt-5">
                Productos destacados
            </Text>

            {/* Mostramos solo las primeras 3 zapatillas en el Home */}
            <ProductList limite={3} />
        </>
    );
}

export default Home;