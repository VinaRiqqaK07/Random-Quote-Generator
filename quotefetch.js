const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const spinner = document.querySelector('#js-spinner');
const tweetButton = document.querySelector('#js-tweet');
const newQuoteButton = document.querySelector('#js-quote-button');
newQuoteButton.addEventListener('click', getQuote);


async function getQuote(){
    spinner.classList.remove('hidden');
    newQuoteButton.disabled = true;
    try {
        const response = await fetch(endpoint);
        //if response not 200 OK
        if(!response.ok){
            throw Error(response.statusText);
        }

        const json = await response.json();
        displayQuote(json.message);
        setTweetButton(json.message);
    } catch (error) {
        console.log(error);
        alert('Failed to fetch new quote');
    } finally {
        spinner.classList.add('hidden');
        newQuoteButton.disabled = false;
    }
}

const displayQuote = (quote) => {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
};

const setTweetButton = (quote) => {
    tweetButton.setAttribute('href', `https://twitter.com/share?text=${quote} - Donald Trump`);
};

getQuote();