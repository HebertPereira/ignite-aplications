import styled from 'styled-components';

interface HeaderStyleProps {
    isActive: boolean;
}

export const HeaderContainer = styled.header`
    height: 5rem;

    border-bottom: 1px sold var(--gray-800);
`;

export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    max-width: 1120px;
    height: 5rem;

    margin: 0 auto;
    padding: 0 2rem;

    > nav {
        margin-left: 5rem;
        height: 5rem;
    }

    > button {
        margin-left: auto;
    }
`;

export const HeaderContentAnchor = styled.a<HeaderStyleProps>`
    display: inline-block;
    position: relative;
    height: 5rem;
    
    padding: 0 0.5rem;
    line-height: 5rem;
    
    color: var(--gray-300);

    transition: color 0.2s;

    &:hover {
        color: var(--white)
    }

    & + a {
        margin-left: 2rem;
    }

    ${props => props.isActive ? `
        color: var(--white);
        font-weight: bold;
    `
        : ""
    }

    &::After {
        ${props => props.isActive ? `
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: 1px;
        left: 0;
        
        content: '';
        
        border-radius: 3px 3px 0 0;
        
        background-color: var(--yellow-500);
        `
        : ""}
    }
`;
