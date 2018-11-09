// import cheerio and requests from npm
const cheerio = require('cheerio');
const rp = require('request-promise');

// set the url we're going to scrape
// the uri is the url we want to get data from
// transform is what we will do with our result html - we will load the html to cheerio then return it
const options = {
    uri: 'http://www.laughfactory.com/jokes/clean-jokes',
    transform: body => cheerio.load(body)
  };

// request is passed our options
rp.get(options).then($ => {
    // we set an empty array where we will store our jokes
    var jokeArr = [];

    // $ is cheerio loaded with our html -- we can now manipulate it and parse data we want
    // first we find all <div>'s with the class="jokes"
    // next we use a selector to find all elements with class="joke-msg"
    // next we cycle through each element we found using the .each() method which is similar to the .forEach() that you might be used to
    $('div[class="jokes"]').find('.joke-msg').each((index, element) => {
        // push the text and author of the joke to our array
        jokeArr.push( {
            text: $(element).find('.joke-text').text(),
            author: $(element).find('.joke-publisher').text()
        });
    });

    // lets take a look at the first joke we got
    console.log(jokeArr[0]);

    // the text is all screwed up! lets fix it up
    jokeArr = jokeArr.map((joke) => {
        // since there is a lot of white space and new lines let's split the text by new lines then trim it then rejoin it all
        // we spread the joke object then replace the text with the clean string
        return { 
            ...joke, 
            text: joke.text.split('\n').map(item => item.trim()).join('')
        }
    });

    // the jokes should all be clean now
    console.log(jokeArr);
    
}).catch(e => console.log(e));
