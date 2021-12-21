import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

import { SignInButtonContainer } from './styles';

export function SignInButton() {
    const { data: session } = useSession();

    console.log(session);
    return session ? (
        <SignInButtonContainer
            type="button"
            onClick={() => signOut()}
        >
            <FaGithub color="#04d361" />
            {session.user.name}
            <FiX color="#737380" />
        </SignInButtonContainer>
    ) : (
        <SignInButtonContainer
            type="button"
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417" />
            Sign In with GitHub
        </SignInButtonContainer>
    );
}
