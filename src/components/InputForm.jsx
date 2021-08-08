import { useForm } from "react-hook-form";
import { createCanvas } from "../utils/canvas";

export default function InputForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    const { homeTeam, awayTeam, homeScore, awayScore } = data;
    const homeTeamLogo = teams.find((t) => t.name === homeTeam)?.url || "";
    const awayTeamLogo = teams.find((t) => t.name === awayTeam)?.url || "";
    createCanvas(homeTeamLogo, awayTeamLogo, homeScore, awayScore);
  };

  const teams = [
    {
      name: "הפועל פת",
      url: "hpt.png"
    },
    {
      name: "הפועל כפס",
      url: "kfs.png"
    },
    {
      name: "עירוני רמהש",
      url: "rs.png"
    }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Home Team</legend>
        <select {...register("homeTeam")}>
          {teams.map((t) => (
            <option key={t.name}>{t.name}</option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          max="9"
          defaultValue="0"
          {...register("homeScore")}
        />
      </fieldset>
      <fieldset>
        <legend>Away Team</legend>
        <select {...register("awayTeam")}>
          {teams.map((t) => (
            <option key={t.name}>{t.name}</option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          max="9"
          defaultValue="0"
          {...register("awayScore")}
        />
      </fieldset>
      <input type="submit" />
    </form>
  );
}
