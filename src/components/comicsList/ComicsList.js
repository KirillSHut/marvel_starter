import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import setContentList from '../../utils/setContentList';
import useMarvelService from '../../services/MarvelService';


const ComicsList = () => {
    const { process, setProcess, getAllcomics } = useMarvelService();
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
            .then(() => { setProcess('confirmed') });
    }

    useEffect(() => {
        updateComics();
    }, [])


    const makeComicsList = () => {
        return comicsList.map((item, id) => {
            return (
                <li className="comics__item" key={id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
    }


    return (
        <div className="comics__list">
            {setContentList(process, newItemsLoading, <ul className="comics__grid">{makeComicsList()}</ul>)}
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