let minimized = false
let element = document.createElement('div');

element.innerHTML = '<h1>MxV-Client</h1>'
element.style.background = 'rgb(25,25,25)'
element.style.color = 'white';
element.style.fontFamily = 'Comfortaa';
element.style.position = 'absolute';
element.style.borderRadius = '.75em';
element.style.height = '500px';
element.style.width = '400px';
element.style.textAlign = 'center';
element.style.position = 'absolute';
element.style.overflow = 'hidden'
element.style.top = '50px';
element.style.left = '50px';

document.body.appendChild(element);
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
element.onmousedown = ((e = window.event) => {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = (() => {
        document.onmouseup = null;
        document.onmousemove = null;
    });
    document.onmousemove = ((e) => {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        let top = (element.offsetTop - pos2) > 0 ? (element.offsetTop - pos2) : 0;
        let left = (element.offsetLeft - pos1) > 0 ? (element.offsetLeft - pos1) : 0;
        element.style.top = top + "px";
        element.style.left = left + "px";
        input.style.top = top + 80 + "px";
        input.style.left = left + 60 + "px";
    });
});

let info3 = document.createElement('div')
info3.style.fontFamily = 'Comfortaa'
info3.style.height = '200px'
info3.style.width = '175px'
info3.style.background = 'rgb(25,25,25)'
info3.style.position = 'absolute'
info3.style.borderRadius = '.75em'
info3.style.top = '50px'
info3.style.right = '50px'
info3.style.color = 'white'
info3.hidden = true
document.body.appendChild(info3)
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
info3.onmousedown = ((e = window.event) => {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = (() => {
        document.onmouseup = null;
        document.onmousemove = null;
    });
    document.onmousemove = ((e) => {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        let top = (info3.offsetTop - pos2) > 0 ? (info3.offsetTop - pos2) : 0;
        let left = (info3.offsetLeft - pos1) > 0 ? (info3.offsetLeft - pos1) : 0;
        info3.style.top = top + "px";
        info3.style.left = left + "px";
    });
});

let globalCheats = document.createElement('div')
element.appendChild(globalCheats)

let inGameCheatsMenu = document.createElement('div')
element.appendChild(inGameCheatsMenu)

let info = document.createElement('p')
info.style.fontFamily = 'Comfortaa';
info.style.height = '100px'
element.appendChild(info)

let info2 = document.createElement('p')
info2.style.fontFamily = 'Comfortaa'
info2.style.height = '100px'
info2.hidden = true
element.appendChild(info2)

