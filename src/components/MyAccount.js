import React, { useEffect } from "react";
import axios from "axios";
import fondo from "../assets/fondo.png";
import "./styles/MyAccount.css";
import { DeleteUser } from "../api/DeleteUser";
import { Modal } from "../modal/Modal";
import { Modal2 } from "../modal/Modal2";
import control from "../assets/control.png";
import { UpdateUser } from "../api/UpdateUser";

function MyAccount(){

    //Estado Correo
    const [correo, setCorreo] = React.useState('');

    //Estado informacion Usuario
    const [dataUser, setDataUser] = React.useState([]);

    //Estado modal
    const [openModalDelete, setOpenModalDelete] = React.useState(false);

    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);

    //Estado nueva informacion
    const [newData, setNewData] = React.useState({})

    
    const handleSubmitDelete = (id) => {
        console.log(id)
        DeleteUser(id);
        console.log('eliminado')
        setOpenModalDelete(true)
    }

    const newhandleChange = (e) =>{
        setNewData({
            ...newData,
            [e.target.name]: e.target.value,
        })
    }

    const updateUser = () =>{
        console.log('actualizado')
        UpdateUser(newData, dataUser.correo)
        setOpenModalUpdate(true)
    }
    
    const saveCorreo = (event) =>{
        setCorreo(event.target.value)
    }

    const searchUser = () => {
        axios({
            url: `https://dark-lexicon-352002.uc.r.appspot.com/user/${correo}`,
        })
            .then(response =>{
                console.log(response.data)
                setDataUser(response.data)    
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return(
        <>
            <body background={fondo}>
                <div className='form-container'>
                    <label>Digite su Correo para traer sus datos:</label>
                    <input type="text" name="correo" placeholder="Correo" required onChange={saveCorreo}/>
                    <button onClick={searchUser} className='secondary-button'>TRAER DATOS</button>
                </div>
                <div className='form-container'>
                    <h1>Mi Cuenta</h1>
                                
                        <input type="text" id="nombre" required name="nombre" placeholder={dataUser.nombre} onChange={newhandleChange} />

                        <input type="text" id="apellido" required name="apellido" placeholder={dataUser.apellido} onChange={newhandleChange} />
                            
                        <input type="email" id="correo" value={dataUser.correo} />

                        <input type="password" required id="contrasena" name="contrasena" placeholder={dataUser.contrasena} onChange={newhandleChange} />

                        <input type="number" id="telefono" required name="telefono" placeholder={dataUser.telefono} onChange={newhandleChange} />

                        <input type="text" id="residencia" required name="residencia" placeholder={dataUser.residencia} onChange={newhandleChange} />

                        <div className="container-buttons">
                            <a><button onClick={updateUser} className='secondary-button'>ACTUALIZAR</button></a>
                            <a><button onClick={() => handleSubmitDelete(dataUser.id)} className='secondary-button'>BORRAR CUENTA</button></a>
                        </div>
                </div>
                <div className="ListVideogames">
                    <a href={`/videogame`}><img src={control} /></a>
                </div>
                    
            </body>

            {!!openModalUpdate && (
                <Modal2>
                    <div className='container-delete'>
                        <h2>Perfil Actualizado!!</h2>
                        <p>Tus datos fueron actualizados</p>
                        <a href={`/videogame`}><button>Juegos</button></a>
                    </div>
                </Modal2>
            )}

            {!!openModalDelete && (
                <Modal>
                    <div className='container-delete'>
                        <h2>¡¡NOO!!</h2>
                        <p>Tu cuenta fue Eliminada</p>
                        <a href="/"><button>Inicio</button></a>
                    </div>
                </Modal>
            )}
        </>
    );
}

export {MyAccount};