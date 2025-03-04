import React, { useState } from 'react';
import Modal from 'react-modal';

import Dashboard from './components/Dashboard/Dashboard';
import NewTransactionModal from './components/NewTransactionModal/NewTransactionModal';
import { Header } from './components/Header/Header';
import { TransactionProvider } from './providers/Auth';

Modal.setAppElement('#root');

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionProvider>
  );
}

export default App;
