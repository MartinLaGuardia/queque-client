import { useState } from "react"
import { useParams } from "react-router-dom"
import EditPlaceForm from "../../components/EditPlaceForm/EditPlaceForm"

const PlaceEditPage = () => {

    return (
        <>
        <h1>SOY LA PAGINA DE EDITAR LUGAR</h1>
        <EditPlaceForm />
        </>
    )


}



export default PlaceEditPage