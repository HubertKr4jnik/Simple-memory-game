//Pytania:
let pytania = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//Odpowiedzi:
let odpowiedzi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//indexy pytań
let pytania_i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//indexy odpowiedzi
let odpowiedzi_i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let gora =  document.querySelectorAll(".cardTop");
let dol = document.querySelectorAll(".cardBottom");

let selected;

let wybor = '';
let spr = '';

let right = 0;
let wrong = 0;

let animating = false;
//odwracanie i animowanie kart
document.querySelectorAll(".card").forEach((card) => 
{
    card.addEventListener('click',() => 
    {
        if(animating == false)
        {
            card.style.transform = "rotateY(0deg)";
            card.style.color = "black";
            if(wybor == '')
            {
                wybor = card.children[2].innerText;
                selected = card;
            }
            else
            {
                spr = wybor
                wybor = card.children[2].innerText;
                if(spr == wybor)
                {
                    animating = true;
                    right++;
                    document.getElementById("right").innerText = right;
                    wybor = '';
                    spr = '';
                    setTimeout(()=>
                    {
                        card.style.opacity = .5;
                        card.style.cursor = "initial";
    
                        selected.style.opacity = .5;
                        selected.style.cursor = "initial";
                        //remove event listener
                        setTimeout(()=>{
                            card.replaceWith(card.cloneNode(true));
                            selected.replaceWith(selected.cloneNode(true));
                            animating = false;
                        }, 2000)
                    }, 5000);
                }
                else
                {
                    animating = true;
                    wrong++;
                    document.getElementById("wrong").innerText = wrong;
                    wybor = '';
                    spr = '';
                    setTimeout(()=>
                    {
                        card.style.transform = "rotateY(-180deg)";
                        card.style.color = "transparent";
                        card.style.transition = "transform 2s, opacity 2s, color 1s"
                        card.children[0].style.transition = "all 1s";
                        card.children[0].style.color = "initial";
    
                        selected.style.transform = "rotateY(-180deg)";
                        selected.style.color = "transparent";
                        selected.style.transition = "transform 2s, opacity 2s, color 1s"
                        selected.children[0].style.transition = "all 1s";
                        selected.children[0].style.color = "initial";
    
                        setTimeout(()=>
                        {
                            card.style.transition = "transform 2s, opacity 2s, color 5s";
                            card.children[0].style.transition = "all .5s";
    
                            selected.style.transition = "transform 2s, opacity 2s, color 5s";
                            selected.children[0].style.transition = "all .5s";
                            animating = false;
                        }, 2000);
                    }, 5000);
                }
            }
        }
    })
})
//znikanie znaków zapytania na karcie po kliknięciu
document.querySelectorAll(".cardLogo").forEach((el) =>
{
    el.addEventListener('click',() => 
    {
        if(animating == false)
        {
            el.style.color = "transparent";
        }
    })
})
//znikanie początkowej informacji po naciśnięciu przycisku
document.getElementById("infoButton").addEventListener('click',()=>
{
    document.getElementById("overley").style.opacity = 0;
    document.getElementById("info").style.opacity = 0;
    setTimeout(()=>
    {
        document.getElementById("overley").style.zIndex = 0;
        document.getElementById("info").style.zIndex = 0;
        //remove event listener
        document.getElementById("overley").replaceWith(document.getElementById("overley").cloneNode(true));
        document.getElementById("info").replaceWith(document.getElementById("info").cloneNode(true));
    }, 1000)
})
//sprawdzanie końca gry
const checkEnd = setInterval(()=>
{
    if(right == 10)
    {
        document.getElementById("infoTitle").innerText = "Koniec gry";
        document.getElementById("infoText").remove();
        document.getElementById("infoButton").value = "Zagraj jeszcze raz";
        document.getElementById("infoButton").style.width = "115%";
        document.getElementById("infoButton").style.height = "45%";

        document.getElementById("overley").style.zIndex = 1;
        document.getElementById("info").style.zIndex = 2;
        setTimeout(()=>
        {
            document.getElementById("overley").style.opacity = 1;
            document.getElementById("info").style.opacity = 1;
        }, 1000)
        clearInterval(checkEnd);
        document.getElementById("infoButton").addEventListener('click', ()=>
        {
            window.location.reload()
        });
    }
}, 1000)

let text = pytania.concat(odpowiedzi);
let num = pytania_i.concat(odpowiedzi_i);
//mieszanie odpowiadajaco pytan i odpowiedzi
for (let i= 0; i < text.length; i++)
{
    random1 = Math.floor(Math.random()*text.length);
    random2 = Math.floor(Math.random()*text.length);
    //mieszanie pytan
    temp1 = text[random1]
    text[random1] = text[random2]
    text[random2] = temp1

    //mieszanie odpowiedzi
    temp2 = num[random1]
    num[random1] = num[random2]
    num[random2] = temp2
}
//Wprowadzanie danych do kart
for (let i = 0; i < text.length; i++) {
    gora[i].innerText = text[i];
    dol[i].innerText = num[i];
}