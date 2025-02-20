import { findInvoiceById } from '../utils/filters';
import { toCLP } from '../utils/currency';

export default function SelectionSummary({  received, creditNotes, selectedReceived, selectedCreditNote }) {
    const creditNote = findInvoiceById(creditNotes, selectedCreditNote);
    const receivedInvoice = findInvoiceById(received, selectedReceived);
    const creditNoteAmount = toCLP(creditNote.amount, creditNote.currency);
    const receivedAmount = toCLP(receivedInvoice.amount, receivedInvoice.currency);
    return (
        <div className='grid grid-cols-2 gap-x-2 self-start'>
            <p className='font-medium'>ID nota de crédito:</p>
            <p className='font-light'>{selectedCreditNote}</p>
            <p className='font-medium'>ID factura:</p>
            <p className='font-light'>{selectedReceived}</p>
            <p className='font-medium'>Monto nota de crédito:</p>
            <p className='font-light'>{creditNoteAmount} CLP</p>
            <p className='font-medium'>Nuevo monto a pagar:</p>
            <p className='font-light'>{receivedAmount-creditNoteAmount} CLP</p>
          </div>
    )
}