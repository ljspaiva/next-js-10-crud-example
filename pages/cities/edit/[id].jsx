import { AddEdit } from 'components/cities';
import { cityService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const city = await cityService.getById(params.cityId);

    return {
        props: { city }
    }
}