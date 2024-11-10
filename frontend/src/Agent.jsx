import React, { useState } from 'react';

const Agent = ({currentObject}) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [showAgent, setShowAgent] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch("/api/agent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "prompt": input,
                "context": currentObject,
            }),
        }).then(response => {
            if (!response.ok) {
                // console.error(response)
                console.error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
            .then(data => {
                console.log("Success:", data);
                setResponse(data);
            })
            .catch(error => {
                console.error("Error:", error);
            })
            .finally(() => {
                console.log("Request completed.");
        });
    };

    return (
        <>
            <button style={{position: 'fixed', top: '10px', right: '10px', maxHeight: '2rem'}} onClick={() => {
                setShowAgent(!showAgent);
                setResponse('');
                setInput('');
            }}>
                Toggle Agent
            </button>
            {showAgent && (
                <div style={styles.agentContainer}>
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
            )}
        </>
    );
};

const styles = {
    agentContainer: {
        position: 'fixed',
        top: '40px',
        right: '10px',
        backgroundColor: 'white',
        width: '200px',
        height: '200px',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '5px',
        overflowY: 'scroll',
    },
};

export default Agent;