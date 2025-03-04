import styled from 'styled-components'

export const HeaderContainer = styled.header`
    background-color: var(--blue);
`;

export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1120px;

    padding: 2rem 1rem 12rem;
    margin: 0 auto;

    button {
        font-size: 1rem;
        color: #fff;
        background-color: var(--blue-ligth);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 3rem;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;
