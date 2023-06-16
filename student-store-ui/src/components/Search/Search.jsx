import React, { useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import "./Search.css"

export default function Search({ handleSearch, products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products); // Initialize with all products

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
    console.log(filtered)
  };

  const [catSelect, setCatSelect] = useState(null);
  const [catProducts, setCatProducts] = useState(products); // Initialize with all products
 

  const handleCatChange = (event) => {
    const category = event.target.dataset.category; // Access the data category
    setCatSelect(category);
    console.log(category)
    console.log(products)
    const filtered = products.filter((product) =>
      product.category.includes(!category ? "" : category)
    );
    setCatProducts(filtered);
  };

  const getFilteredProducts = () => {
    if (!searchTerm && !catSelect) {
      return products;
    }

    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (catSelect) {
      filtered = filtered.filter((product) =>
        product.category.includes(catSelect)
      );
    }

    return filtered;
  };

  return (
    <div>
    <div className="search-bar">
        <input
          type="text"
          className="input"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="  Search for a product"
        />
        </div>

        <nav className="navbar">
      <div className="navcontent">
      <ul className="filter">
        <li className="filter" onClick={handleCatChange}>All</li>
        <li className="filter" onClick={handleCatChange} data-category="clothing">Clothing</li>
        <li className="filter" onClick={handleCatChange} data-category="accessories">Accessories</li>
        <li className="filter" onClick={handleCatChange} data-category="tech">Tech</li>
        <li className="filter" onClick={handleCatChange} data-category="food">Food</li>
        </ul>

      </div>
    </nav>


      <ProductGrid products={getFilteredProducts()} />
      </div>
      
  );
}