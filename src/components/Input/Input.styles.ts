import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${props => props.$hasError ? '#ff4d4f' : '#d9d9d9'};
    outline: none;
    font-size: 14px;

    &:focus {
        border-color: ${props => props.$hasError ? '#ff4d4f' : '#40a9ff'};
        box-shadow: 0 0 0 2px ${props => props.$hasError ? 'rgba(255,77,79,0.2)' : 'rgba(24,144,255,0.2)'};
    }
`;

export const ErrorMessage = styled.span`
  color: #ff4d4f;
  font-size: 12px;
`;