import styled from 'styled-components';

export const StyledButton = styled.button<{ $primary?: boolean }>`
    padding: 12px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;

    background-color: ${props => props.$primary ? '#1890ff' : '#f5f5f5'};
    color: ${props => props.$primary ? '#fff' : '#000'};

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        background-color: #f5f5f5;
        color: #b8b8b8;
        cursor: not-allowed;
    }
`;