document.getElementById("year").textContent = new Date().getFullYear();

let shaCount = 2;
let shanCount = 1;
let hp2 = 1;

let e = null;

function useSha() {
    const shaContainer = document.getElementById("shaCards");
    const shaImages = shaContainer.getElementsByTagName("img");

    // Find a strike card
    let visibleSha = Array.from(shaImages).find(img => img.style.visibility !== 'hidden');

    // Play Strike
    showCardEffect("imgs/cards/strike.jpg");
    setTimeout(() => {
        visibleSha.style.visibility = "hidden";
    }, 600);

    // check for Dodge
    // w3school setTimeout: https://www.w3schools.com/js/js_timing.asp
    setTimeout(() => {
        const shanContainer = document.getElementById("shanCards");
        const shanImages = shanContainer.getElementsByTagName("img");

        // Find a dodge card
        let visibleShan = Array.from(shanImages).find(img => img.style.visibility !== 'hidden');

        if (visibleShan) {
            showCardEffect("imgs/cards/dodge.jpg");

            setTimeout(() => {
                visibleShan.style.visibility = "hidden";
            }, 600);

            showModal("Liu Bei used Dodge and avoided the attack!");

            e = null;

        } else {
            showModal("Liu Bei has no Dodge card and takes 1 damage!");
            // play sound when Liu Bei takes 1 damage
            document.getElementById("swordSound").play(); 
            e = "damage";
        }
    }, 1000);
}

function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("damageModal").style.display = "block";
}

function confirmAction() {
    document.getElementById("damageModal").style.display = "none";

    if (e === "damage") {
        hp2 -= 1;
        document.getElementById("hp2").textContent = hp2;

        e = null;

        if (hp2 <= 0) {
            document.getElementById("player2").classList.add("dead");

            document.getElementById("deathOverlay").style.display = "block";
            deathModal("Liu Bei has been defeated!");
        }
    }
}


function resetGame() {
    document.getElementById("damageModal").style.display = "none";

    // Reset HP
    hp2 = 1;
    document.getElementById("hp2").textContent = hp2;
    document.getElementById("player2").classList.remove("dead");

    // Reset strike cards and dodge cards
    const shaImages = document.getElementById("shaCards").getElementsByTagName("img");
    const shanImages = document.getElementById("shanCards").getElementsByTagName("img");

    for (let img of shaImages) {
        img.style.visibility = "visible";
    }

    for (let img of shanImages) {
        img.style.visibility = "visible";
    }

    e = null;
    document.getElementById("deathOverlay").style.display = "none";

    document.getElementById("confirmBtn").style.display = "inline-block";

    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("modalMessage").textContent = "";
}


function showCardEffect(imageSrc) {
    const display = document.getElementById("cardEffectDisplay");

    const img = document.getElementById("effectImage");

    img.src = imageSrc;
    display.style.opacity = 1;

    setTimeout(() => {
        display.style.opacity = 0;
    }, 600);
}

// https://www.youtube.com/watch?v=Qk5W6XWbsq0
function deathModal(message) {
    const modal = document.getElementById("damageModal");
    const modalMessage = document.getElementById("modalMessage");

    modalMessage.textContent = message;


    const confirmBtn = document.getElementById("confirmBtn");
    confirmBtn.style.display = "none";

    const resetBtn = document.getElementById("resetBtn");

    resetBtn.style.display = "inline-block";
    modal.style.display = "block";
}
