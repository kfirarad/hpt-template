import InputForm from "./components/InputForm";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>HPT Tempalte Generator</h1>
      <InputForm />
      <canvas width="1080" height="1080" />
    </div>
  );
}