let input = document.createElement('input')
input.style.borderRadius = '0.5em';
input.style.fontFamily = 'Comfortaa';
input.style.fontSize = '11px'
input.style.color = 'white'
input.style.backgroundColor = "rgb(25, 25, 25)"
input.style.borderStyle = 'solid'
input.style.borderWidth = '2px'
input.style.position = 'absolute'
input.placeholder = 'Which box do you want to open? (e.g. Space)'
input.className = "css-class-name"
input.type = 'text'
input.style.height = '30px'
input.style.width = '272px'
input.id = 'input'
input.style.top  = '130px' 
input.style.left = '110px'
input.hidden = true
input.onchange = () => {
    let box = document.getElementById('input').value
    document.getElementById('input').value = ''
    document.getElementById('input').placeholder = 'How many boxes do you want to open?'
    input.style.width = '197px'
    let buyAllBtn = document.createElement('button')
    buyAllBtn.style.top = '80px'
    buyAllBtn.style.left = '265px'
    buyAllBtn.innerHTML = 'Buy All';
    buyAllBtn.style.borderRadius = '0.5em';
    buyAllBtn.style.fontFamily = 'Comfortaa';
    buyAllBtn.style.color = 'white'
    buyAllBtn.style.backgroundColor = "rgb(68, 68, 68)"
    buyAllBtn.style.borderStyle = 'none'
    buyAllBtn.style.height = '35px'
    buyAllBtn.style.width = '75px'
    buyAllBtn.style.position = 'absolute'
    buyAllBtn.onclick = () => {
        buyAll(box)
        input.hidden = true
        buyAllBtn.hidden = true
        info2.hidden = false
        info3.hidden = true
        info.hidden = true
    }
    element.appendChild(buyAllBtn)
    
    input.onchange = () => {
        
        let boxes = {

            safari: 25,

            aquatic: 20,

            bot: 20,

            space: 20,

            breakfast: 15,

            medieval: 15,

            wonderland: 15

        }

        if (!Object.keys(boxes).includes(box.toLowerCase())) {input.hidden = true; info2.hidden = false; info2.style.color = 'red'; info2.innerHTML = 'I could not find that box!'} 

        let amount = document.getElementById('input').value

        fetch("https://api.blooket.com/api/users", { credentials: "include" }).then(x => x.json()).then(x => {

            if (x.tokens < boxes[box.toLowerCase()] * amount) amount = Math.floor(x.tokens / boxes[box.toLowerCase()]);

            if (!amount) {info2.style.color = 'red'; info2.innerHTML = 'You do not have enough tokens!'}

            let wait = ms => new Promise(r => setTimeout(r, ms));

            getValues().then(async e => {

                let error = false,

                    blooks = [];

                for (let i = 0; i < amount; i++) {

                    fetch("https://api.blooket.com/api/users/unlockblook", {

                        method: "put",

                        credentials: "include",

                        headers: {

                            "content-type": "application/json",

                            "X-Blooket-Build": e.blooketBuild,

                            'Access-Control-Allow-Origin': true

                        },

                        body: await encodeValues({

                            name: x.name,

                            box: box.charAt(0).toUpperCase() + box.slice(1).toLowerCase()

                        }, e.secret)

                    }).then(async x => {

                        let blook = await x.json();

                        blooks.push(blook.unlockedBlook);

                        info2.style.color = 'white'

                        info2.innerHTML = `${blook.unlockedBlook} (${i + 1}/${amount})`;

                    }).catch(() => { error = true });

                    await wait(750);

                    if (error) break;

                }

                let count = {};

                blooks.forEach(blook => { count[blook] = (count[blook] || 0) + 1 });

                info3.hidden = false; info3.innerHTML = `Results:\n` + Object.entries(count).map((x) => `    ${x[1]} ${x[0]}`).join(`\n`); info2.style.color = 'green';info2.innerHTML = 'Succsefully bought all boxes'

            }).catch(() => {info2.style.color = 'red'; info2.innerHTML = 'There was an error encoding requests!'});

        }).catch(() => {info2.style.color = 'red'; info2.innerHTML = 'There was an error getting username!'});
        input.hidden = true
        buyAllBtn.hidden = true
        info.hidden = true
        info2.hidden = false

    }
    
}
document.body.appendChild(input)


let tokens = document.createElement('button');
tokens.innerHTML = 'Daily Tokens';
tokens.style.borderRadius = '0.5em';
tokens.style.fontFamily = 'Comfortaa';
tokens.style.color = 'white'
tokens.style.backgroundColor = "rgb(68, 68, 68)"
tokens.style.borderStyle = 'none'
tokens.style.height = '30px'
tokens.style.width = '280px'
tokens.style.position = 'absolute'
tokens.style.top = '130px'
tokens.style.left = '60px'
tokens.onclick = () => {
  
function randomIntFromInterval(min, max) { 

  return Math.floor(Math.random() * (max - min + 1) + min)}

const coins1 = randomIntFromInterval(200, 300)

const coins2 = 500 - coins1

    addTokens(coins1)
    setTimeout(() => {
        addTokens(coins2)
    }, 500)

    function addTokens(amount){

    info2.hidden = false

    info.hidden = true
   
    fetch("https://api.blooket.com/api/users", { credentials: "include" }).then(x => x.json()).then(x => {

        getValues().then(async e => {

            fetch("https://api.blooket.com/api/users/add-rewards", {

                method: "put",

                credentials: "include",

                headers: {

                    "content-type": "application/json",

                    "X-Blooket-Build": e.blooketBuild

                },

                body: await encodeValues({

                    name: x.name,

                    addedTokens: amount,

                    addedXp: 300

                }, e.secret)

            }).then(() => {info2.style.color = 'green'; info2.innerHTML = 'Added daily rewawrds!'}).catch(() => {info2.style.color = 'red'; info2.innerHTML = 'There was an error when adding rewards!'});

        }).catch(() => {info2.style.color = 'red'; info2.innerHTML = 'There was an error encoding requests!'});

    }).catch(() => {info2.style.color = 'red'; info2.innerHTML = 'There was an error getting username!'});
}}
globalCheats.appendChild(tokens)

