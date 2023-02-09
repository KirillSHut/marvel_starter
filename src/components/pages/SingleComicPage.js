import SingleComicView from './SingleComic/SingleComicView';
import SinglePage from './SinglePage';
import useMarvelService from '../../services/MarvelService';

const SingleComicPage = () => {
    return (
        <SinglePage funcType={'comic'} Page={SingleComicView} />
    )
}



export default SingleComicPage;