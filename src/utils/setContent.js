import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/errorMessage';


const setContent = (process, Component, data) => {

    switch (process) {
        case 'waiting':
            return <Spinner />
            break;

        case 'loading':
            return <Spinner />
            break;

        case 'confirmed':
            return <Component data={data} />
            break;

        case 'error':
            return <ErrorMessage />
            break;
    }
}

export default setContent;