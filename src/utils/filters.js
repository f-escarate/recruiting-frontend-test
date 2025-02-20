export function separateInvoices(invoices) {
    // Separate received invoices from credit notes
    const result = {
        received: [],
        creditNotes: []
    };
    for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].type === 'received') {
            result.received.push(invoices[i]);
        } else {
            result.creditNotes.push(invoices[i]);
        }
    }
    return result;
}