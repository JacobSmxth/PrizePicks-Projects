import { useState } from 'react'
import './App.css'

function App() {
  const [state, setState] = useState(0);
  const url = "https://api.github.com/users/torvalds";

  type Profile = {
      name: string | null;
      company: string | null;
      followers: number;
      following: number;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);


  async function fetchProfile() {

      try {
          setLoading(true);
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error();
          }
          const data: Profile = await response.json();
          setProfile(data);
      } catch (err) {
          setError("Error occured: " + err);
          console.error(err);
      } finally {
          setLoading(false);
      }

  }


  return (
    <>
        <button onClick={fetchProfile}>{loading ? "Loading.." : "Get Linus Torvalds Profile"}</button>

        {error && <p>{error}</p>}

        {profile && (<div>
                <h2>{profile.name}</h2>
                <p>Company: {profile.company ?? "N/A"}</p>
                <p>Followers: {profile?.followers}</p>
                <p>Following: {profile?.following}</p>
            </div>
        )}
    </>
  )
}

export default App
