const Filter = ({ filter, handleChange }) => {
  return <input type="search" value={filter.query} onChange={handleChange} />;
};
export default Filter;
