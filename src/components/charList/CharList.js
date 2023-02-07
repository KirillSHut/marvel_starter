import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [isEnded, setIsEnded] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const itemRefs = useRef([]);

    const { loading, getAllCharacters } = useMarvelService();

    const updateList = () => {
        onRequestCharList();
    }

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
    }


    const onRequestCharList = (newOffset) => {
        getAllCharacters(newOffset)
            .then(res => {
                setCharList(charList => [...charList, ...res]);
                setOffset(offset => offset + 9);
                setIsEnded(res.length < 9 ? true : false)
            })
            .then(() => {
                onScroll();
            })
            .finally(() => setNewItemsLoading(false))
    }


    useEffect(() => {
        updateList();

        return () => {
            document.addEventListener('scroll', scrollAtEnd);
        }
    }, [])

    useEffect(() => {
        if (newItemsLoading) {
            onRequestCharList(offset);
        }
    }, [newItemsLoading])

    const onScroll = () => {
        document.addEventListener('scroll', scrollAtEnd);
    }

    const scrollAtEnd = () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            setNewItemsLoading(true);
            document.removeEventListener('scroll', scrollAtEnd);
        }
    }


    function fillCharList() {
        let charListContent;

        if (charList.length != 0) {
            charListContent = charList.map((item, id) => {
                let imgClass = { objectFit: 'cover' };
                if (item.thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    imgClass = { objectFit: 'unset' }
                }
                return (
                    <CSSTransition
                        key={id}
                        timeout={500}
                        classNames='char__item'>
                        <li className="char__item"
                            ref={el => itemRefs.current[id] = el}
                            key={item.id}
                            onClick={(e) => {
                                props.onCharSelected(item.id);
                                focusOnItem(id);
                            }}>
                            <img style={imgClass}
                                src={item.thumbnail}
                                alt={item.name} />
                            <div className="char__name">{item.name}</div>
                        </li>
                    </CSSTransition>
                )
            })
        }

        return (
            <TransitionGroup component={null}>
                {charListContent}
            </TransitionGroup>
        )
    }


    const charListContent = fillCharList();
    const spinner = loading && !newItemsLoading ? <Spinner /> : null;


    return (
        <div className="char__list">
            <ul className="char__grid">
                {charListContent}
            </ul>
            {spinner}
            <button className="button button__main button__long"
                onClick={() => { onRequestCharList(offset) }}
                disabled={loading}
                style={{ 'display': isEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;