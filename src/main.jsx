/**
 * Entrada da landing individual (www.foundersos.com.br).
 *
 * Carrega a arvore e o CSS congelados no estado anterior a 09/09, quando a
 * pagina virou a da turma. Markup e estilo precisam vir do mesmo ponto: com o
 * styles.css atual (que evoluiu junto com a pagina da turma) os tamanhos
 * saiam diferentes do original.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./individual/App";
import "./individual/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
