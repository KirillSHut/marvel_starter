import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const prevStateRef = useRef(false);

    const { loading, error, getCharacter } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {

        const id = props.selectedChar;
        if (!id) {
            return
        }

        getCharacter(id)
            .then(onCharLoaded);
    }



    useEffect(() => {
        if (prevStateRef.current != props.selectedChar) {
            updateChar();
        };
        prevStateRef.current = props.selectedChar;
        console.log(1);
        console.log(props.selectedChar);
    }, [props])

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const skeleton = (char || loading || error) ? null : <Skeleton />;
    const content = !(loading || error || !char) ? <View char={char} /> : null

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {skeleton}
            {content}
        </div>
    )

}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
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
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default CharInfo;