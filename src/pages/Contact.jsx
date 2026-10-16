import Text from "../components/atoms/Text";
import { Input } from "../components/atoms/Input";
import Button from "../components/atoms/Button";

function Contact() {
    return (
        <>
            <Text variant="h1" className="text-center mt-4">Contacto</Text>
            <Text variant="p" className="text-center mt-4">
                ¿Tienes alguna consulta sobre nuestros productos?
                Estamos aquí para ayudarte y resolver tus dudas sobre Shoes Shop.
            </Text>
            <div className="contact-container">
                <div className="contact-field">
                    <Text variant="p">Nombre completo</Text>
                    <Input
                        type="text"
                        placeholder="Escribe tu nombre"
                    />
                </div>
                <div className="contact-field">
                    <Text variant="p">Correo electrónico</Text>
                    <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                    />
                </div>
                <div className="contact-field">
                    <Text variant="p">Asunto</Text>
                    <Input
                        type="text"
                        placeholder="¿Sobre qué trata tu consulta?"
                    />
                </div>
                <div className="contact-field">
                    <Text variant="p">Mensaje</Text>
                    <Input
                        type="textarea"
                        placeholder="Escribe tu mensaje aquí..."
                    />
                </div>
                <Button
                    variant="primary"
                    className="contact-button"
                    onClick={() => alert("Mensaje enviado")}
                >
                    Enviar
                </Button>

            </div>
        </>
    );
}

export default Contact;
