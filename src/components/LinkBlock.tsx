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
    background: ${props => props.theme.mode === 'dark' ? 'rgba(64, 150, 255, 0.1)' : 'rgba(22, 119, 255, 0.05)'};
    border-radius: 4px;
    padding: 0.25em 0.6em;
    text-decoration: none;
    border: 1px solid ${props => props.theme.mode === 'dark' ? 'rgba(64, 150, 255, 0.3)' : 'rgba(22, 119, 255, 0.2)'};
    color: ${props => props.theme.mode === 'dark' ? '#60a5fa' : '#1677ff'};
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 0 0.2em;
    vertical-align: middle;
    
    &:hover {
        background: ${props => props.theme.mode === 'dark' ? 'rgba(64, 150, 255, 0.2)' : 'rgba(22, 119, 255, 0.1)'};
        border-color: ${props => props.theme.mode === 'dark' ? 'rgba(64, 150, 255, 0.5)' : 'rgba(22, 119, 255, 0.4)'};
        color: ${props => props.theme.mode === 'dark' ? '#93c5fd' : '#0d47a1'};
    }
    
    &:focus {
        outline: 2px solid ${props => props.theme.mode === 'dark' ? '#60a5fa' : '#1677ff'};
        outline-offset: 2px;
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
            <FaLink style={{ marginRight: '0.4em', fontSize: '0.85em' }} />
            {text}
        </Card>
    )
}