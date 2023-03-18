import "./App.css";
import { useEffect, useState } from "react";
import { Diary, NewDiary } from "./types";

import { getAllDiaries, createDiary } from "./diaryService";
import DiaryForm from "./components/DiaryForm";

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

  return (
    <div className="App">
      <DiaryForm
        diaries={diaries}
        createDiary={createDiary}
        newDiary={newDiary}
        setNewDiary={setNewDiary}
        setDiaries={setDiaries}
      />

      <h1>Diary Entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
          <p>Comment: {diary.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
