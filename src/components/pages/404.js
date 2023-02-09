import ErrorMessage from "../errorMessage/errorMessage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Page404 = () => {

    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="404 Marvel portal"
                />
                <title>404 Marvel portal</title>
            </Helmet>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
            <Link to='/' style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px' }}>Back to main page</Link>
        </div>
    )
}

export default Page404