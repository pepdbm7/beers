const logic = {
  root: "https://api.punkapi.com/v2/beers",

  getAllBeers() {
    return fetch(this.root).then((res) => res.json());
  },

  getBeers({ beer_name, abv_gt, ibu_gt }) {
    console.log(beer_name, abv_gt, ibu_gt);
    if (beer_name && abv_gt && ibu_gt) {
      return fetch(
        `${this.root}?beers_name=${beer_name}&abv_gt=${abv_gt}&ibu_gt=${ibu_gt}`
      ).then((res) => res.json());
    } else if (beer_name && abv_gt) {
      return fetch(
        `${this.root}?beers_name=${beer_name}&abv_gt=${abv_gt}`
      ).then((res) => res.json());
    } else if (beer_name && ibu_gt) {
      return fetch(
        `${this.root}?beers_name=${beer_name}&ibu_gt=${ibu_gt}`
      ).then((res) => res.json());
    } else if (abv_gt && ibu_gt) {
      return fetch(`${this.root}?&abv_gt=${abv_gt}&ibu_gt=${ibu_gt}`).then(
        (res) => {
          console.log(res.json());
          return res.json();
        }
      );
    } else if (beer_name) {
      return fetch(`${this.root}?beers_name=${beer_name}`).then((res) =>
        res.json()
      );
    } else if (abv_gt) {
      return fetch(`${this.root}?abv_gt=${abv_gt}`).then((res) => res.json());
    } else if (ibu_gt) {
      return fetch(`${this.root}?ibu_gt=${ibu_gt}`).then((res) => res.json());
    }
  },
};

export default logic;
