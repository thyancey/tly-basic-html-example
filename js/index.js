

function startApplication(){
  console.log('The web page has loaded and my data is', myData);
}

function buttonHandler(arg){
  console.log('you clicked a button! It has passed along this argument:', arg);
  renderExample('This text was made with javascript', arg);
}

/*
  use some simple if/else logic to check which button was pressed
  and update the HTML dynamically
*/
function renderExample(text, type){
  if(type === 'TEXT'){
    var html = renderTextExample(text);
    renderById(html, '#example-element');
  }
  else if(type === 'HEADER'){
    var html = renderComponentExample(text);
    renderById(html, '#example-element');
  }
  else if(type === 'LIST'){
    var html = renderListComponentExample(text);
    renderById(html, '#example-element');
  }
  else{
    renderById(`<p>ERROR, invalid button type</p>`, '#example-element');
  }
}

/*
  pass some html and the html id of the component you'd like to render under
  renderById('<h2>hello</h2>', '#example-element');
*/
function renderById(html, cssSelector){
  var element = document.querySelector(cssSelector);
  if(element){
    element.innerHTML = html;
  }
}

// a straightforward HTML example
function renderTextExample(text){
  return `
    <p>${text}</p>
  `
}

// a straightforward HTML example
function renderComponentExample(text){
  return `
    <div class="header-example">
      <h2>${'This example shows some text'}</h2>
      <p>${text}</p>
    </div>
  `
}

// using some code to produce random results
// the global variable myData comes from './store.js'
function renderListComponentExample(text){
  var itemsHtml = [];

  var maxEntries = window.myData.maxEntries;
  /*
    Makes a random integer between 0 and the max entries we want

    - Math.random() makes a random number each time this code is executed
    - The number is between 0 and 1.0 (such as .6584839343). multiplying that number * 20 gives you a random number between 0 and 20.0 (such as 14.6584839343)
    - Using Math.round() around the result of it makes it round to the nearest whole number (integer) again (16.12345 becomes 16)
  */
  var randomInteger = Math.round(Math.random() * maxEntries);

  /*
    Define what each list item will look like in HTML. 
    They wont be put on the page immediately, we're preparing
    the instructions and storing them for later
  */ 
  for(var i = 0; i < randomInteger; i++){
    // itemsHtml.push(`<li>${i}: ${text}</li>`);
    itemsHtml.push(`
      <li>
        <div class="list-item">
          <span>${i}: </span>
          <span>${text}</span>
        </div>
      </li>`);
  }

  /*
    now spit out the whole component. 
    
    The .join() function is taking our array and combining it into a single line of text.

    // A basic example:
    var myFood = [ "Apples", "Bananas", "Carrots" ];
    myFood.join('-');

    // will return
    "Apples-Bananas-Carrots"

    // In our case:
    var itemsHtml = [ "<li>1: text</li>", "<li>2: text</li>" ];
    itemsHtml.join('\n');

    // will return
    <li>1: text</li>
    <li>2: text</li>
  */
  return `
    <div class="list-example">
      <h2>${'This example shows a dynamic list'}</h2>
      <ul>
        ${itemsHtml.join('\n')}
      </ul>
    </div>
  `
}


/*
  This code will execute before all the functions defined above it.

  The addListener for 'load' is important to make sure
  the webpage is ready (html and css loaded) before you 
  start running this specific JS code

  "when the browser says it's ready, start the program"
*/
window.addEventListener('load', startApplication);