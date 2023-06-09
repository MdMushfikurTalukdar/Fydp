import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils/helper";
// import { formatDate } from "../utils/helper";

const LatestHighScores = () => {
  const [latestScores, setLatestScores] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/api/v1/scores`
    );
    if (!response.ok) {
      throw new Error("Data could not be fetched!");
    } else {
      return response.json();
    }
  };
  useEffect(() => {
    fetchData()
      .then((data) => {
        setLatestScores(data.scores);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center">Latest High Scores</h1>
      {latestScores && (
        <table className="border-collapse border border-slate-500 mt-6">
          <tr>
            <th className="border border-slate-600 p-1">Player</th>
            <th className="border border-slate-600 p-1">Id</th>
            <th className="border border-slate-600 p-1">Score</th>
            <th className="border border-slate-600 p-1">Subject</th>
            <th className="border border-slate-600 p-1">Date</th>
          </tr>
          {latestScores.length ? (
            latestScores.map((val, key) => {
              return (
                <tr key={key}>
                  <td className="border border-slate-700 p-1">{val.player}</td>
                  <td className="border border-slate-700 p-1">{val.id}</td>
                  <td className="border border-slate-700 p-1">{val.score}</td>
                  <td className="border border-slate-700 p-1">{val.subject}</td>
                  <td className="border border-slate-700 p-1">
                    {formatDate(val.createdAt)}
                  </td>
                </tr>
              );
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </table>
      )}
    </div>
  );
};

export default LatestHighScores;
