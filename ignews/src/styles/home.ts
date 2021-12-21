import styled from 'styled-components';

export const HomeContainer = styled.main`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1120px;
    height: calc(100vh - 5rem);

    margin: 0 auto;
    padding: 0 2rem;
`;

export const HomeContent = styled.section`
    max-width: 600px;

    > span {
        font-size: 1.5rem;
        font-weight: bold;
    }

    > h1 {
        font-size: 4.5rem;
        font-weight: 900;

        line-height: 4.5rem;
        margin-top: 2.5rem;
    }

    > h1 > span {
        color: var(--cyan-500);
    }

    > p {
        font-size: 1.5rem;

        line-height: 2.25rem;
        margin-top: 1.5rem;
    }

    > p > span {
        color: var(--cyan-500);
        
        font-weight: bold;
    }

    > button {
        margin-top: 2.5rem;
    }
`;
