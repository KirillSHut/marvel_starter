import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

class CharList extends Component {
    state = {
        list: [],
        offset: 210,
        listLoading: false,
        isEnded: false,
    }
    marvelService = new MarvelService();

    updateList = () => {
        this.onRequestCharList();
    }

    setCharRef = elem => {
        if (this.myRef) {
            this.myRef.classList.remove('char__item_selected')
        }
        this.myRef = elem;
        this.myRef.classList.add('char__item_selected');
    }

    onRequestCharList = (offset) => {
        this.onListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(res => this.setState(({ offset, list }) => ({
                list: [...list, ...res],
                offset: offset + 9,
                loading: false,
                listLoading: false,
                isEnded: res.length < 9 ? true : false
            })))
            .then(() => {
                this.onScroll();
            })
    }

    onListLoading = () => {
        this.setState({
            listLoading: true
        })
    }

    componentDidMount = () => {
        this.updateList()
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollAtEnd);
    }

    onScroll = () => {
        document.addEventListener('scroll', this.scrollAtEnd);
    }

    scrollAtEnd = () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            this.onRequestCharList(this.state.offset);
            document.removeEventListener('scroll', this.scrollAtEnd);
        }
    }

    render() {
        const { list, offset, listLoading, isEnded } = this.state;
        let charList;

        if (list.length != 0) {
            charList = list.map(item => {
                let imgClass = { objectFit: 'cover' };
                if (item.thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    imgClass = { objectFit: 'unset' }
                }
                return (
                    <li className="char__item" key={item.id} onClick={(e) => {
                        this.props.onCharSelected(item.id);
                        this.setCharRef(e.target.closest('li'));
                    }}>
                        <img style={imgClass} src={item.thumbnail} alt={item.name} />
                        <div className="char__name">{item.name}</div>
                    </li>
                )
            })
        } else {
            charList =
                <>
                    <div></div>
                    <Spinner />
                </>;
        }

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charList}
                </ul>
                <button className="button button__main button__long"
                    onClick={() => { this.onRequestCharList(offset) }}
                    disabled={listLoading}
                    style={{ 'display': isEnded ? 'none' : 'block' }}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;