let autoAnswerToggle = document.createElement('button');
autoAnswerToggle.innerHTML = 'Toggle Auto Answer';
autoAnswerToggle.style.borderRadius = '0.5em';
autoAnswerToggle.style.fontFamily = 'Comfortaa';
autoAnswerToggle.style.color = 'white'
autoAnswerToggle.style.backgroundColor = "rgb(68, 68, 68)"
autoAnswerToggle.style.borderStyle = 'none'
autoAnswerToggle.style.height = '30px'
autoAnswerToggle.style.width = '280px'
autoAnswerToggle.style.position = 'absolute'
autoAnswerToggle.style.top = '170px'
autoAnswerToggle.style.left = '60px'
autoAnswerToggle.onclick = () => {
    autoAnswer = !autoAnswer
}
globalCheats.appendChild(autoAnswerToggle)

let highlightAnswersToggle = document.createElement('button');
highlightAnswersToggle.innerHTML = 'Toggle Highlight Answers';
highlightAnswersToggle.style.borderRadius = '0.5em';
highlightAnswersToggle.style.fontFamily = 'Comfortaa';
highlightAnswersToggle.style.color = 'white'
highlightAnswersToggle.style.backgroundColor = "rgb(68, 68, 68)"
highlightAnswersToggle.style.borderStyle = 'none'
highlightAnswersToggle.style.height = '30px'
highlightAnswersToggle.style.width = '280px'
highlightAnswersToggle.style.position = 'absolute'
highlightAnswersToggle.style.top = '210px'
highlightAnswersToggle.style.left = '60px'
highlightAnswersToggle.onclick = () => {
    highlightAnswers = !highlightAnswers
}
globalCheats.appendChild(highlightAnswersToggle)


let spamBoxes = document.createElement('button');
spamBoxes.innerHTML = 'Spam Boxes';
spamBoxes.style.borderRadius = '0.5em';
spamBoxes.style.fontFamily = 'Comfortaa';
spamBoxes.style.color = 'white'
spamBoxes.style.backgroundColor = "rgb(68, 68, 68)"
spamBoxes.style.borderStyle = 'none'
spamBoxes.style.height = '30px'
spamBoxes.style.width = '280px'
spamBoxes.style.position = 'absolute'
spamBoxes.style.top = '250px'
spamBoxes.style.left = '60px'
spamBoxes.onclick = () => {
    info.hidden = true
    info2.hidden = true
    info3.hidden = true
    input.hidden = false
}
globalCheats.appendChild(spamBoxes)

let autoSell = document.createElement('button');
autoSell.innerHTML = 'Auto Sell Dupes';
autoSell.style.borderRadius = '0.5em';
autoSell.style.fontFamily = 'Comfortaa';
autoSell.style.color = 'white'
autoSell.style.backgroundColor = "rgb(68, 68, 68)"
autoSell.style.borderStyle = 'none'
autoSell.style.height = '30px'
autoSell.style.width = '280px'
autoSell.style.position = 'absolute'
autoSell.style.top = '290px'
autoSell.style.left = '60px'
autoSell.onclick = () => {
    info.hidden = true;
    input.hidden = true
    info2.hidden = false;
    fetch("https://api.blooket.com/api/users", { credentials: "include" }).then(x => x.json()).then(x => {

                        let blooks = Object.entries(x.unlocks).map(x => [x[0], x[1] - 1]).filter(x => x[1] > 0);

                        let wait = ms => new Promise(r => setTimeout(r, ms));

                        getValues().then(async e => {

                            let error = false;

                            info2.innerHTML = 'Selling duplicate blooks, please wait';

                            for (let [blook, numSold] of blooks) {

                                fetch("https://api.blooket.com/api/users/sellblook", {

                                    method: "put",

                                    credentials: "include",

                                    headers: {

                                        "content-type": "application/json",

                                        "X-Blooket-Build": e.blooketBuild

                                    },

                                    body: await encodeValues({

                                        name: x.name,

                                        blook,

                                        numSold

                                    }, e.secret)

                                }).catch(() => { error = true });

                                await wait(750);

                                if (error) break;

                            }
                            
                            info2.style.color = 'green'

                            info2.innerHTML = 'All Duplicate Blooks Sold'

                            info3.hidden = false

                            info3.innerHTML = `Results:\n` + blooks.map((x) => `    ${x[1]} ${x[0]}`).join(`\n`);

                        }).catch(() => {info2.style.color = 'red'; info2.innerHTML = 'There was an error encoding requests!'});

                    }).catch(() => {info2.style.color = 'red'; info2.innerHTML = 'There was an error getting user data!'});
}
globalCheats.appendChild(autoSell)

