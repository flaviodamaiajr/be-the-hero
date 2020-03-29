import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

import beTheHeroLogo from "../../assets/images/logo.svg";

import { FiArrowLeft } from "react-icons/fi";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      state
    };

    try {
      const response = await api.post("ongs", data);
      alert(`O seu ID de acesso é ${response.data.id}`);
      history.push("/");
    } catch {
      alert("Não foi possível efetuar o cadastro.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={beTheHeroLogo} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça o seu cadastro, entre na plataforma e ajude pessoas a encontrar
            a sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenha cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={state}
              onChange={e => setState(e.target.value.toUpperCase())}
              maxLength="2"
              minLength="2"
              pattern="[A-Z]"
              title="Informe a sigla da UF da sua Cidade."
            />
          </div>
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
