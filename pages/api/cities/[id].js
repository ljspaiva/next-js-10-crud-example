import { citiesRepo } from 'helpers';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getCityById();
        case 'PUT':
            return updateCity();
        case 'DELETE':
            return deleteCity();
        default:
            return res.status(405).end(`Método ${req.method} não é permitido`)
    }

    function getCityById() {
        const city = citiesRepo.getById(req.query.cityId);
        return res.status(200).json(city);
    }

    function updateCity() {
        try {
            citiesRepo.update(req.query.cityId, req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    function deleteCity() {
        citiesRepo.delete(req.query.cityId);
        return res.status(200).json({});
    }
}
