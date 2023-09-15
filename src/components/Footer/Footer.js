//el componente "Footer" permanece en la carpeta "components", ya que es un componente reutilizable, que puede ser utilizado en diferentes pantallas.
import React from "react";
import './Footer.css'

function Footer(props){

    return(
        <footer>
            <p>Alejo Corti</p>
            <p className="separador">|</p>
            <p>Maria Varas</p>
            <p className="separador">|</p>
            <p>Federico Vitale</p>
        </footer>
    )
}

export default Footer