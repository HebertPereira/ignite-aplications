import styled from "styled-components";
import { darken, transparentize } from 'polished';

interface TransactionTypeStyleProps {
   buttonType: string;
}

export const NewTransactionModalContainer = styled.form`
     > h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
     }

     > input {
        width: 100%;
        height: 4rem;

        background: #e7e9ee;
        
        border-radius: 0.25rem;
        border: 1px solid #d7d7d7;

        font-size: 400;
        font-size: 1rem;
        
        padding:  0 1.5rem;

        &::placeholder {
           color: var(--text-body);
        }

        & + input {
           margin-top: 1rem;
        }
      }

      > button[type="submit"] {
         width: 100%;
         height: 4rem;

         background: var(--green);
         color: #FFF;

         border-radius: 0.25rem;
         border: 0;

         font-size: 1.5rem;
         font-weight: 600;

         margin-top: 1.5rem;
         padding: 0 1.5rem;

         transition: filter 0.2s;

         &:hover {
         filter: brightness(0.9);
         }
     }
`;

export const TransactionTypeContainer = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 0.5rem;

   margin: 1rem 0;
`;

export const TransactionTypeButton = styled.button<TransactionTypeStyleProps>`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 4rem;

   ${props => props.buttonType === "withdraw" ? `background-color: ${transparentize(0.9, "#E52E4D")};` : ""}
   ${props => props.buttonType === "deposit" ? `background-color: ${transparentize(0.9, "#33CC95")};` : ""}
   
   border: 1px solid #d7d7d7;
   
   transition: border-color 0.2s;
   
   &:hover {
      border-color: ${darken(0.1, '#d7d7d7')};
   }

   img {
      width: 20px;
      height: 20px;
   }
   
   span {
      display: inline-block;
      
      margin-left: 1rem;
      
      font-size: 1rem;
      
      color: var(--text-title);
   }
`;