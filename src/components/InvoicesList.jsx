import { toCLP, toUSD } from "../utils/currency";

export default function InvoicesList({ invoices, radioName, selectedID, handleCheck }) {
    return (
        <table>
            <thead></thead>
            <tbody>
                {invoices.map(invoice => (
                    <tr key={invoice.id} className={"cursor-pointer border-2 h-12" + (selectedID===invoice.id ? " selected" : "")}
                        onClick={()=>handleCheck(invoice.id)}>
                        <td>
                            <div className="flex gap-1 items-center h-12">
                                <input type="radio" id={invoice.id} name={radioName}
                                    checked={selectedID === invoice.id}  value={selectedID} onChange={()=>handleCheck(invoice.id)} />
                                <p className="text-ellipsis w-24 overflow-hidden">
                                    {invoice.id} 
                                </p>
                                <p className="light">
                                    ({invoice.organization_id})
                                </p>  
                            </div>
                        </td>    
                        <td>
                            <CurrencyCell amount={invoice.amount} currency={invoice.currency} />
                        </td>    
                        <td className="text-right">
                            <p className="light">
                                {invoice.type === "received" ? "Recibida" : invoice.reference}
                            </p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
function CurrencyCell({ amount, currency }) {
    
    return (
        <div className="flex gap-1 items-center h-12 text-center justify-center">
            <p>
                ${toCLP(amount, currency)} CLP
            </p>
            <p className="light">
                (${toUSD(amount, currency)} USD)
            </p>
        </div>
)
}