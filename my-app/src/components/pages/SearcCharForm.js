
import './singleComicPage.scss';

const SearcCharForm  = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
        <div className="single-comic">
            <h2>111</h2>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}


export default SearcCharForm;