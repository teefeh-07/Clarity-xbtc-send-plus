import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Container: React.FC<ContainerProps> = ({
    children,
    size = 'lg'
}) => {
    return (
        <div className={`container container-${size}`}>
            {children}
        </div>
    );
};