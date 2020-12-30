import React from "react";
import Axios from "axios";

export const useSection = () => {
  const [displayData, setDisplayData] = React.useState([]);
  const [batchedData, setBatchedData] = React.useState([]);
  const [sortType, setSortType] = React.useState("id");
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [endOfData, setEndOfData] = React.useState(false);
  const [ads, setAds] = React.useState([]);

  // This function will be called whenever sortType changed
  const fetchingData = async () => {
    console.log("fetching data");
    try {
      // When loading data, loading should popup
      setLoading(true);
      //  request url
      const requestUrl = `http://localhost:3000/api/products?_page=1&_limit=${
        20 * page
      }&_sort=${sortType}`;

      // I used async await to get the clear loading state
      const response = await Axios.get(requestUrl);

      // Just a destructuring
      const fetchedData = response.data;

      setDisplayData(fetchedData);
      // Since the requirement need batched data, I need to request batch data to improve the User experience
      await fetchingBatchData();
      setLoading(false);
    } catch (error) {
      // If the server is error
      throw new Error("cannot fetch the data");
    }
  };

  // This function is much similar to fetchingData
  const fetchingBatchData = async () => {
    console.log("fetching batch data");
    try {
      // it's prevent the failure/ wrong data added to displayData
      setBatchedData([]);
      setLoading(true);
      // request Url
      const requestUrl = `http://localhost:3000/api/products?_page=${
        page + 1
      }&_limit=20&_sort=${sortType}`;

      const response = await Axios.get(requestUrl);

      const fetchedData = response.data;
      // This will happen when there's no data to fetch anymore
      if (fetchedData.length === 0) {
        setLoading(false);
        return setEndOfData(true);
      }

      setBatchedData(fetchedData);
      setLoading(false);
    } catch (error) {
      throw new Error("cannot fetch the data");
    }
  };
  // This function will be called whenever user scroll to the bottom of the list grid
  const loadMore = () => {
    // This will prevent user abuse scrolling and prevent fetching data when end of data
    if (loading || endOfData) {
      return;
    }
    // increase page for batched data
    setPage(page + 1);
    // set the new Display Data
    setDisplayData([...displayData, ...batchedData]);
  };
  // This function will reroll data, if you need a trick to pass 2 ad in a row, use Math.random() * 8 and it will never have duplicate ad.
  const reRoll = () => Math.floor(Math.random() * 1000);

  // This function will get new ad and prevent 2 ad in a row
  const getNewAd = () => {
    let newAd = reRoll();
    if (ads.length === 0) {
      return setAds([...ads, newAd]);
    }

    const prevAd = ads[ads.length - 1];

    // This will make sure no ad display twice in a row
    if (newAd % 10 === prevAd % 10) {
      console.log("?");
      newAd += 3;
    }
    // set new Ads using es6
    setAds([...ads, newAd]);
  };

  React.useEffect(() => {
    // This will fetch data whenever sortType state changed
    fetchingData();
  }, [sortType]);

  React.useEffect(() => {
    // This will prevent fetching batch data 2 times
    if (page === 1) return;
    fetchingBatchData();
    // Since I render 20 item per request, I can call new ad in here
    getNewAd();
  }, [page]);

  return {
    models: { sortType, ads, displayData, endOfData, loading },
    operators: { loadMore, setSortType },
  };
};
