import React, { createContext, useState } from "react"

type FilterProps = {
    sortByPrice?: "termurah" | "termahal";
    sortByLocation?: "terdekat" | "terjauh" | "terpopuler";
    sortByRooms?: number;
    searchHistory?: [] | any;
}

type FilterContextType = {
    value: FilterProps;
    setFilter: React.Dispatch<React.SetStateAction<FilterProps>>;
}

const FilterContext = createContext<FilterContextType>({
    value: {
        sortByPrice: "termurah",
        sortByLocation: "terdekat",
        sortByRooms: 2,
        searchHistory: []
    },
    setFilter: () => {}
});

function FilterProvider({ children }: any) {
    const [value, setFilter] = useState<FilterProps>({
        sortByPrice: "termurah",
        sortByLocation: "terdekat",
        sortByRooms: 3,
        searchHistory: []
    });
  
    return (
        <FilterContext.Provider value={{value, setFilter}}>
            { children }
        </ FilterContext.Provider>);
}

export { FilterProvider, FilterContext, FilterProps };