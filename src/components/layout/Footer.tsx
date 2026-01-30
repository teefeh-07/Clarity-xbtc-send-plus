import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>&copy; 2024 xBTC Send Plus. Built on Stacks.</p>
                <div className="footer-links">
                    <a href="https://github.com">GitHub</a>
                    <a href="/docs">Documentation</a>
                </div>
            </div>
        </footer>
    );
};