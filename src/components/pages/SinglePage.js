
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({ funcType, Page }) => {
    const [result, setResult] = useState();
    const { id } = useParams();

    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    const onResultLoaded = (result) => {
        setResult(result);
    }

    const updateResult = () => {
        clearError();

        switch (funcType) {
            case 'comic':
                getComic(id)
                    .then(onResultLoaded);
                break;

            case 'char':
                getCharacter(id)
                    .then(onResultLoaded);
                break;
        }
    }

    useEffect(() => {
        updateResult();
    }, [id])

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !result) ? <Page result={result} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )

}

export default SinglePage;