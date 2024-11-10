import React, { useState } from 'react';

const Agent = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });
            const data = await res.json();
            setResponse(data.answer);
        } catch (error) {
            console.error('Error fetching the agent response:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask the agent..."
                />
                <button type="submit">Submit</button>
            </form>
            {response && <p>Agent Response: {response}</p>}
        </div>
    );
};

export default Agent;