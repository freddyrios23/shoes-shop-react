import Text from '../atoms/Text';


function CardBody({ title, description, price }) {
    return (
        <>
            {/* Nombre del producto */}
            <Text variant="h5">{title}</Text>

            {/* Descripción del producto */}
            <Text variant="p">{description}</Text>

            {/* Precio formateado según el formato chileno */}
            <Text variant="span" className="text-muted">
                ${price.toLocaleString("es-CL")}
            </Text>
        </>
    );
}

export default CardBody;