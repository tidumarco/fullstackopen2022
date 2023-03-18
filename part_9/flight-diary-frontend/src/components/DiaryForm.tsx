import { DiaryFormProps } from "../types";

const DiaryForm = ({
  createDiary,
  newDiary,
  setNewDiary,
  setDiaries,
  diaries,
}: DiaryFormProps) => {
  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary(newDiary)
      .then((data) => {
        setDiaries(diaries.concat(data));
        setNewDiary({ date: "", visibility: "", weather: "" });
      })
      .catch((error) => {
        alert(`Failed to create diary entry: ${error.message}`);
      });
  };

  return (
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
          <option value="great">great</option>
          <option value="good">good</option>
          <option value="ok">ok</option>
          <option value="poor">poor</option>
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
  );
};

export default DiaryForm;
