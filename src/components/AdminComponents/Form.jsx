import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Form = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => setSearchTerm(e.target.value);

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search movies"
        value={searchTerm}
        onChange={handleChange}
        style={{ padding: '8px', fontSize: '16px', flex: 1 }}
      />
      <button type="submit" style={{ padding: '8px 12px', fontSize: '16px', cursor: 'pointer' }}>
        <SearchIcon />
      </button>
    </form>
  );
};

export default Form;
