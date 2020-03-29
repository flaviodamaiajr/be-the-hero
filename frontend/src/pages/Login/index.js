import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";
import beTheHeroLogo from "../../assets/images/logo.svg";
import heroesImg from "../../assets/images/heroes.png";

function Login() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    if (!id.trim()) {
      alert("Informe o seu ID!");
      return;
    }

    try {
      const response = await api.post("sessions", { id });

      if (response.status === 400) {
        alert("ONG não econtrada, verifique o seu ID ou cadastre-se!");
        return;
      }

      localStorage.setItem("ong_id", id);
      localStorage.setItem("ong_name", response.data.name);
      history.push("/profile");
    } catch (error) {
      alert("Não foi possível efetuar a autentição.");
    }
  }

  return (
    <div className="login-container">
      <section className="form ">
        <img src={beTheHeroLogo} alt="Be The Hero"></img>
        <form onSubmit={handleLogin}>
          <h1>Faça o seu Login</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          ></input>
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"></img>
    </div>
  );
}

export default Login;
