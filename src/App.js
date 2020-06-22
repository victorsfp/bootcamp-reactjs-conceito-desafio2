import React, { useEffect , useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ repository, setRepository ] = useState([])

  useEffect(() => {
    api.get('repositories')
    .then(response => {
      setRepository(response.data)      
    })

  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo Projeto ${Date.now()}`,
      url: "http://github.com/victorsfp/ecoelta",
      techs: [
        "Angular",
        "PHP",
        "Flutter"
      ]
    })

    const rep = response.data;    
    setRepository([...repository, rep])    
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      setRepository(repository.filter(e => e.id !== id))      
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(item => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
