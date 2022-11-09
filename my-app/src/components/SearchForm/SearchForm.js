import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {useState} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMasage from '../errorMasage/errorMasage';

import './SearchForm.scss';
 
const SearchForm = () => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharName, clearError} = useMarvelService();
    
    const onCharName = (char) => {  
        setChar(char); 
        console.log(char);

    }

    const updateName = (name) => {
        clearError();
        getCharName(name)
        .then(onCharName);

    }

    const errorMessage =  error ? <div className="char__search-critical-error"><ErrorMasage/></div> : null;
    const content = !char ? null : char.length > 0 ?     
    <div className="char__search-wrapper">
    <div className="char__search-success">нашелся {char[0].name}?</div>
    <Link to={`/characters/${char[0].id}`} className="button button__secondary">
        <div className="inner">To page</div>
    </Link>
</div>
    : <div className="char__search-error">заебало</div>;

    return (
        <div className="char__search-form">
        <Formik
        initialValues = {{
            charName: ''
        }}

        validationSchema = {Yup.object({
            charName: Yup.string()
                    .min(1, 'Минимум 1 символ для заполнения')
                    .required('Обязательное поле!')

        })}
        onSubmit ={ ({charName}) => {
            updateName(charName);}}

        >
            <Form className="form">
            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
            <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <ErrorMessage component="div" className="char__search-error" name="charName" />
            </Form>
        </Formik>
        {errorMessage}
        {content}
        </div>

    )



}


export default SearchForm;
