import { useEffect, useState } from 'react';

type MeAgain = {
  name: string;
  avatar_url: string;
  login: string;
  followers: number;
};



function MyProfile() {
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState<MeAgain | null>(null);

  useEffect(() => {

    async function fetchMe() {

      setLoading(true);
      try {
        const response = await fetch("https://api.github.com/users/JacobSmxth");

        if (!response) {
          setLoading(false);
          return;
        }

        const data: MeAgain = await response.json();
        setMe(data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMe()

  }, [])


  return (
    <>
      {loading && (
        <h1>{loading ? "Loading..." : null}</h1>
      )}
      {me && (
        <div>
          <img src={me.avatar_url} width={140} />
          <h1>{me.name}</h1>
          <h2>{me.login}</h2>
          <p>{me.followers ? me.followers : "Nobody follows this guy"}</p>
        </div>
      )}
    </>
  )
}


export default MyProfile;
