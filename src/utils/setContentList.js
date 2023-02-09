import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/errorMessage';

const setContentList = (process, newItemsLoading, component) => {

    switch (process) {
        case 'waiting':
            return newItemsLoading ? component : <Spinner />
            break;

        case 'loading':
            return newItemsLoading ? component : <Spinner />
            break;

        case 'confirmed':
            return component
            break;

        case 'error':
            return <ErrorMessage />
            break;
    }
}

export default setContentList