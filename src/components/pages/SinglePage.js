
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({ funcType, Page }) => {
    const [result, setResult] = useState();
    const { id } = useParams();

    const { process, setProcess, getComic, getCharacter, clearError } = useMarvelService();

    const onResultLoaded = (result) => {
        setResult(result);
    }

    const updateResult = () => {
        clearError();

        switch (funcType) {
            case 'comic':
                getComic(id)
                    .then(onResultLoaded)
                    .then(() => { setProcess('confirmed') });
                break;

            case 'char':
                getCharacter(id)
                    .then(onResultLoaded)
                    .then(() => { setProcess('confirmed') });
                break;
        }
    }

    useEffect(() => {
        updateResult();
    }, [id])



    return (
        <>
            <AppBanner />
            {setContent(process, Page, result)}
        </>
    )

}

export default SinglePage;