import React, { useEffect, useState } from 'react';
import { searchUsersByUsername } from 'Util/firebase';
import { useDebounce } from 'Hook/useDebounce';
import { User } from 'Type/User';
import SearchComponent from './Search.component';

const SearchContainer = () => {
	const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<Array<User>>([]);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchTerm = useDebounce(searchValue, 500);

    useEffect(() => {
        async function setSearching() {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                const users = await searchUsersByUsername(debouncedSearchTerm);
                setSearchResults(users);
                setIsSearching(false);
              } else {
                setSearchResults([]);
              }
        }

        setSearching();
    }, [debouncedSearchTerm]);

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

	const containerProps = () => ({
        searchValue,
        searchResults,
        isSearching
    });

	const containerFunctions = {
        handleSearch
    };

	return <SearchComponent {...containerProps()} {...containerFunctions} />;
};

export default SearchContainer;
