import React from 'react'
import styled from 'styled-components'
import { FaLink } from 'react-icons/fa'

interface LinkBlockProps {
    url: string;
    text: string;
}

const Card = styled.span`
    display: inline-block;
    background: #f7f7fa;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    padding: 0.18em 0.7em;
    text-align: center;
    text-decoration: none;
    border: 1px solid #e0e0e0;
    color: #1677ff;
    font-size: 0.98em;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.13s, box-shadow 0.13s, background 0.13s, color 0.13s;
    margin: 0 0.15em;
    vertical-align: middle;
    &:hover {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 4px 16px rgba(22,119,255,0.13);
        background: #e6f0ff;
        color: #0d47a1;
    }
`;

export const LinkBlock = ({ url, text }: LinkBlockProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    return (
        <Card onClick={handleClick} tabIndex={0} role="link" aria-label={text}>
            <FaLink style={{ marginRight: '0.5em', marginTop: '0.2em' }} />
            {text}
        </Card>
    )
}