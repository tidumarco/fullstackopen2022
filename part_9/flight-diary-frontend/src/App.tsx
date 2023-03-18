import "./App.css";
import { useEffect, useState } from "react";
import { Diary, NewDiary } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary(newDiary).then((data) => {
      setDiaries(diaries.concat(data));
    });

    setNewDiary({ date: "", visibility: "", weather: "" });
  };
  return (
    <div className="App">
      <form onSubmit={diaryCreation}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            required
            onChange={(event) =>
              setNewDiary({ ...newDiary, date: event.target.value })
            }
          />
        </label>
        <label>
          Visibility:
          <select
            name="visibility"
            required
            onChange={(event) =>
              setNewDiary({
                ...newDiary,
                visibility: event.target.value,
              })
            }
          >
            <option value=""></option>
            <option value="poor">poor</option>
            <option value="average">average</option>
            <option value="good">good</option>
          </select>
        </label>
        <label>
          Weather:
          <select
            name="weather"
            required
            onChange={(event) =>
              setNewDiary({ ...newDiary, weather: event.target.value })
            }
          >
            <option value=""></option>
            <option value="sunny">sunny</option>
            <option value="cloudy">cloudy</option>
            <option value="rainy">rainy</option>
            <option value="stormy">stormy</option>
            <option value="windy">windy</option>
          </select>
        </label>
        <label>
          Comment:
          <input
            name="weather"
            required
            onChange={(event) =>
              setNewDiary({ ...newDiary, comment: event.target.value })
            }
          />
        </label>
        <button type="submit">Add Diary</button>
      </form>

      <h1>Flight Diary</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
