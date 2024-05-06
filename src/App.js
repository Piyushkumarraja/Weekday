import './App.css';
import Main from './component/main/Main';
import Filter from './component/filters/Filters';
import { useState } from 'react';
function App() {
  const [filter, setFilter] = useState({
    workMode: [],
    basePay: [],
    roles: [],
    exp: [],
    title: ""
  })

  const handleFilterChange = (value, filterType) => {
    console.log(value);
    setFilter(prevFilter => ({
      ...prevFilter,
      [filterType]: value
    }));
  };


  return (
    <div className="App">
      <Filter filter={filter} onChange={handleFilterChange}/>
      <Main filter={filter}/>
    </div>
  );
}

export default App;