let spoofBlooks = document.createElement('button');
spoofBlooks.innerHTML = 'Spoof Blooks';
spoofBlooks.style.borderRadius = '0.5em';
spoofBlooks.style.fontFamily = 'Comfortaa';
spoofBlooks.style.color = 'white'
spoofBlooks.style.backgroundColor = "rgb(68, 68, 68)"
spoofBlooks.style.borderStyle = 'none'
spoofBlooks.style.height = '30px'
spoofBlooks.style.width = '280px'
spoofBlooks.style.position = 'absolute'
spoofBlooks.style.top = '330px'
spoofBlooks.style.left = '60px'
spoofBlooks.onclick = () => {
    reactHandler().stateNode.setState({ lockedBlooks: [], takenBlooks: [] });
}
globalCheats.appendChild(spoofBlooks)



let btn6 = document.createElement('button');
btn6.innerHTML = 'In Game Hacks';
btn6.style.borderRadius = '0.5em';
btn6.style.fontFamily = 'Comfortaa';
btn6.style.color = 'white'
btn6.style.backgroundColor = "rgb(68, 68, 68)"
btn6.style.borderStyle = 'none'
btn6.style.height = '30px'
btn6.style.width = '280px'
btn6.style.position = 'absolute'
btn6.style.top = '370px'
btn6.style.left = '60px'
btn6.onclick = () => {
    globalCheats.hidden = !globalCheats.hidden
    //footer.hidden = !footer.hidden
    info.hidden = !info.hidden
    let Global = document.createElement('button')
    Global.innerHTML = 'Global Hacks';
    Global.style.borderRadius = '0.5em';
    Global.style.fontFamily = 'Comfortaa';
    Global.style.color = 'white'
    Global.style.backgroundColor = "rgb(68, 68, 68)"
    Global.style.borderStyle = 'none'
    Global.style.height = '30px'
    Global.style.width = '280px'
    Global.style.position = 'absolute'
    Global.style.top = '70px'
    Global.style.left = '60px'
    Global.onclick = () => {
        globalCheats.hidden = !globalCheats.hidden
        inGameCheatsMenu.hidden = !inGameCheatsMenu.hidden
        //footer.hidden = !footer.hidden
        info.hidden = !info.hidden
    }
    inGameCheatsMenu.hidden = false
    inGameCheatsMenu.appendChild(Global)

    
    
    let crypto = document.createElement('button')
    crypto.innerHTML = 'Crypto Hack';
    crypto.style.borderRadius = '0.5em';
    crypto.style.fontFamily = 'Comfortaa';
    crypto.style.color = 'white'
    crypto.style.backgroundColor = "rgb(68, 68, 68)"
    crypto.style.borderStyle = 'none'
    crypto.style.height = '30px'
    crypto.style.width = '280px'
    crypto.style.position = 'absolute'
    crypto.style.top = '110px'
    crypto.style.left = '60px'
    crypto.onclick = () => {
        inGameCheatsMenu.hidden = true
        globalCheats.hidden = false
        tokens.innerHTML = "Get Crypto"
        tokens.onclick = () => {
            alert("Getting Crypto")
        }
        spamBoxes.innerHTML = "Get Passwords"
        spamBoxes.onclick = () => {
            alert("Getting Passwords")
        }
        autoAnswerToggle.style.top = '170px'
        highlightAnswersToggle.style.top = '210'

        footer.hidden = false
        info.hidden = false
        autoSell.hidden = true
        spoofBlooks.hidden = true
        btn6.hidden = true
    }
    inGameCheatsMenu.appendChild(crypto)

    let TD = document.createElement('button')
    TD.innerHTML = 'Tower Defence';
    TD.style.borderRadius = '0.5em';
    TD.style.fontFamily = 'Comfortaa';
    TD.style.color = 'white'
    TD.style.backgroundColor = "rgb(68, 68, 68)"
    TD.style.borderStyle = 'none'
    TD.style.height = '30px'
    TD.style.width = '280px'
    TD.style.position = 'absolute'
    TD.style.top = '150px'
    TD.style.left = '60px'
    TD.onclick = () => {

    }
    inGameCheatsMenu.appendChild(TD)

    let GQ = document.createElement('button')
    GQ.innerHTML = 'Gold Quest';
    GQ.style.borderRadius = '0.5em';
    GQ.style.fontFamily = 'Comfortaa';
    GQ.style.fontFamily = 'Comfortaa';
    GQ.style.color = 'white'
    GQ.style.backgroundColor = "rgb(68, 68, 68)"
    GQ.style.borderStyle = 'none'
    GQ.style.height = '30px'
    GQ.style.width = '280px'
    GQ.style.position = 'absolute'
    GQ.style.top = '190px'
    GQ.style.left = '60px'
    GQ.onclick = () => {
        
    }
    inGameCheatsMenu.appendChild(GQ)
    
    let factory = document.createElement('button')
    factory.innerHTML = 'Factory';
    factory.style.borderRadius = '0.5em';
    factory.style.fontFamily = 'Comfortaa';
    factory.style.fontFamily = 'Comfortaa';
    factory.style.color = 'white'
    factory.style.backgroundColor = "rgb(68, 68, 68)"
    factory.style.borderStyle = 'none'
    factory.style.height = '30px'
    factory.style.width = '280px'
    factory.style.position = 'absolute'
    factory.style.top = '230px'
    factory.style.left = '60px'
    factory.onclick = () => {
        
    }
    inGameCheatsMenu.appendChild(factory)

    let fishing = document.createElement('button')
    fishing.innerHTML = 'Fishing';
    fishing.style.borderRadius = '0.5em';
    fishing.style.fontFamily = 'Comfortaa';
    fishing.style.fontFamily = 'Comfortaa';
    fishing.style.color = 'white'
    fishing.style.backgroundColor = "rgb(68, 68, 68)"
    fishing.style.borderStyle = 'none'
    fishing.style.height = '30px'
    fishing.style.width = '280px'
    fishing.style.position = 'absolute'
    fishing.style.top = '270px'
    fishing.style.left = '60px'
    fishing.onclick = () => {
        
    }
    inGameCheatsMenu.appendChild(fishing)

    let cafe = document.createElement('button')
    cafe.innerHTML = 'Café';
    cafe.style.borderRadius = '0.5em';
    cafe.style.fontFamily = 'Comfortaa';
    cafe.style.fontFamily = 'Comfortaa';
    cafe.style.color = 'white'
    cafe.style.backgroundColor = "rgb(68, 68, 68)"
    cafe.style.borderStyle = 'none'
    cafe.style.height = '30px'
    cafe.style.width = '280px'
    cafe.style.position = 'absolute'
    cafe.style.top = '310px'
    cafe.style.left = '60px'
    cafe.onclick = () => {
        
    }
    inGameCheatsMenu.appendChild(cafe)
    
    let crazyKingdom = document.createElement('button')
    crazyKingdom.innerHTML = 'Crazy Kingdom';
    crazyKingdom.style.borderRadius = '0.5em';
    crazyKingdom.style.fontFamily = 'Comfortaa';
    crazyKingdom.style.fontFamily = 'Comfortaa';
    crazyKingdom.style.color = 'white'
    crazyKingdom.style.backgroundColor = "rgb(68, 68, 68)"
    crazyKingdom.style.borderStyle = 'none'
    crazyKingdom.style.height = '30px'
    crazyKingdom.style.width = '280px'
    crazyKingdom.style.position = 'absolute'
    crazyKingdom.style.top = '350px'
    crazyKingdom.style.left = '60px'
    crazyKingdom.onclick = () => {
        
    }
    inGameCheatsMenu.appendChild(crazyKingdom)

    let TOD = document.createElement('button')
    TOD.innerHTML = 'Tower Of Doom';
    TOD.style.borderRadius = '0.5em';
    TOD.style.fontFamily = 'Comfortaa';
    TOD.style.fontFamily = 'Comfortaa';
    TOD.style.color = 'white'
    TOD.style.backgroundColor = "rgb(68, 68, 68)"
    TOD.style.borderStyle = 'none'
    TOD.style.height = '30px'
    TOD.style.width = '280px'
    TOD.style.position = 'absolute'
    TOD.style.top = '390px'
    TOD.style.left = '60px'
    TOD.onclick = () => {
        
    }
    inGameCheatsMenu.appendChild(TOD)

}
globalCheats.appendChild(btn6)

