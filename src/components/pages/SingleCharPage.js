import useMarvelService from '../../services/MarvelService';
import SinglePage from './SinglePage';
import SingleCharView from './SingleChar/SingleCharView';

const SingleCharPage = () => {
    return (
        <SinglePage funcType={'char'} Page={SingleCharView} />
    )
}



export default SingleCharPage;