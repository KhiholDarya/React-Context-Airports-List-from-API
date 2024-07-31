import { useContext } from "react";
import "../../commonStyles.css"
import { ProductsContext } from "../../context/productsContext";


const ProductsFilters = () => {

  const { filterProducts, categories } = useContext(ProductsContext);

  const handleNameChange = (event) => {
    filterProducts(event.target.value, null, null);
  };

  const handleCategoryChange = (event) => {
    filterProducts(null, event.target.value, null);
  };

  const handleOnlyFoodChange = (event) => {
    filterProducts(null, null, event.target.checked);
  };

  return (
    <div>
      <label>
        Filter by Name:
        <input type="text" name="name" onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Filter by Category:
        <select name="category" onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Food Products Only:
        <input type="checkbox" name="foodProductsOnly" onChange={handleOnlyFoodChange} />
      </label>
    </div>
  );
};


export default ProductsFilters;