let footer = document.createElement('p');
footer.innerHTML = 'Made by MoldyxVoldy'
footer.style.fontFamily = 'Comfortaa';
footer.style.fontSize = '15px'
footer.style.textAlign = 'center'
footer.style.position = 'absolute'
footer.style.width= '100px'
footer.style.bottom = '10px'
footer.style.left = '150px'
element.appendChild(footer)

let x = document.createElement('button');
x.innerHTML = 'X'
x.style.fontSize = '35px'
x.style.fontFamily = 'Comfortaa';
x.style.textAlign = 'center'
x.style.position = 'absolute'
x.style.width = '50px'
x.style.height = '50px'
x.style.top = '0px'
x.style.right = '0px'
x.style.borderStyle = 'none'
x.style.backgroundColor = 'red'
x.style.borderRadius = '0px .32em'
x.onclick = () => {
    element.remove()
}
element.appendChild(x)

let minimize = document.createElement('button');
minimize.innerHTML = '-'
minimize.style.fontSize = '35px'
minimize.style.fontFamily = 'Comfortaa';
minimize.style.textAlign = 'center'
minimize.style.position = 'absolute'
minimize.style.width = '50px'
minimize.style.height = '50px'
minimize.style.top = '0px'
minimize.style.left = '0px'
minimize.style.borderStyle = 'none'
minimize.style.backgroundColor = 'rgb(68, 68, 68)'
minimize.style.borderRadius = '.32em 0px'
minimize.onclick = () => {
    
    minimized = !minimized
    if(minimized == true){
        globalCheats.hidden = true
        inGameCheatsMenu.hidden = true
        footer.hidden = true
        element.style.height = '65px'
    }else if(minimized == false){
        globalCheats.hidden = false
        footer.hidden = false
        element.style.height = '500px'
    }
}
element.appendChild(minimize)

