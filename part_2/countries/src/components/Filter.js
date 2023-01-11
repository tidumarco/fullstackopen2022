const Filter = ({ filter, handleChange,apiCall }) => {
  return <input type="search" value={filter.query} onChange={handleChange} />;
};
export default Filter;
