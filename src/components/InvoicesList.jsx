export default function InvoicesList({ invoices, handleCheck, radioName }) {
    return (
        <table>
            <thead></thead>
            <tbody>
                {invoices.map(invoice => (
                    <tr key={invoice.id}>
                        <td>
                            <input type="radio" id={invoice.id} name={radioName} value={invoice.id} onChange={()=>handleCheck(invoice.id)} />
                            {invoice.id} ({invoice.organization_id})    
                        </td>    
                        <td>
                            ${invoice.amount} {invoice.currency}    
                        </td>    
                        <td>
                            {invoice.reference}
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    )
}