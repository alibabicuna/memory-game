"use strict";

let card1;
let card2;

storeUserInCookie();

loadCardsFromJson();

$(".memoryCard .cover").click(function () {
    if (card1 == null) {
        card1 = $(this).siblings()[0].className;
        $(this).hide();
    } else {
        card2 = $(this).siblings()[0].className;
        $(this).hide();

        if (card1 == card2) {
            $("." + card1.split(" ")[1]).siblings().each((key, value) => {
                $(value).addClass("revealed");
            });
        }

        setTimeout(function () {
            $(".memoryCard .cover:not(.revealed)").show();
            checkGameWon();
        }, 300);
        card1 = null;
        card2 = null;
    }

});

function storeUserInCookie() {
    const username = window.prompt("Please enter your name:");
    document.cookie = "username=" + username;
}

function checkGameWon() {
    if (allCardsRevealed()) {
        const savedUsername = document.cookie.split('username=')[1];
        window.alert("Congratulations " + savedUsername);
        return;
    }

    function allCardsRevealed() {
        return $(".memoryCard .cover:not(.revealed)").length == 0;
    }
}

function loadCardsFromJson() {
    $.ajax("cards.json").done((data) => {
        let cardIcons = createIconsFromData(data);
        let duplicatedCardIcons = createCardDuplicates(cardIcons);
        let shuffledDuplicatedCardIcons = duplicatedCardIcons.sort(() => Math.random() - 0.5);

        $(".memoryCard").each(function (idx) {
            $(this).prepend(shuffledDuplicatedCardIcons[idx]);
        });
    });
}

function createIconsFromData(data) {
    return Object.values(data).map(card => "<i class='fas " + card + "'></i>");
}

function createCardDuplicates(cards) {
    return cards.flatMap(i => [i, i]);
}