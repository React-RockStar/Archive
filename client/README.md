1. You can see I separate the component into 3 files, .jsx, .logic, .module.css

- .jsx will only rendering UI. it will render the HTML.
- .logic.js will do the logic. I start at useBlahBlah since it's basically a custom hook. I also return in a formatted:
  { models: {}, operators: {} }
  This help you trace easier which is the state, and which is the method
- .module.css will do the styles. You can have a quick look on Modules CSS by google it "Modules CSS"

2. You will see I don't export default, this is because export default will need to read all of file, since export will read only what it's exported. And it's easier to find aswell instead of manually defined in top.

### FEATURES

1. I create a header component first and re-write it based on index.html file in public folder

2. I create Grid Item, it's a box with emoticon, id, etc...

3. I create Ad third, it's just an img tag with custom styles.

4. I create Section last, and do the logic inside it.

### Requirement Feature

1. products are displayed in a grid. => Grid Item and Grid List

2. give the user an option to sort the products in ascending order. Can sort by "size", "price" or "id". The products list should be reloaded when a new sorting option is chosen. => In Section component, There's a renderType and sortedType state.

3. a "size" field, which is the font-size (in pixels). We should display the faces in their correct size, to give customers a realistic impression of what they're buying. => Grid Item, you can see I put fontSize with the real size in it.

4. a "price" field, in cents. This should be formatted as dollars like $3.51. => From centToDollars, you can see the document here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

5. a "date" field, which is the date the product was added to the catalog. Dates should be displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed. => relative Time.js It will calculate the relative time in hours ago, days ago and dd/mm/yyyy format.

6. the product grid should automatically load more items as you scroll down. => Grid List, I implemented a useEffect that detect whenever user scroll to the bottom

7. display an animated "loading..." message while the user waits for the data to load. => Loading, I used a library called typed, I make it with exactly with it said lol. You can use other loading image if you want :D

8. to improve the user's experience, we should always pre-emptively fetch the next batch of results in advance, making use of idle-time. But they still should not be displayed until the user has scrolled to the bottom of the product grid. => fetchingBatchData in Section.logic.js, it will load next 20 item when it called.

9. when the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~". => GridList.tsx

10. after every 20 products we need to insert an advertisement from one of our sponsors. Use the same markup as the advertisement in the header shown in public/index/html, but make sure the ?r query param is randomly generated each time an ad is displayed. => Gridlist.tsx, I added a logic like index % 20 === 0 to detect whenever the item is 20 or not.

11. Ads should be randomly selected, but a user must never see the same ad twice in a row. => Section.logic.js, the getNewAd() function. first it will generate a random number and it will compare with the previous ad. The sever logic takes the last digit and this function either. If the new ad is same with prevAd then +3. So it will never happen.
