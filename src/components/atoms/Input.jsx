import React from "react";
import { Form } from "react-bootstrap";

function Input({ className = "", type = "text", as, ...props }) {
    const componentProps = {
        className,
        ...(as ? { as } : type === "textarea" ? { as: "textarea" } : { type }),
        ...props,
    };
    return <Form.Control {...componentProps} />;
}

export { Input };