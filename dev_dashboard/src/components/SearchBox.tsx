import { useEffect, useState } from "react";

function SearchBox() {
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
}




export default SearchBox;