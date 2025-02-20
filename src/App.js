import './App.css';
import InvoicesList from './components/InvoicesList';
import { useEffect, useState } from 'react';
import { getPendings } from './api/invoices';
import { separateInvoices } from './utils/filters';

function App() {
  const [received, setReceived] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
    useEffect(() => {
        getPendings()
            .then(data => {
              const { received, creditNotes } = separateInvoices(data);
              setReceived(received);
              setCreditNotes(creditNotes);
            })
            .catch(error => console
            .error(error));
    }, []);
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-center">Selecciona un factura</h1>
      <InvoicesList invoices={received}/>
      {selectedInvoice && (
        <>
        <h1 className="text-2xl font-bold text-center">Selecciona una nota de crédito</h1>
        <InvoicesList invoices={creditNotes}/>
        </>
      )}
    </div>
  );
}

export default App;
