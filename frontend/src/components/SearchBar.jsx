const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <input
      className="search-bar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default SearchBar;