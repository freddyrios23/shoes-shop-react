import { useState } from "react";
import Text from "../components/atoms/Text";
import { Input } from "../components/atoms/Input";
import Button from "../components/atoms/Button";

function Contact() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [asunto, setAsunto] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [enviado, setEnviado] = useState(false);

    const enviarFormulario = () => {
        if (
            !nombre.trim() ||
            !correo.trim() ||
            !asunto.trim() ||
            !mensaje.trim()
        ) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const correoValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

        if (!correoValido || correo.includes("..")) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        setEnviado(true);
    };

    return (
        <>
            <Text variant="h1" className="text-center mt-4">
                Contacto
            </Text>

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
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="contact-field">
                    <Text variant="p">Correo electrónico</Text>
                    <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>

                <div className="contact-field">
                    <Text variant="p">Asunto</Text>
                    <Input
                        type="text"
                        placeholder="¿Sobre qué trata tu consulta?"
                        value={asunto}
                        onChange={(e) => setAsunto(e.target.value)}
                    />
                </div>

                <div className="contact-field">
                    <Text variant="p">Mensaje</Text>
                    <Input
                        type="textarea"
                        placeholder="Escribe tu mensaje aquí..."
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    />
                </div>

                <Button
                    variant="primary"
                    className="contact-button"
                    onClick={enviarFormulario}
                >
                    Enviar
                </Button>

                {enviado && (
                    <p role="status" className="text-success mt-3">
                        ¡Gracias por contactarnos! Tu mensaje fue enviado.
                    </p>
                )}
            </div>
        </>
    );
}

export default Contact;
