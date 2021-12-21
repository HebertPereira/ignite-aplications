import React from 'react';

import { HeaderContainer, HeaderContent } from './styles';

import logoImg from "../../assets/logo.svg"

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </HeaderContent>
        </HeaderContainer>
    );
}