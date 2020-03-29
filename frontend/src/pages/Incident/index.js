import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

import beTheHeroLogo from "../../assets/images/logo.svg";

import { FiArrowLeft } from "react-icons/fi";

function Incident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("ong_id");

  async function handleNewIncident(e) {
    e.preventDefault();

    try {
      const data = { title, description, value };
      await api.post("incidents", data, {
        headers: { Authorization: ongId }
      });
      history.push("/profile");
    } catch {
      alert("Não foi possível cadastrar o caso, tente novamente!");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={beTheHeroLogo} alt="Be The Hero" />
          <h1>Cadastrar novo casos</h1>
          <p>
            Descreva um caso detalhadamente para encontrar um herói para
            resolver isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso "
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em Reais "
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Incident;
