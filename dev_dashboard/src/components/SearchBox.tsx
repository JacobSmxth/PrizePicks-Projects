import { useEffect, useState } from "react";

type GitHubUser = {
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
};

function SearchBox() {
    const [searchText, setSearchText] = useState("");
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchText.trim()) {
            setResults([]); // Clear my current results
            return;
        }

        const handle = window.setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.github.com/users/${encodeURIComponent(searchText)}`);

                if (!response.ok) {
                    setUser(null);
                    setError(response.status === 404 ? "User not found" : "Error occured!");
                    return;
                }

                const data : GitHubUser = await response.json();
                setUser(data);
                setError("");
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 600);

        return () => window.clearTimeout(handle);
    }, [searchText]);


    return (
        <div>
            <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Type a GitHub username..." />
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            {user && (
                <div>
                    <img src={user.avatar_url} width={128} />
                    <div>
                        <a href={user.html_url} target="_blank" rel="noreferrer">
                            {user.login}
                        </a>
                        {user.name ? ` (${user.name})` : null}
                    </div>
                    <div>Repos: {user.public_repos} • Followers: {user.followers}</div>
                </div>
            )}
        </div>
    );
}




export default SearchBox;