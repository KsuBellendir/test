import {useState, useEffect, useRef} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group"
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/spinner";
import ErrorMasage from "../errorMasage/errorMasage";
import './charList.scss';
import PropTypes from 'prop-types';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();
    const diration = 1000;

    useEffect(() => {
        updateListCharters(offset, true);
    }, []);

    const onCharListloaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9 ){
            ended = true;
        }
            setCharList(charList => [...charList, ...newCharList]);
            setNewItemLoading( false);
            setOffset(offset => offset +9);
            setCharEnded(ended);
    }

     const updateListCharters = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset)
        .then(onCharListloaded);
    }

     const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            } 
            return (
                <CSSTransition
                timeout={diration}
                key={item.id}
                classNames="char__item">
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
                </CSSTransition>

            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
        
        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMasage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => updateListCharters(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;


   
