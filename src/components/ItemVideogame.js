import React from "react";
import "./styles/ItemVideogame.css";

function ItemVideogame(props){

    return(
        <div className="container-videogames">
            <p>{props.descripcion}</p>
            
            <div className="container-title">
                <h2>{props.nombre}</h2>
            </div>
            
            <a href={`${props.link}`}>¡Jugar Ahora!</a>
        </div>    
    );
}

export {ItemVideogame}