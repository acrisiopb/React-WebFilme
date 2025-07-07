"use client";
import { useState } from "react";
import './index.scss';

export default function ToggleButton({ onLabel = "Login", offLabel = "Cadastre-se" }) {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(prev => !prev);
        // console.log("Estado:", !isOn ? onLabel : offLabel);
    };

    return (
        <button
            onClick={toggle}
            className={`toggle-button ${isOn ? "on" : "off"}`}
        >
            {isOn ? onLabel : offLabel}
        </button>

    );
}
