import React, { useState, useEffect } from "react";
import logic from "../logic";

const Home = () => {
  const [search, setSearch] = useState({
    abv_gt: "",
    ibu_gt: "",
    beer_name: "",
  });
  const [beers, setBeers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(async () => {
    const allBeers = await logic.getAllBeers();
    setBeers(allBeers);
  }, []);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setSearch({ ...search, [name]: value });
  };

  const onSearch = (e) => {
    e.preventDefault();
    try {
      logic
        .getBeers(search)
        .then((beers) => {
          console.log({ beers });
          setBeers(beers);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 1500);
        });
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    }
  };

  const onClear = () => {
    setSearch({ abv_gt: "", ibu_gt: "", beer_name: "" });
  };

  return (
    <div className="page">
      <div className="upper">
        <form className="custom-form" onSubmit={onSearch}>
          <div className="form-group">
            <label>Search Beer</label>
            <input
              onChange={handleChange}
              value={search.beer_name}
              name="beer_name"
              type="text"
              placeholder="Write a beer name"
              autoFocus
            />
          </div>
          <select name="abv_gt" onChange={handleChange}>
            <option value="">Choose an ABV</option>
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
          <select name="abv_gt" onChange={handleChange}>
            <option value="">Choose an ABV</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
          <button onClick={onClear} type="button">
            Clear search
          </button>
          <input type="submit" value="SEARCH" />
          <p className="error">{errorMessage}</p>
        </form>
      </div>
      <ul className="container">
        {beers
          ? beers.map((beer) => (
              <li className="beer" key={beer.id}>
                <h2>{beer.name}</h2>
                <p>{beer.description}</p>
                <p>ABV: {beer.abv}</p>
                <p>IBU: {beer.ibu}</p>
                <img src={beer.image_url} alt="beer" />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Home;
