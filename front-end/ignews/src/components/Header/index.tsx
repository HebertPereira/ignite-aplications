import React from 'react';

import { SignInButton } from '../SignInButton';

import {
    HeaderContainer,
    HeaderContent,
    HeaderContentAnchor
} from './styles';

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <HeaderContentAnchor isActive={true}>Home</HeaderContentAnchor>
                    <HeaderContentAnchor isActive={false}>Posts</HeaderContentAnchor>
                </nav>
                <SignInButton />
            </HeaderContent>
        </HeaderContainer>
    );
}
