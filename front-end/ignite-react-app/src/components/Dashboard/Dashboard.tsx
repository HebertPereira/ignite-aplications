import React from 'react';
import Summary from '../Summary/Summary';
import TransactionsTable from '../TransactionsTable/TransactionsTable';

import { DashboardContainer } from './styles'

function Dashboard() {
    return (
        <DashboardContainer>
            <Summary />
            <TransactionsTable />
        </DashboardContainer>
    );
}

export default Dashboard;