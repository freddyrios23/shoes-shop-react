
import Text from "../components/atoms/Text";
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

            {/* Título de los productos destacados */}
            <Text variant="h2" className="text-center mt-5">
                Productos destacados
            </Text>

            {/* Mostramos solamente los primeros 3 productos */}
            <ProductList limite={3} />
        </>
    );
}

export default Home;
