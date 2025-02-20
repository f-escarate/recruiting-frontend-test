export default function InvoicesList({ invoices }){
    return (
        <table>
            <thead></thead>
            <tbody>
                {invoices.map(invoice => (
                    <tr key={invoice.id}>
                        <td>
                            {invoice.id} ({invoice.organization_id})    
                        </td>    
                        <td>
                            {invoice.amount} {invoice.currency}    
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