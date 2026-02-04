import c from 'ansi-colors'
import { FancyAnsi} from 'fancy-ansi'
// REQUIRE env
const convert = new FancyAnsi()
let txt = c.bgBlue.underline.white('Hi')
// console.log(txt)
// console.log(convert.toHtml(txt))

const iswin = true
function color(txt) {
  let a = c
  return 
}
console.log(c)
// if(iswin) {
//   let a = color
//   color = convert.toHtml(a)
//   console.log(this) 
// }
// console.log(color.red('hi'))
const css = `
:root {
  --ansi-bold-font-weight: 700;
  --ansi-dim-opacity: 0.7;
  --ansi-black: #2e3436;
  --ansi-red: #cc0000;
  --ansi-green: #4e9a06;
  --ansi-yellow: #c4a000;
  --ansi-blue: #3465a4;
  --ansi-magenta: #75507b;
  --ansi-cyan: #06989a;
  --ansi-white: #d3d7cf;
  --ansi-bright-black: #555753;
  --ansi-bright-red: #ef2929;
  --ansi-bright-green: #8ae234;
  --ansi-bright-yellow: #fce94f;
  --ansi-bright-blue: #729fcf;
  --ansi-bright-magenta: #ad7fa8;
  --ansi-bright-cyan: #34e2e2;
  --ansi-bright-white: #eeeeec;
}

<!-- Extended colors: -->
`
const more = `
38;5;{n} (0 ≤ n ≤ 15) Set foreground color - standard colors --ansi-{color}
38;5;{n} (232 ≤ n ≤ 232) Set foreground color - 24-step grayscale --ansi-gray-{step}
48;5;{n} (0 ≤ n ≤ 15) Set background color - standard colors --ansi-{color}
48;5;{n} (232 ≤ n ≤ 232) Set background color - 24-step grayscale --ansi-gray-{step}
58;5;{n} (0 ≤ n ≤ 15) Set underline color - standard colors --ansi-{color}
58;5;{n} (232 ≤ n ≤ 232) Set underline color - 24-step grayscale --ansi-gray-{step}
`