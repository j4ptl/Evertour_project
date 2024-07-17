import React from 'react';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="Loader"></div>

            <style jsx>{`
                .loader-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .Loader {
                    height: 150px;
                    width: 150px;
                    border-radius: 50%;
                    border: 18px solid grey;
                    border-top: 18px solid rgb(30, 120, 152);
                    animation: spin 2s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Loader;
