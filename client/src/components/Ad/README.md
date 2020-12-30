1. I make this one 3rd and tested it with hardcoded url. After that I passed props into it.
2. You can see I destructuring directly in the params. This will save boilerplate code
   example: destructuring later

export const Test = (props) => {
const {} = props;
return <></>
}

destructuring directly

export const Test = ({}) => {
return <></>
}
