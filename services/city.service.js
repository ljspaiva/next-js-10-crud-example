import { apiUrl } from 'config';
import { fetchWrapper } from 'helpers';

export const cityService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/cities`;

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(cityId) {
    return fetchWrapper.get(`${baseUrl}/${cityId}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(cityId, params) {
    return fetchWrapper.put(`${baseUrl}/${cityId}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(cityId) {
    return fetchWrapper.delete(`${baseUrl}/${cityId}`);
}
