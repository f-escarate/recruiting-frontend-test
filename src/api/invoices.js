const url = 'https://recruiting.api.bemmbo.com/invoices/pending';

export function getPendings() {
    return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error));
}