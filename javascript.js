var action;
var timeremaining;
var score;
var correctAnswer;
var playing = false;
//if we click on start/reset
document.getElementById("startreset").onclick = function()
    {
    //if we are playing
    if(playing == true){
        location.reload(); //reload page

    }
    else{
        //if we are not playing
        //change mode to playing
        playing=true;
        
        //set score to 0
        score=0;
        document.getElementById("scorevalue").innerHTML=score;
        
        //show countdown box
        
        
       show("timeremaining");
        timeremaining=60;
        
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        
        //hide gameOver
        
        hide("gameOver");
        
        //change button to reset
        document.getElementById("startreset").innerHTML="Reset Game";
        
        //stat countdown
        
        startCountdown();
        
        // generate Q & A
        generateQA();
        
        // click on answer
        
        for( i=1; i<5 ;i++)
            {
                document.getElementById("box"+i).onclick=function(){
                    // if we are playing
                    if(playing==true)
                        {
                            if(this.innerHTML==correctAnswer)
                                {
                                    //correct Answer
                                    score++;  //increase score by one
                                    
                                    document.getElementById("scorevalue").innerHTML=score;
                                    
                                    // hide wrong and show correct
                                    
                                    hide("wrong");
                                    show("correct");
                                    setTimeout(function(){
                                        hide("correct");
                                    },1000);
                                    
                                    generateQA();
                                }
                            else
                                {
                                    hide("correct");
                                    show("wrong");
                                    setTimeout(function(){
                                        hide("wrong");
                                    },1000)
                                }
                        }
                }
            }
        
    }
}

  function startCountdown()
        {
            action=setInterval(function(){
                timeremaining-=1;
                
               document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        
                if(timeremaining==0)
                    {
                         stopCountdown();
                       show("gameOver");
                        document.getElementById("gameOver").innerHTML="<p>Game Over</p><p> Your Score is " + score + "</p>";
                        hide("timeremaining");
                        hide("correct");
                        hide("wrong");
                        playing=false;
                        
                        document.getElementById("startreset").innerHTML="Start Game";
                        
                    }
            },1000);
        }
        function stopCountdown()
        {
            clearInterval(action);
        }
      

function show(Id){
     document.getElementById(Id).style.display="block";
}


function hide(Id){
     document.getElementById(Id).style.display="none";
}


// generate Q & A

function generateQA()
{
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML= x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer;  // fill  one box with correct answer
    
    
    //fill other boxes with wrong answers
    var answers= [correctAnswer]
    for(i= 1; i<5 ; i++)
        {
            if(i!= correctPosition)
                {
                    var wrongAnswer;
                    do
                        {
                            wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
                            // wrong aswer
                        } while(answers.indexOf(wrongAnswer)>-1)
                            
                            document.getElementById("box"+i).innerHTML=wrongAnswer;
                    answers.push(wrongAnswer);
                }
        }
}