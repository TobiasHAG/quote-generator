const QuoteContainer = document.getElementById('quote-container');
const QuoteText = document.getElementById('quote');
const AuthorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading Spinner.
function loadingSpinner() {
    loader.hidden = false;
    QuoteContainer.hidden = true;
}

// Hide Loading Spinner.
function completeSpinner() {
    QuoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote on page.
function newQuote() {
    loadingSpinner();
    // Pick a random quote from apiQuotes array.
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with Unknown.
    if(!quote.author) {
        AuthorText.textContent = "Unknown";
    } else {
        AuthorText.textContent = quote.author;
    }
    // Check Quote length to determine styling (size of font).
    if(quote.text.length > 120) {
        QuoteText.classList.add('long-quote');
    } else {
        QuoteText.classList.remove('long-quote');
    }
    // Set Quote on page, Hide Loader on page.
    QuoteText.textContent = quote.text;
    completeSpinner();

}

// Get Quotes From API.
async function getQuotes() {
    loadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        
        // Catch Error Here.
    }
}

// Tweet Quote by opening a new window.
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${QuoteText.textContent} - ${AuthorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners on the buttons.
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load of the page.
getQuotes();
