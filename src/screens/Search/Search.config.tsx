import { User } from 'Type/User';

export interface SearchComponentInterface {
    searchValue: string
    searchResults: Array<User>
    isSearching: boolean
    handleSearch: (value: string) => void;
}
