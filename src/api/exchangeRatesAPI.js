/* eslint-disable class-methods-use-this */
const API_KEY = 'd51f20596cae4c668a010b14cf358256';

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
};

class ExchangeRatesAPI {
    url = 'https://openexchangerates.org/api';

    getRates(options, signal) {
        const { date, symbols } = options;
        const dateQuery = date || 'latest';
        const fetchOptions = { ...requestOptions, signal };
        const endpoint = `${this.url}/historical/${dateQuery}.json?app_id=${API_KEY}&symbols=${symbols}`;

        return fetch(endpoint, fetchOptions)
            .then(this.handleErrors)
            .then((resp) => resp.json());
    }

    handleErrors(resp) {
        if (!resp.ok) {
            throw Error(`Problem fetching data: ${resp.statusText}`);
        }
        return resp;
    }
}

export default ExchangeRatesAPI;
