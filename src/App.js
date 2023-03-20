import './App.css';
import Select from 'react-select';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function App() {
  const [datas, setDatas] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [isShow, setIsShow] = useState(false);

  const getBerries = async () => {
    const berries = await fetch('https://pokeapi.co/api/v2/berry/');
    const value = await berries.json();
    const result = value.results.map(data => {
      console.log(data);
      return {
        label: data.name,
        value: data.name
      }
    })
    setDatas(result.sort((a,b) => a.label.localeCompare(b.label)));
  }

  useEffect(() => {
    getBerries();
  }, [])

  const handleSubmit = () => {
    setIsShow(state => !state);
  }

  const handleChange = (value) => {
    setUserSelect(value);
  }
  return (
    <div className="App">
      <h1>{isShow? userSelect : ""}</h1>
      <p>{!userSelect? "Pilih dulu baru bisa tekan tombol dibawah" : ""}</p>
      <Button variant="primary" disabled={!userSelect} onClick={() => handleSubmit()} >{isShow? "Tutup Data" : "Tampilkan Data"}</Button>
      <br />
      <br />
      <Select options={datas} onChange={(e) => handleChange(e.value)}></Select>
    
    </div>
  );
}

export default App;
