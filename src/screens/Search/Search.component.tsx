/* eslint-disable no-nested-ternary */
import React from 'react';

import {
    FormControl, Input, InputAdornment, CircularProgress
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import FollowingUserProfile from 'Component/Profile/FollowingUserProfile';
import { SearchComponentInterface } from './Search.config';
import './Search.style.scss';

const SearchComponent: React.FC<SearchComponentInterface> = (props) => {
    const {
        searchValue, handleSearch, isSearching, searchResults
    } = props;

    return (
        <div className="SearchPage">
            <FormControl className="SearchPage__InputWrapper" variant="standard">
                <Input
                id="input-with-icon-adornment"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                startAdornment={(
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                  )}
                />
            </FormControl>
            <div className="SearchPage__FoundUsers">
                {isSearching
                    ? (
                        <CircularProgress color="secondary" />
                    )
                : (searchResults.length > 0
                ? (
                    <div className="SearchUsers">
                        { searchResults.map((user) => (
                            <FollowingUserProfile
                                key={user?.username}
                                fullName={user?.fullName}
                                username={user?.username}
                                userId={user?.userId}
                                docId={user?.docId}
                            />
                        )) }
                    </div>
                )
                : (
                    <h3 className="SearchPage__NoResults">Нічого не знайдено. Будь ласка, уточніть пошуковий запит.</h3>
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;
