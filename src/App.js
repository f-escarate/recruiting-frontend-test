import './App.css';
import { useEffect, useState } from 'react';
import { getPendings } from './api/invoices';
import { separateInvoices } from './utils/filters';
import InvoicesList from './components/InvoicesList';
import Modal from './components/Modal';

function App() {
  const [received, setReceived] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [selectedReceived, setSelectedReceived] = useState(null);
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(true);
  };
  return (
    <div className="p-8 flex flex-col items-center gap-4">
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white rounded-lg p-4 flex flex-col gap-4 items-center">
          <img src="./check-world-vector-logo.svg" alt="check" className="w-16 h-16 mx-auto" />
          <p className="text-lg font-semibold text-wrap w-72 text-center">Nota de crédito asignada correctamente</p>
          <button onClick={() => setIsOpen(false)}>Seguir asignando</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
