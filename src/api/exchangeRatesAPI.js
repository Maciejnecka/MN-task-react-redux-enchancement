/* eslint-disable default-param-last */
/* eslint-disable class-methods-use-this */
import API_KEY from '../../secretKey';

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
};

class ExchangeRatesAPI {
    url = 'https://openexchangerates.org/api';

    getCurrencies(signal) {
        const endpoint = `${this.url}/currencies.json?app_id=${API_KEY}`;
        const fetchOptions = { ...requestOptions, signal };

        return fetch(endpoint, fetchOptions)
            .then(this.handleErrors)
            .then((resp) => resp.json());
    }

    getTodayRate(signal, currency) {
        const endpoint = `${this.url}/latest.json?app_id=${API_KEY}&base=USD&symbols=${currency}`;
        const fetchOptions = { ...requestOptions, signal };

        return fetch(endpoint, fetchOptions)
            .then(this.handleErrors)
            .then((resp) => resp.json());
    }

    getLatestRates(signal) {
        const endpoint = `${this.url}/latest.json?app_id=${API_KEY}&base=USD`;
        const fetchOptions = { ...requestOptions, signal };

        return fetch(endpoint, fetchOptions)
            .then(this.handleErrors)
            .then((resp) => resp.json());
    }

    getHistoricalRates(date, signal, baseCurrency = 'USD') {
        const endpoint = `${this.url}/historical/${date}.json?app_id=${API_KEY}&base=${baseCurrency}`;
        const fetchOptions = { ...requestOptions, signal };

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
