import React from "react";

const Login = () => {
    return (
        <>
            <h2>Bienvenido a My Music App</h2>
            <h4>Ten invitamos a loguearte por medio de tu cuenta de spotify</h4>
            <button variant="info" type="submit" onClick={handleLogin}>
                Login to spotify
            </button>

        </>
    )
}