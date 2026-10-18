import Text from "../components/atoms/Text";

function About(){
    return(
        <div className="about-container">
            {/* Título principal */}
            <Text variant="h1">Sobre Nosotros</Text>

            {/* Presentación de la tienda */}
            <div className="about-intro">
                <Text variant="h2">Bienvenidos a Shoes Shop</Text>
                <Text variant="p"> 
                    Somos una tienda dedicada a la venta de zapatillas, donde buscamos combinar estilo, comodidad y calidad para nuestros clientes.
                    Nuestro objetivo es ofrecer una variedad de modelos que se adapten a diferentes gustos y ocasiones, para que cada persona pueda encontrar las zapatillas ideales para su estilo.
                    En Shoes Shop queremos que comprar sea una experiencia sencilla, cómoda y confiable. ¡Encuentra tu estilo con nosotros!
                </Text>
            </div>

            {/* Historia de la tienda */}
            <div className="about-section">
                <Text variant="h2">
                    Nuestra historia
                </Text>
                <Text variant="p">
                    Nace como una propuesta de tienda online para que las personas puedan explorar y encontrar zapatillas de manera fácil y cómoda.
                </Text>
            </div>

            {/* Misión de la tienda */}
            <div className="about-section">
                <Text variant="h2">Nuestra misión</Text>
                <Text variant="p">Ofrecer una experiencia de compra sencilla, con diferentes modelos de zapatillas para distintos estilos y preferencias.</Text>
            </div>

            {/* Compromiso con los clientes */}
            <div className="about-section">
                <Text variant="h2">Nuestro compromiso</Text>
                <Text variant="p">Brindar una navegación clara, información de los productos y una experiencia agradable al comprar en línea.</Text>
            </div>
            
        </div>
    )
}

export default About;