let link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css?family=Comfortaa'
link.rel = 'stylesheet'
element.appendChild(link)

document.onkeydown = (e) => {
    switch (e.key) {
        case "Escape":
            element.hidden = !element.hidden
            info3.hidden = !info3.hidden
    }
}

let autoAnswer;
let highlightAnswers;

function newFunction(addTokens, coins1, coins2) {
    addTokens(coins1);
    setTimeout(() => {
        addTokens(coins2);
    }, 500);
}

function reactHandler() {

    return Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner;

}

loop = setInterval(() => {
    info.innerHTML = `Auto Answer: ${autoAnswer ? 'Enabled' : 'Disabled'}<br>Highlight Answers: ${highlightAnswers ? 'Enabled' : 'Disabled'}`
    if(autoAnswer){
    try {

                    Array.from(document.body.querySelectorAll('div[class*="answerText"]')).filter(t => t.firstChild.innerHTML == reactHandler().memoizedState.question.correctAnswers[0])[0].click();

                } catch {

                    try {

                        Array.from(document.body.querySelectorAll('div[class*="answerText"]')).filter(t => t.firstChild.innerHTML == reactHandler().memoizedProps.client.question.correctAnswers[0])[0].click();

                    } catch { };

                };
            }

    if (highlightAnswers) {

        try {

            Array.from(document.querySelector('div[class*="answersHolder"').children).forEach(x => {

                if (reactHandler().memoizedState.question.correctAnswers.includes(x.innerText) || reactHandler().memoizedProps.client.question.correctAnswers.includes(x.innerText)) x.firstChild.style = 'background-color: rgb(0, 207, 119);';

                else x.firstChild.style = 'background-color: rgb(225, 40, 33);';

            });

        } catch { }

    };
})

    

