import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card (props){
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = props.card.owner === currentUser._id; //props.card.owner._id === currentUser._id; 
  const cardDeleteButtonClassName = (`element__delete-button  ${isOwn ? 'element__delete-button_visible' : ''} hover-button`);
  const isLiked = props.card.likes.find(i => i === currentUser._id); //i => i._id === currentUser._id
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`

  function handleClick() {
    props.onCardClick(props.card);
  }  

  function handleLikeClick() {
    props.onCardLike(props.card)
    /*console.log(props.card)
    console.log(`Владелец карточки ${props.card.owner}`)
    console.log(`Текущий пользователь ${currentUser._id}`)
    console.log(`Лайки пользователей ${props.card.likes}`)*/
  }

  function handleDeleteClick() {    
    props.onCardDelete(props.card)
  }
  
  return(
    <li className="element" >
      <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} ></button>
      <div className="element__container">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )    
}

export default Card;


