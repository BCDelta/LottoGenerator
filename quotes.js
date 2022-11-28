const quotes = [
    "Change starts with a dream.",
    "Getting rich is mostly luck.",
    "All big things start from something small.",
    "Just one ticket can be a life changer.",
    "If you dream it, it will come.",
    "Lottery winners aren't born. They're made.",
    "If you want more luck, take more chances.",
    "Happiness is something obtained in the moment.",
    "Believe in something greater.",
    "One ticket. Unlimited possibilities."
]

function quoteRandomizer() {
    let randomIndex = Math.floor(Math.random() * quotes.length);

    const randomQuote = document.getElementById("quote");
    randomQuote.innerHTML = quotes[randomIndex];

}