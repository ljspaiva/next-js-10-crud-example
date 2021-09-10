import { useState, useEffect } from 'react';

import { Link } from 'components';
import { cityService } from 'services';

export default Index;

function Index() {
    const [cities, setCities] = useState(null);

    useEffect(() => {
        cityService.getAll().then(rows => setCities(rows));
    }, []);

    function deleteCity(cityId) {
        setCities(cities.map(x => {
            if (x.cityId === cityId) { x.isDeleting = true; }
            return x;
        }));
        cityService.delete(cityId).then(() => {
            setCities(cities => cities.filter(x => x.cityId !== cityId));
        });
    }

    return (
        <div>
            <h1>Cidades</h1>
            <Link href="/cities/add" className="btn btn-sm btn-success mb-2">Adicionar</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Nome (Cidade)</th>
                        <th style={{ width: '30%' }}>Estado (UF)</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {cities && cities.map(city =>
                        <tr key={city.cityId}>
                            <td>{city.cityName}</td>
                            <td>{city.cityState}</td>     
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/cities/edit/${city.cityId}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                <button onClick={() => deleteCity(city.cityId)} className="btn btn-sm btn-danger btn-delete-city" disabled={city.isDeleting}>
                                    {city.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Excluir</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!cities &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {cities && !cities.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Sem registros a serem exibidos</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
