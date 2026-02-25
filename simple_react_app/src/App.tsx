import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // setting two variables, count is the value, setCount is the "function" to setCount. We are setting it equal to useState(x). the x is the starting value of count
  const [count, setCount] = useState(9);

  type SingleJoke = {
    type: "single";
    joke: string;
  };

  type TwoPartJoke = {
    type: "twoPart";
    setup: string;
    delivery: string;
  };

  type JokeResponse = SingleJoke | TwoPartJoke;

  function JokeFetcher() {
    const [joke, setJoke] = useState<JokeResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchJoke() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit",
        );

        if (!response.ok) {
          throw new Error("HTTP Error: " + response.status);
        }

        const data: JokeResponse = await response.json();
        setJoke(data);
      } catch (err) {
        setError("Error Occured");
      } finally {
        setLoading(false);
      }
    }

    return (
      <div>
        <button onClick={fetchJoke} disabled={loading}>
          {loading ? "Loading.." : "Get joke"}
        </button>

        {joke && (
          <p>
            {joke.type === "single" ? (
              <p>{joke.joke}</p>
            ) : (
              <>
                <p>{joke.setup}</p>
                <p>{joke.delivery}</p>
              </>
            )}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <h1>
        This is my simple react app to become familiar with simple things in it
      </h1>
      {/* this is something I repurposed from the template of the react + vite template */}
      <button onClick={() => setCount(count + 1)}>{count}</button>

      <JokeFetcher />
    </>
  );
}

export default App;
