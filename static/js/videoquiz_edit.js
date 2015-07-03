function VideoQuizEditBlock(runtime, element) {
    var breakpoints = [];
    console.log("Hello !");
    var video = element.querySelector('video');
    var breakpointsElt = element.querySelector('ul.breakpoints-list');
    var breakpointAnswersListElt = element.querySelector('ul.breakpoint-answers-list');

    breakpointsElt.addEventListener('click', BreakpointsListClick);
    breakpointAnswersListElt.addEventListener('click', BreakpointAnswersListClick);
    element.querySelector('button.breakpoint-answer-add').addEventListener("click", BreakpointAnswerAdd);
    element.querySelector('button.breakpoint-creation-button').addEventListener("click", BreakpointCreate);
    element.querySelector('button.breakpoint-button').addEventListener("click", BreakpointFormDisplay);
    element.querySelector('#video-src').addEventListener("change", VideoSourceSet);
    video.addEventListener("seeking", BreakpointTimeUpdate);

    function BreakpointsListClick(e) {
        var elt = e.target;
        var index = +(elt.dataset.index);

        if (elt.classList.contains('breakpoint-remove')) {
            breakpoints.splice(index, 1);
            BreakpointsRender();
        } else if (elt.classList.contains('breakpoint-toggle')){
            var breakpointDetails = elt.parentElement.querySelector('div.breakpoint-details');
            breakpointDetails.style.display = (breakpointDetails.style.display === "block") ? "none" : "block";

        }
    }

    function BreakpointAnswersListClick(e) {
        var elt = e.target;
        if (elt.classList.contains('breakpoint-answer-remove')) {
            elt.parentElement.remove();
        }
    }

    function BreakpointTimeUpdate(){
        time = video.currentTime;
        element.querySelector('#breakpoint-time').value=time;
    }

    function BreakpointFormDisplay(){
        video.pause();
        BreakpointTimeUpdate();
        breakpointCreationForm = element.querySelector('div.breakpoint-creation-form');
        breakpointCreationForm.style.display=(breakpointCreationForm.style.display === "block") ? "none" : "block";


    }

    function BreakpointAnswerAdd(){
        var li = document.createElement('li');
        li.classList.add('breakpoint-answer');
        li.innerHTML=[
            '<input type="checkbox">',
            '<input class="input setting-input" type="text"/>',
            '<button type="button" class="breakpoint-answer-remove">-</button>'
        ].join("");
        breakpointAnswersListElt.appendChild(li);
    }

    function BreakpointAnswerRemove(){

    }

    function BreakpointCreate(){
        time = element.querySelector('#breakpoint-time').value;

        var exists = breakpoints.some(function(b) { return b.TimeStop === time });
        if (exists) return;

        title = element.querySelector('#breakpoint-title').value;
        question = element.querySelector('#breakpoint-question').value;
        hint = element.querySelector('#breakpoint-hint').value;
        answers = element.querySelectorAll('ul.breakpoint-answers-list > li');


        var i = 0, len = answers.length;
        var answers_array = [];
        var right_answers_array = [];
        for(;i < len; i++){
            answers_array.push(answers[i].querySelector('input[type="text"]').value);
            if (answers[i].querySelector('input[type="checkbox"]').checked){
                right_answers_array.push(i);
            }
        }

        breakpoints.push({
            'TimeStop' : time,
            'Title' : title,
            'Question' : question,
            'Answers' : answers_array,
            'Right_answers' : right_answers_array,
            'Help' : hint
        });
        breakpoints = breakpoints.sort(BreakpointsSort);
        BreakpointsRender();
        console.log(breakpoints);
        console.log("Breakpoint created");
    }

    function BreakpointsRender(){
        breakpointsElt.innerHTML = '';
        var html = [];
        var i = 0, len = breakpoints.length;
        console.log(len);
        for(; i<len;i++) {
            console.log(i);
            console.log(breakpoints[i]);
            html += '<li>';
            html += '<button data-index="' + i + '" type="button" class="breakpoint-remove">x</button>';
            html += '<button data-index="' + i + '" type="button" class="breakpoint-toggle">v</button>';
            html += '<span class="breakpoint-title">' + breakpoints[i].Title + '</span>';
            html += '<div class="breakpoint-details" style="display:none">';
            html += '<span class="breakpoint-detail"> Timecode : </span>' +  breakpoints[i].TimeStop + '<br/>';
            html += '<span class="breakpoint-detail"> Question : </span>' +  breakpoints[i].Question + '<br/>';
            html += '<span class="breakpoint-detail"> Answers : </span>';
            var j = 0;
            var len_2 = breakpoints[i].Answers.length;
            for (; j < len_2; j++){
               var checked = breakpoints[i].Right_answers.indexOf(j) !== -1;
                var answerHtml = [
                    '<div>',
                    '<input type="checkbox" disabled="disabled" '
                ];
                if (checked) {
                    answerHtml.push('checked="checked"');
                }
                answerHtml.push(' />');
                answerHtml.push(breakpoints[i].Answers[j]);
                answerHtml.push('</div>');
                html += answerHtml.join('');
            }
             html += '<span class="breakpoint-detail"> Hint : </span>' +  breakpoints[i].Help + '<br/>';
            html += '<div>';
            html += JSON.stringify(breakpoints[i]);
           html += '</div>';
          html += '</div>';
            html += '</li>';
        }
        console.log(breakpoints);
        breakpointsElt.innerHTML = html;
    }

    function BreakpointsSort(a, b){
        return a.TimeStop - b.TimeStop;
    }

    function VideoSourceSet(e){
        //console.log("set video source: " + new_src);
        console.log(e.target.value);
        video.src = e.target.value;
        video.load;
        VideoEnabled();
    }
}


function VideoEnabled(){
    if (document.getElementsByTagName('video')[0].src != ''){
        console.log("video active");
    }
}