var getValues = () => new Promise((e, t) => {
        

    try {

        let n = window.webpackJsonp.map(e => Object.keys(e[1]).map(t => e[1][t])).reduce((e, t) => [...e, ...t], []).find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())).toString();

        e({

            blooketBuild: n.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0],

            secret: n.match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]

        })

    } catch {

        t("Could not fetch auth details")

    }

})

var encodeValues = async (e, t) => {

    let d = window.crypto.getRandomValues(new Uint8Array(12));

    return window.btoa(Array.from(d).map(e => String.fromCharCode(e)).join("") + Array.from(new Uint8Array(await window.crypto.subtle.encrypt({

        name: "AES-GCM",

        iv: d

    }, await window.crypto.subtle.importKey("raw", await window.crypto.subtle.digest("SHA-256", (new TextEncoder).encode(t)), {

        name: "AES-GCM"

    }, !1, ["encrypt"]), (new TextEncoder).encode(JSON.stringify(e))))).map(e => String.fromCharCode(e)).join(""))

};

function buyAll(rightBox){
    let boxes = {

        safari: 25,

        aquatic: 20,

        bot: 20,

        space: 20,

        breakfast: 15,

        medieval: 15,

        wonderland: 15

    }

    if (!Object.keys(boxes).includes(rightBox.toLowerCase())) {input.hidden = true; info2.hidden = false; info2.style.color = 'red'; info2.innerHTML = 'I could not find that box!'}

    let amount = (x.tokens / boxes[rightBox.toLowerCase()])
    amount = Math.floor(amount)

    fetch("https://api.blooket.com/api/users", { credentials: "include" }).then(x => x.json()).then(x => {

        if (x.tokens < boxes[rightBox.toLowerCase()] * amount) amount = Math.floor(x.tokens / boxes[rightBox.toLowerCase()]);

        amount = x.tokens / boxes[rightBox.toLowerCase()]
        amount = Math.floor(amount)

        let wait = ms => new Promise(r => setTimeout(r, ms));

        getValues().then(async e => {

            let error = false,

                blooks = [];

            for (let i = 0; i < amount; i++) {

                fetch("https://api.blooket.com/api/users/unlockblook", {

                    method: "put",

                    credentials: "include",

                    headers: {

                        "content-type": "application/json",

                        "X-Blooket-Build": e.blooketBuild

                    },

                    body: await encodeValues({

                        name: x.name,

                        box: rightBox.charAt(0).toUpperCase() + rightBox.slice(1).toLowerCase()

                    }, e.secret)

                }).then(async x => {

                    let blook = await x.json();

                    blooks.push(blook.unlockedBlook);

                    info2.style.color = 'white'

                    info2.innerHTML = `${blook.unlockedBlook} (${i + 1}/${amount})`;

                }).catch(() => { error = true });

                await wait(750);

                if (error) break;

            }

            let count = {};

            blooks.forEach(blook => { count[blook] = (count[blook] || 0) + 1 });

            info3.hidden = false; info3.innerHTML = `Results:\n` + Object.entries(count).map((x) => `    ${x[1]} ${x[0]}`).join(`\n`); info2.style.color = 'green';info2.innerHTML = 'Succsefully bought all boxes'

        }).catch(() => {info2.style.color = 'red'; info2.innerHTML = 'There was an error encoding requests!'});

    }).catch(() => {info2.style.color = 'red'; info2.innerHTML = 'There was an error getting username!'});
}