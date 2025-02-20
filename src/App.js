import './App.css';
import { useEffect, useState } from 'react';
import { getPendings } from './api/invoices';
import { separateInvoices } from './utils/filters';
import InvoicesList from './components/InvoicesList';
import Modal from './components/Modal';
import SelectionSummary from './components/SelectionSummary';

function App() {
  const [received, setReceived] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [selectedReceived, setSelectedReceived] = useState(undefined);
  const [selectedCreditNote, setSelectedCreditNote] = useState(undefined);
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
  const assignCreditNote = () => {
    const newCreditNotes = creditNotes.filter(creditNote => creditNote.id !== selectedCreditNote);
    setCreditNotes(newCreditNotes);
    setSelectedReceived(undefined);
    setSelectedCreditNote(undefined);
    setIsOpen(false);
  };
  const summaryComponent = <SelectionSummary
    received={received}
    creditNotes={creditNotes}
    selectedReceived={selectedReceived}
    selectedCreditNote={selectedCreditNote}
  />;
  return (
    <div className="p-8 flex flex-col items-center gap-4 md:w-2/3 mx-auto">
      <h1 className="text-2xl font-bold text-center">Selecciona una factura</h1>
      <InvoicesList invoices={received} radioName="receivedInvoices"
        selectedID={selectedReceived} handleCheck={(id) => setSelectedReceived(id)}/>
      {selectedReceived && (
        creditNotes.length > 0 ?
          <>
          <h1 className="text-2xl font-bold text-center">Selecciona una nota de crédito</h1>
          <InvoicesList invoices={creditNotes} radioName="creditNotes"
            selectedID={selectedCreditNote} handleCheck={(id) => setSelectedCreditNote(id)}/>
          </>:
          <p className="text-center font-semibold">No hay notas de crédito disponibles</p>
      )}
      {selectedReceived && selectedCreditNote && (
        <>
        {summaryComponent}
        <button onClick={showModal}>
          Asignar
        </button>
        </>
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white rounded-lg p-4 flex flex-col gap-4 items-center">
          <img src="./check-world-vector-logo.svg" alt="check" className="w-16 h-16 mx-auto" />
          <p className="text-lg font-semibold text-wrap w-72 text-center">Nota de crédito asignada correctamente</p>
          {summaryComponent}
          <button onClick={assignCreditNote}>Seguir asignando</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
