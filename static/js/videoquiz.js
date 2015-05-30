
function coucou(runtime, element) {

video = element.querySelector('video');

var exercices = [
    {
        "TimeStop": "3",
        "Title": "Introduction",
        "Question":"Are you ready to begin , for real?",
        "Answers":["yes","no"],
        "Right_answers":[0],
        "Help":"You should have a look at this previous lesson : arithmetic",
    },
    {
        "TimeStop": "5",
        "Title": "UI relationship",
        "Question":"For the u-i relationship of resistor in previous slide, what is the resistance for α=90º?",
        "Answers":["0Ω","90Ω", "180Ω", "∞Ω"],
        "Right_answers":[3],
        "Help":"You should have a look at this previous lesson : arithmetic",
    },
    {
        "TimeStop": "10",
        "Title": "Current",
        "Question":"For a short circuit, which factor determines the current through it?",
        "Answers":["resistance", "voltage", "outer circuit", "answer 1 and 3"],
        "Right_answers":[0, 3, 4],
        "Help":"You should have a look at this previous lesson : arithmetic",
    },
    {
        "TimeStop": "15",
        "Title": "Yolo",
        "Question":"Gné?",
        "Answers":["ubdkefgiurbf", "the previous answer", "the next answer", "the second answer", "the third answer"],
        "Right_answers":[0, 1, 4],
        "Help":"You should have a look at this previous lesson : arithmetic",
    },
]

var exercice = 0;
var score_exercice = 0;
var paused, video = 0;
video = element.querySelector('video');

        //gere les temps d'arret
        video.addEventListener('timeupdate', function(e) {
            if (!exercices[exercice]) {
                return;
            }
            if (video.currentTime > exercices[exercice]["TimeStop"]) {
                console.log("stop! " +video.currentTime);
                document.getElementById("exercice").className="exercice_active";
                video.pause();
                prepare();
                video.currentTime = exercices[exercice]["TimeStop"];
            }
        });


        //prepare next exercice
        function prepare(){
            score_exercice = 0;
            document.getElementById("help").style.display="none";
            document.getElementById("score").innerHTML = "";
            /*document.getElementById("check_exercice").style.display = "block";
            document.getElementById("continue_video").style.display = "none";*/
            document.getElementById("check_exercice").className = "button_active";
            document.getElementById("continue_video").className = "button_inactive";
            /*for(var i=0; i<document.getElementsByClasssName("answer_label").length; i++){
                document.getElementsById("answer_label").className="neutral_answer";
            }*/
            document.getElementById("answers").innerHTML="";
            document.getElementById("question").innerHTML=exercices[exercice]["Question"];
            document.getElementById("help").innerHTML=exercices[exercice]["Help"];
            console.log("oh"+exercices[0]);
            for(var i=0; i<exercices[exercice]["Answers"].length; i++){
                console.log(exercices[exercice]["Answers"][i]);
                document.getElementById("answers").innerHTML+="<input id ='answer"+i+"' type='checkbox'><label id='answer_label"+i+"' for='answer"+i+"'>"+exercices[exercice]["Answers"][i]+"</label>";
            }
        }

        //start video
        document.getElementById("start_video").addEventListener("click", start_video);
        function start_video(){
            console.log("start video !");
            video.play();
            document.getElementById("start_video").className="start_inactive";
            /*document.getElementById("check_exercice").style.display = "block";
            document.getElementById("continue_video").style.display = "none";*/
            document.getElementById("check_exercice").className = "button_active";
            document.getElementById("continue_video").className = "button_inactive";
        }



        //check question :
        document.getElementById("check_exercice").addEventListener("click", check);
        function check(){
            console.log("check");
            score_exercice = 100;
            var nb_answers = exercices[exercice]["Answers"].length;
            var nb_right_answers = exercices[exercice]["Right_answers"].length;
            var nb_answered_answers = 0;
            for(var i=0; i<nb_answers; i++){
                if(document.getElementById("answer"+i).checked == true){
                    document.getElementById("answer_label"+i).className="bad_answer";
                    score_exercice = score_exercice - Math.round(100 / nb_answers);
                    nb_answered_answers++;
                }
                if(nb_answered_answers<1){
                    score_exercice=0;
                }
            }
            for(var i=0; i<exercices[exercice]["Right_answers"].length; i++){
                console.log(exercices[exercice]["Right_answers"]);
                if(document.getElementById("answer"+exercices[exercice]["Right_answers"][i]).checked == true){
                    console.log("et oui!")
                    document.getElementById("answer_label"+i).className="good_answer";
                    score_exercice = score_exercice + Math.round(100 / nb_answers);
                }else{
                    document.getElementById("answer_label"+i).className="forgeted_answer";
                    //score_exercice = score_exercice - Math.round(100 / nb_answers);
                    score_exercice = score_exercice - Math.round(200 / nb_answers);
                }
            if(score_exercice<0){
                score_exercice=0;
            }
            if(score_exercice<75){
                document.getElementById("help").style.display="block";
            }
            }
            /*document.getElementById("check_exercice").style.display = "none";
            document.getElementById("continue_video").style.display = "block";*/
            document.getElementById("check_exercice").className = "button_inactive";
            document.getElementById("score").innerHTML = score_exercice+"% of right answers";
            document.getElementById("continue_video").className = "button_active";
        }

        //continue video :
        document.getElementById("continue_video").addEventListener("click", continue_video);
        function continue_video(){
            console.log("continuing video");
            video.play();
            exercice++;
            document.getElementById("exercice").className="exercice_inactive";
        }
}
