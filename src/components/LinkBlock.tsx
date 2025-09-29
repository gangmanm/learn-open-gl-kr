import React from 'react'
import styled from 'styled-components'
import { FaLink } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

interface LinkBlockProps {
    url: string;
    text: string;
}

const Card = styled.span<{ theme: any }>`
    display: inline-block;
    background: ${props => props.theme.mode === 'dark' ? '#1a365d' : '#f7f7fa'};
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    padding: 0.18em 0.7em;
    text-align: center;
    text-decoration: none;
    border: 1px solid ${props => props.theme.mode === 'dark' ? '#4096ff' : '#e0e0e0'};
    color: ${props => props.theme.mode === 'dark' ? '#4096ff' : '#1677ff'};
    font-size: 0.98em;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.13s, box-shadow 0.13s, background 0.13s, color 0.13s;
    margin: 0 0.15em;
    vertical-align: middle;
    &:hover {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 4px 16px ${props => props.theme.mode === 'dark' ? 'rgba(64,150,255,0.13)' : 'rgba(22,119,255,0.13)'};
        background: ${props => props.theme.mode === 'dark' ? '#2d5a87' : '#e6f0ff'};
        color: ${props => props.theme.mode === 'dark' ? '#60a5fa' : '#0d47a1'};
    }
`;

export const LinkBlock = ({ url, text }: LinkBlockProps) => {
    const { theme } = useTheme();
    
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    return (
        <Card onClick={handleClick} tabIndex={0} role="link" aria-label={text} theme={theme}>
            <FaLink style={{ marginRight: '0.5em', marginTop: '0.2em' }} />
            {text}
        </Card>
    )
}