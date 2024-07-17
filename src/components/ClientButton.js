// components/ClientButton.js
import React from 'react';

// This component can have event handlers because it's a Client Component
const ClientButton = () => {
    const handleClick = () => {
        console.log('Button clicked!');
    };

    return (
        <button onClick={handleClick}>Click Me</button>
    );
};

export default ClientButton;
