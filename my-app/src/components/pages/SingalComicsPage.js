import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from "react";
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/spinner";
import ErrorMasage from "../errorMasage/errorMasage";

import './singleComicPage.scss';

const SingleComicPage = () => {

    const {comicId} = useParams();  
    const [comic, setComic] = useState(null); 
    const {loading, error, getComics, clearError} = useMarvelService();  

    useEffect (() => {
        updateComic();
     }, [comicId])
   
    const updateComic = () => {
        clearError();
        getComics(comicId)
        .then(onComicloaded);
    }

    const onComicloaded = (comic) => {
        setComic(comic); 
    }


        const errorMessage = error ? <ErrorMasage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {titel, desription, pageCount, thumbnail, language, price} = comic;
    return (
    <div className="single-comic">
        <Helmet>
            <meta
                name="description"
                content={`${titel} comics book`}
            />
            <title>{titel}</title>
        </Helmet>
        <img src={thumbnail} alt={titel} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{titel}</h2>
            <p className="single-comic__descr">{desription}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">Language{language}</p>
            <div className="single-comic__price">{price}</div>
        </div>
        <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
    )
}

export default SingleComicPage;