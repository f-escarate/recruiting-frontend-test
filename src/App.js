import './App.css';
import InvoicesList from './components/InvoicesList';
import { useEffect, useState } from 'react';
import { getPendings } from './api/invoices';
import { separateInvoices } from './utils/filters';

function App() {
  const [received, setReceived] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [selectedReceived, setSelectedReceived] = useState(null);
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);
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
  const showModal = () => {
  };
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-center">Selecciona un factura</h1>
      <InvoicesList invoices={received} handleCheck={(id) => setSelectedReceived(id)} radioName="receivedInvoices"/>
      {selectedReceived && (
        <>
        <h1 className="text-2xl font-bold text-center">Selecciona una nota de crédito</h1>
        <InvoicesList invoices={creditNotes} handleCheck={(id) => setSelectedCreditNote(id)} radioName="creditNotes"/>
        </>
      )}
      {selectedReceived && selectedCreditNote && (
        <button onClick={showModal}>
          Asignar
        </button>
      )}
    </div>
  );
}

export default App;
