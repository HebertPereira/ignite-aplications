import styled from "styled-components";

export const SignInButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;

    color: var(--white);
    background-color: var(--gray-850);

    border-radius: 3rem;
    border: 0;
    
    padding: 0 1.5rem;

    > svg {
        width: 20px;
        height: 20px;
    }

    > svg:first-child {
        margin-right: 1rem;
    }

    > svg:last-child {
        margin-left: 1rem;
    }

    &:hover {
        filter: brightness(0.8);
    }
`;
