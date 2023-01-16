import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({ char, loading: false })
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    updateChar = () => {

        const id = this.props.selectedChar;
        if (!id) {
            return
        }

        this.setState({ loading: true })
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount = () => {
        this.updateChar()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.selectedChar != prevProps.selectedChar) {
            this.updateChar();
        }
    }

    render() {
        const { char, loading, error } = this.state;
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

}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    console.log(comics);
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