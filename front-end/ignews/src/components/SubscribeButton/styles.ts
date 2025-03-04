import styled from "styled-components";

export const SubscribeButttonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 260px;
    height: 4rem;

    background-color: var(--yellow-500);
    color: var(--gray-900);

    font-size: 1.25rem;
    font-weight: bold;

    border: 0;
    border-radius: 2rem;

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.8);
    }
`;