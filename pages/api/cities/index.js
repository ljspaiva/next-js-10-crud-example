import { citiesRepo } from 'helpers';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getCities();
        case 'POST':
            return createCity();
        default:
            return res.status(405).end(`Método ${req.method} não permitido`)
    }

    function getCities() { 
        return res.status(200).json(citiesRepo.getAll());
    }
    
    function createCity() {
        try {
            citiesRepo.create(req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }
}
