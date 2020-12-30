import React from "react";

export const useGridList = (params) => {
  const { ads, displayData, endOfData, loadMore } = params;
  const scrollingRef = React.useRef(null);

  // This useEffect will listen to scrolling event
  React.useEffect(() => {
    if (!scrollingRef.current) return;

    // You will notice I usually make extra constant, it's for another developer read the code easier
    const element = scrollingRef.current;

    // handle scroll function
    const handleScroll = () => {
      // If the user scroll to the end
      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        loadMore();
      }
    };

    // Add event listener
    element.addEventListener("scroll", handleScroll);
    // Since event listener don't remove by it self, you need to manually remove it
    return () => element.removeEventListener("scroll", handleScroll);
  });

  return {
    models: { ads, displayData, endOfData },
    operators: { scrollingRef },
  };
};
