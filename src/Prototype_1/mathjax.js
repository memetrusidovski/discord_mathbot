var mathjax = require("mathjax");

var s = 'x/y';
//var s = 'x = alpha int (-b +- sqrt(b^2-4ac))/(2a) (xy^2)';

const m = mathjax.init({
    svg:{scale:2},
    loader: {load: ['input/asciimath', 'output/svg'],}
  }).then((MathJax) => {
    const svg = MathJax.asciimath2svg(s, {display: true});
    
    a = svg.children[0].attributes.width;
    b = svg.children[0].attributes.height;

     svg.children[0].attributes.width = '100%';//Make svg scale to canvas size
     svg.children[0].attributes.height = '100%';

     return [MathJax.startup.adaptor.innerHTML(svg), {a, b}];
    //return svg.children;

  }).catch((err) => console.log(err.message));


m.then(function(m) { console.log(m[1].a[0])})

module.exports = m;