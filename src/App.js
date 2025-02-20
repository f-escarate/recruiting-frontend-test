import './App.css';
import InvoicesList from './components/InvoicesList';
import { useEffect, useState } from 'react';
import { getPendings } from './api/invoices';

function App() {
  const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        getPendings()
            .then(data => setInvoices(data))
            .catch(error => console
            .error(error));
    }, []);
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-center">Invoices</h1>
      <InvoicesList invoices={invoices}/>
    </div>
  );
}

export default App;
