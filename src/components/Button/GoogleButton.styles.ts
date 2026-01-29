import styled from 'styled-components';

export const GoogleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
    gap: 12px;

    & > div {
        width: 100%;
        display: flex;
        justify-content: center;
    }
`;

export const Divider = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    color: #8c8c8c;
    font-size: 14px;

    &::before, &::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid #d9d9d9;
    }

    &::before {
        margin-right: 12px;
    }

    &::after {
        margin-left: 12px;
    }
`;