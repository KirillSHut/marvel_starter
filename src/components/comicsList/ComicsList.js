import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const ComicsList = () => {
    const { loading, error, getAllcomics } = useMarvelService();
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemsLoading, setNewItemsLoading] = useState(false);

    const updateComics = () => {
        getAllcomics(offset)
            .then((res) => {
                setComicsList(comicsList => [...comicsList, ...res]);
                setOffset(offset => offset + 9);
                setNewItemsLoading(false);
            })
    }

    useEffect(() => {
        updateComics();
    }, [])


    useEffect(() => {
        console.log(comicsList)
    }, [comicsList])

    const loadingExam = loading && !newItemsLoading;
    const spinner = loadingExam ? <Spinner /> : null;
    const errorMassege = error ? <ErrorMessage /> : null;
    const content = (loadingExam || error) ? null : comicsList.map((item, id) => {
        return (
            <li className="comics__item" key={id}>
                <a href="#">
                    <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </a>
            </li>
        )
    })

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {spinner}
                {errorMassege}
                {content}
            </ul>
            <button className="button button__main button__long"
                onClick={() => {
                    setNewItemsLoading(true);
                    updateComics();
                }}
                disabled={newItemsLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;