import { findInvoiceById } from '../utils/filters';
import { toCLP } from '../utils/currency';

export default function SelectionSummary({  received, creditNotes, selectedReceived, selectedCreditNotes }) {
    const selectedCreditNotesObjs = selectedCreditNotes.map(id => findInvoiceById(creditNotes, id));
    const receivedInvoice = findInvoiceById(received, selectedReceived);
    const creditNotesAmounts = selectedCreditNotesObjs.map(creditNote => toCLP(creditNote.amount, creditNote.currency));
    const receivedAmount = toCLP(receivedInvoice.amount, receivedInvoice.currency);
    return (
        <div className='grid grid-cols-2 self-start'>
            <p className='font-medium'>ID factura:</p>
            <p className='font-light text-right'>{selectedReceived}</p>
            <p className='font-medium border-slate-400 border-t-2'>ID nota de crédito</p>
            <p className='font-medium border-slate-400 border-t-2 text-right'>Monto nota de crédito</p>
            {selectedCreditNotesObjs.map((creditNote, i) => (
                <CreditNoteSummary key={i} id={creditNote.id} clpAmount={creditNotesAmounts[i]} />
            ))}
            <p className='font-medium border-slate-400 border-t-2'>Nuevo monto a pagar:</p>
            <p className='font-light  border-slate-400 border-t-2 text-right pr-2'>{receivedAmount - creditNotesAmounts.reduce((acc, curr) => acc + curr, 0)} CLP</p>
          </div>
    )
}
function CreditNoteSummary({ id, clpAmount }){
    return (
        <>
            <p className='font-light pr-2'>{id}</p>
            <p className='font-light pr-2 text-right'>{clpAmount} CLP</p>
        </>
    )
}