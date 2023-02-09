import './charInfo.scss';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />
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

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const prevStateRef = useRef(false);

    const { loading, error, process, setProcess, getCharacter } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {

        const id = props.selectedChar;
        if (!id) {
            return
        }

        getCharacter(id)
            .then(onCharLoaded)
            .then(() => { setProcess('confirmed') });
    }



    useEffect(() => {
        if (prevStateRef.current != props.selectedChar) {
            updateChar();
        };
        prevStateRef.current = props.selectedChar;
    }, [props])



    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )

}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
    let imgClass = { objectFit: 'cover' };
    if (thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgClass = { objectFit: 'contain' }
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={imgClass} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {comics.map((item, i) => {
                    if (i >= 9) {
                        return null;
                    }
                    return (
                        <li className="char__comics-item" key={i}>
                            <Link to={`/comics/${item.resourceURI.slice(43)}`}>{item.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default CharInfo;