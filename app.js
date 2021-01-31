// Springboard
//Section 31.2 Async await
//Part 1
//Question 1
//Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.


// async function faveNumFact(){
//     console.log('Starting');
//     let url = "http://numbersapi.com/22/trivia";
//     let {data} = await axios.get(url)
//     console.log('Ending');
//     console.log(data)
// }

// faveNumFact()


//Question 2
//Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// async function manyNums(){
//     console.log('Starting');
//     let baseURL = "http://numbersapi.com";
//     let {data: n1} = await axios.get(`${baseURL}/12/trivia`)
//     console.log(n1);
//     let {data: n2} = await axios.get(`${baseURL}/17/math`)
//     console.log(n2);
//     let {data: n3} = await axios.get(`${baseURL}/19/date`)
//     console.log(n3);
//     let {data: n4} = await axios.get(`${baseURL}/29/year`)
//     console.log(n4);
//     console.log('Ending');
// }

// manyNums()

//Question 3
//Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
// (Note: You’ll need to make multiple requests for this.)

// async function manyNums(){
//     console.log('Starting');
//     let baseURL = "http://numbersapi.com";
//     let {data: n1} = await axios.get(`${baseURL}/12/trivia`)
//     console.log(n1);
//     let {data: n2} = await axios.get(`${baseURL}/17/math`)
//     console.log(n2);
//     let {data: n3} = await axios.get(`${baseURL}/19/date`)
//     console.log(n3);
//     let {data: n4} = await axios.get(`${baseURL}/29/year`)
//     console.log(n4);
//     console.log('Ending');

//     $('#f1').text(n1)
//     $('#f2').text(n2)
//     $('#f3').text(n3)
//     $('#f4').text(n4)
// }

// manyNums()


//refactoring so that the API calls are not sequential

// async function manyNums(){
//     let baseURL = "http://numbersapi.com";
//     let num1 = axios.get(`${baseURL}/12/trivia`);
//     let num2 = axios.get(`${baseURL}/17/math`);
//     let num3 = axios.get(`${baseURL}/19/date`);
//     let num4 = axios.get(`${baseURL}/29/year`);

//     let {data: n1} = await num1;
//     let {data: n2} = await num2;
//     let {data: n3} = await num3;
//     let {data: n4} = await num4;

//     $('#f1').text(n1)
//     $('#f2').text(n2)
//     $('#f3').text(n3)
//     $('#f4').text(n4)
// }

// manyNums()

//refactoring using Promise.all

// async function manyNums(){
//     let baseURL = "http://numbersapi.com";
//     let faveNums = await Promise.all([
//         axios.get(`${baseURL}/12/trivia`),
//         axios.get(`${baseURL}/17/math`),
//         axios.get(`${baseURL}/19/date`),
//         axios.get(`${baseURL}/29/year`)
//     ])

//     $('#f1').text(faveNums[0].data)
//     $('#f2').text(faveNums[1].data)
//     $('#f3').text(faveNums[2].data)
//     $('#f4').text(faveNums[3].data)
// }

// manyNums()


// Part 2 Deck of Cards
// Question 1
//Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// async function getACard(){
//     let baseURL = "https://deckofcardsapi.com/api/deck";
//     let {data} = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
//     let res = await axios.get(`${baseURL}/${data.deck_id}/draw/?count=1`)
//     console.log(res.data.cards[0].suit);
//     console.log(res.data.cards[0].value);
// }

// getACard()


// Question 2
//Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.

// async function getACard(){
//     let baseURL = "https://deckofcardsapi.com/api/deck";
//     let {data} = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
//     let res = await axios.get(`${baseURL}/${data.deck_id}/draw/?count=1`)
//     let res2 = await axios.get(`${baseURL}/${data.deck_id}/draw/?count=1`)
//     console.log(res.data.cards[0].value, res.data.cards[0].suit);
//     console.log(res2.data.cards[0].value, res2.data.cards[0].suit);
// }

// getACard()


//Question 3
//Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let baseURL = "https://deckofcardsapi.com/api/deck";
let deckID

async function getNewDeck(){
    let {data} = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
    deckID = data.deck_id
}

getNewDeck()

$('.btn').click(async function(){
        let {data} = await axios.get(`${baseURL}/${deckID}/draw/?count=1`);
        let image = data.cards[0].images.png;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $('#cardTable').append(
            $(`<img src=${image} alt="Playing card" height="150" width="100" 
            style="transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg)"</>`))
            
            if (data.remaining === 0){
                $('.btn').remove()
            };        
});


