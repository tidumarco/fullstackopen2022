import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Diary } from "./types";
function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/diaries").then((response) => {
      setDiaries(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>Flight Diary</h1>

      {diaries.map((diary) => (
        <>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </>
      ))}
    </div>
  );
}

export default App;
