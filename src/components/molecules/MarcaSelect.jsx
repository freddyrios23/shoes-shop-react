import React from "react";
import { Form } from "react-bootstrap";
import { Input } from "../atoms/Input";

function MarcaSelect({ marcas, value, onChange }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Seleccionar marca</Form.Label>
            <Input
                as="select"
                value={value}
                onChange={onChange}
            >
                <option value="">Seleccione una marca</option>

                {marcas.map((marca) => (
                    <option key={marca.id} value={marca.id}>
                        {marca.nombre}
                    </option>
                ))}
            </Input>
        </Form.Group>
    );
}

export default MarcaSelect;
