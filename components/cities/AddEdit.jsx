import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { cityService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const city = props?.city;
    const isAddMode = !city;
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        cityName: Yup.string()
            .required('Nome (Cidade) é obrigatório'),
        cityState: Yup.string()
            .required('Estado (UF) é obrigatório')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        const { password, confirmPassword, ...defaultValues } = city;
        formOptions.defaultValues = defaultValues;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createCity(data)
            : updateCity(city.cityId, data);
    }

    function createCity(data) {
        return cityService.create(data)
            .then(() => {
                alertService.success('Cidade Adicionada', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateCity(cityId, data) {
        return cityService.update(cityId, data)
            .then(() => {
                alertService.success('Cidade Atualizada', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{isAddMode ? 'Adicionar Cidade' : 'Editar Cidade'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Nome (Cidade)</label>
                    <input name="cityName" type="text" {...register('cityName')} className={`form-control ${errors.cityName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.cityName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Estado (UF)</label>
                    <input name="cityState" type="text" {...register('cityState')} className={`form-control ${errors.cityState ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.cityState?.message}</div>
                </div>
            </div>

            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Salvar
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/cities" className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}