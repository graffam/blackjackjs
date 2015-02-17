

function Card (value, suit){
  this.cardValue = value;
  this.cardSuit = suit;
}

function Deck () {
  var deck = [];
  var suits = ["♠", "♥", "♦", "♣"];
  for (i = 0; i < suits.length; i++) {
    for (num = 2; num <= 10; num++) {
      deck.push(new Card(num, suits[i]));
    }
    deck.push(new Card("J", suits[i]));
    deck.push(new Card("Q", suits[i]));
    deck.push(new Card("K", suits[i]));
    deck.push(new Card("A", suits[i]));
  }
  return deck;
}

function Shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i),
    x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function Deal(deck, hand) {
  hand.push(deck.pop(deck));
  hand.push(deck.pop(deck));
  return hand;
}

function Hit(deck, hand){
  hand.push(deck.pop(deck));
}

function cardsInHand(hand){
  cards = "";
  for (i = 0; i < hand.length; i++){
    cards += (hand[i].cardValue + hand[i].cardSuit + " ");
  }
  return cards;
}

function Score(hand){
  var score = 0;
  for(i = 0; i < hand.length; i++){
    if (hand[i].cardValue == "J" || hand[i].cardValue == "Q" || hand[i].cardValue == "K"){
      score += 10;
    }
    else if (hand[i].cardValue == "A"){
      if (score <= 11) { score += 10; }
      else { score += 1; }
    }
    else {
      score += hand[i].cardValue;
    }
  }
  return score;
}

function Game(score,hand,dealerHand,deck,playerScore,dealerScore){
  $(".status").replaceWith("<div class=status>Hit or Stay?</div>");
  $(".play").off("click");
  $(".play").replaceWith("<button class=\"hit\">Hit</button>");
  $(".buttons").append("<button class=stay>Stay</button>");
  $("div.inner").replaceWith("<div class=inner> Score: " + score + " </div>");

  playerScore = 0;
  dealerScore = 0;
  hand = [];
  dealerHand = [];
  deck = Shuffle(new Deck());
  hand = Deal(deck,hand);
  dealerHand = Deal(deck,dealerHand);

  $(".dealers").replaceWith("<div class=dealers>Dealers Hand: " +
    cardsInHand(dealerHand) + " Score: " + Score(dealerHand) +"</div>");

  playerScore = Score(hand);

  $(".players").replaceWith("<div class=players>You have " + cardsInHand(hand) + ", for: " +
    playerScore);

  $(".hit").click(function(){
    Hit(deck,hand);
    playerScore = Score(hand);

    if (playerScore > 21){
      $(".hit").off("click");
      $(".status").replaceWith("<div class=status>Bust! Play again?</div>");
      $(".hit").replaceWith("<button class=play>Again?</button");
      $(".stay").remove();
      score -= 1;
      $(".play").on("click", function(){
        Game(score,hand,dealerHand,deck,playerScore,dealerScore);
      });
    }
    else {
    $(".players").replaceWith("<div class=players>You have " + cardsInHand(hand) + ", for: " +
      playerScore);
      }
    });

  $(".stay").on("click", function(){
    while(Score(dealerHand) < 17){
      Hit(deck,dealerHand);
      $(".dealers").replaceWith("<div class=dealers>Dealers Hand: " +
        cardsInHand(dealerHand) + " Score: " + Score(dealerHand) +"</div>");
    }
    if(Score(dealerHand) > 21){
      $(".hit").off("click");
      $(".status").replaceWith("<div class=status>Dealer Bust! You Win! Play again?</div>");
      $(".hit").replaceWith("<button class=play>Again?</button");
      $(".stay").remove();
      score += 1;
      $(".play").on("click", function(){
        Game(score,hand,dealerHand,deck,playerScore,dealerScore);
      });
    }
    else if(Score(hand) > Score(dealerHand)){
      $(".hit").off("click");
      $(".status").replaceWith("<div class=status>You Win! Play again?</div>");
      $(".hit").replaceWith("<button class=play>Again?</button");
      $(".stay").remove();
      score += 1;
      $(".play").on("click", function(){
        Game(score,hand,dealerHand,deck,playerScore,dealerScore);
      });
    }
    else if(Score(hand) < Score(dealerHand)){
      $(".hit").off("click");
      $(".status").replaceWith("<div class=status>You Lose! Play again?</div>");
      $(".hit").replaceWith("<button class=play>Again?</button");
      $(".stay").remove();
      score -= 1;
      $(".play").on("click", function(){
        Game(score,hand,dealerHand,deck,playerScore,dealerScore);
      });
    }
    else {
      $(".hit").off("click");
      $(".status").replaceWith("<div class=status>Tie! Play again?</div>");
      $(".hit").replaceWith("<button class=play>Again?</button");
      $(".stay").remove();
      $(".play").on("click", function(){
        Game(score,hand,dealerHand,deck,playerScore,dealerScore);
      });
    }
  });
  }

$(document).ready(function() {
  var score = 0;
  var hand = [];
  var dealerHand = [];
  var deck = Shuffle(new Deck());
  var playerScore = 0;
  var dealerScore = 0;

  $(".play").on("click", function(){
    Game(score,hand,dealerHand,deck,playerScore,dealerScore);
  });
});
