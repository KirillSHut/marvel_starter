import './CharSearchForm.scss';

import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';


const CharSearchForm = () => {
    const [char, setChar] = useState('');

    const { loading, error, getCharacterByName, clearError } = useMarvelService();

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(res => {
                setChar(res)
                console.log(char)
            })
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const failedSearchMessage = char === undefined ? <div className="char__search-error">The character was not found. Check the name and try again</div> : null;
    const successMessage = char ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char.name} page?</div>
            <Link to={`/characters/${char.id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> : null;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required'),
                })}
                onSubmit={(values) => { updateChar(values.charName) }}>
                <Form>
                    <label htmlFor="charName" className="char__search-label">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name="charName"
                            type='text'
                            onInput={() => { setChar(null) }} />
                        <button
                            type='submit'
                            className="button button__main">
                            <div className="inner">find</div>
                        </button>

                    </div>
                    <ErrorMessage name="charName" className="char__search-error" component="div" />
                    {errorMessage}
                    {failedSearchMessage}
                    {successMessage}
                </Form>
            </Formik>
        </div>
    )
}



export default CharSearchForm