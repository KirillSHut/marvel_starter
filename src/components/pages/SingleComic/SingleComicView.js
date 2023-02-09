import { Link } from "react-router-dom";
import './singleComicPage.scss';
import { Helmet } from "react-helmet";

const SingleComicView = ({ data }) => {
    const { id, title, description, thumbnail, pageCount, language, price } = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={title}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicView