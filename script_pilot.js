//pilot study script


//condition variable

// generate a random subject ID
var subject_id = jsPsych.randomization.randomID(10);

// pick a random condition for the subject at the start of the experiment
// 1 = 85% reliability; 2 = 65% reliability
var conditionsArray = [1, 2];
var cond = jsPsych.randomization.sampleWithoutReplacement(conditionsArray, 1);

//global variables necessary for showing participants' score and elapsed time
var score = 0;
var AddToScore = 0;
var DisplayTimer;
var elapsedTime = 0;
var timeHtml = 0;
var scoreMinusTime = 0;

var timeline = [];

jsPsych.data.addProperties({
    subject: subject_id,
    condition: cond
});

// push questions to timeline

//Introduction

var intro = {
    type: 'instructions',
    pages: [
        '<div class="instruction"><p>Liebe/r Teilnehmer/in,</p><p>vielen Dank f&uuml;r Ihr Interesse an dieser <strong>Studie zur Bewertung von automatisierten Systemen</strong>.</p><p>Im Folgenden werden Sie zun&auml;chst ein paar demographische Angaben zu Ihrer Person machen. Darauf folgt ein Abschnitt mit Suchaufgaben. Anschlie&szlig;end bearbeiten Sie, unterst&uuml;tzt durch ein automatisiertes System, eine weitere Reihe von Aufgaben. Die Studie endet mit einigen kurzen Abschlussfragen. Insgesamt dauert die Studie ca. 1 Stunde.</p><p>Bitte bearbeiten Sie den Versuch <strong>an einem St&uuml;ck </strong> ohne selbstst&auml;ndig Pausen einzulegen. Die Durchf&uuml;hrung sollte an einem <strong>Laptop oder Desktop-PC</strong> erfolgen. Die Verwendung eines Smartphones ist nicht m&ouml;glich. </p><p>Alle im Laufe des Versuchs erhobenen Daten werden anonym ausgewertet und ausschlie&szlig;lich zum Zwecke wissenschaftlicher Forschung verwendet. </p><p>Zum Dank f&uuml;r Ihre Teilnahme haben Sie die M&ouml;glichkeit an der <strong>Verlosung </strong>von drei 25&euro;-Amazon-Gutscheinen teilzunehmen. Ein weiterer Amazon-Gutschein &uuml;ber 50&euro; wird an den/die Teilnehmer/in mit der <strong>h&ouml;chsten Punktzahl </strong> bei der Bearbeitung der Aufgabe mit dem automatisierten System vergeben. </p><p>Mit Dr&uuml;cken des Weiter-Knopfes erkl&auml;ren Sie sich zur Teilnahme am beschriebenen Versuch und der Aufzeichnung Ihrer Daten bereit. </p><p><strong>Vielen Dank und viel Spa&szlig; bei der Studie! </strong></p></div>'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter'
};
timeline.push(intro);


//Demographic questions

var age = {
    type: 'survey-text',
    button_label: 'Weiter',
    questions: [
        {
            prompt: "Wie alt sind Sie?",
            rows: 1,
            columns: 2
            }
            ]
};
timeline.push(age);

var gender = {
    type: 'survey-multi-choice',
    questions: [{
        prompt: "Welches Geschlecht haben Sie?",
        options: ["weiblich", "m&auml;nnlich", "anderes"],
        required: true
    }]
};

timeline.push(gender);

var country = {
    type: 'survey-multi-choice',
    questions: [{
        prompt: "In welchem Land sind Sie aufgewachsen?",
        options: ["Deutschland", "&Ouml;sterreich", "Schweiz", "anderes"],
        required: true
    }]
};

timeline.push(country);

var otherCountry = {
    type: 'survey-text',
    button_label: 'Weiter',
    questions: [
        {
            prompt: "In welchem anderen Land Sind Sie aufgewachsen?",
            rows: 1,
            columns: 60
            }
            ]
};

var if_node1 = {
    timeline: [otherCountry],
    conditional_function: function () {
        // get the data from the previous trial,
        // and check which answer was given
        var data = jsPsych.data.get().last(1).values()[0];
        if (data.responses == '{"Q0":"anderes"}') {
            return true;
        } else {
            return false;
        }
    }
};

timeline.push(if_node1);

var language = {
    type: 'survey-multi-choice',
    questions: [{
        prompt: "Ist Deutsch Ihre Muttersprache?",
        options: ["ja", "nein"],
        required: true
    }],
    on_finish: function (data) {
        console.log(data.responses);
    }
};

timeline.push(language);

var yearsGerman = {
    type: 'survey-text',
    button_label: 'Weiter',
    questions: [
        {
            prompt: "Seit wieviel Jahren lernen Sie Deutsch?",
            rows: 1,
            columns: 2
            }
            ]
};

var if_node2 = {
    timeline: [yearsGerman],
    conditional_function: function () {
        // get the data from the previous trial,
        // and check which answer was given
        var data = jsPsych.data.get().last(1).values()[0];
        if (data.responses == '{"Q0":"ja"}') {
            return false;
        } else {
            return true;
        }
    }
};

timeline.push(if_node2);

var education = {
    type: 'survey-multi-choice',
    questions: [{
        prompt: "Was ist Ihr h&ouml;chster Bildungsabschluss?",
        options: ["Kein Schulabschluss", "Grund-/Hauptschulabschluss", "Realschule (Mittlere Reife)", "Gymnasium (Abitur)", "Abgeschlossene Ausbildung", "(Fach-)Hochschule: Bachelor", "(Fach-)Hochschule: Master", "Diplom", "Magister", "Promotion"]
    }]
};

timeline.push(education);

var job = {
    type: 'survey-multi-choice',
    questions: [{
        prompt: "Was ist Ihr höchster Bildungsabschluss?",
        options: ["Kein Schulabschluss", "Grund-/Hauptschulabschluss", "Realschule (Mittlere Reife)", "Gymnasium (Abitur)", "Abgeschlossene Ausbildung", "(Fach-)Hochschule: Bachelor", "(Fach-)Hochschule: Master", "Diplom", "Magister", "Promotion"]
    }]
};

timeline.push(job);

// Instruction for matrix only trials in pilot

var instructionMatrixOnly = {
    type: 'instructions',
    pages: [
        '<div class="instructions"><p> In einer Spielzeugfabrik werden Bauklotzsets produziert. Die einzelnen Baukl&ouml;tze werden mit Buchstaben bedruckt. Es gibt drei Gr&ouml;&szlig;en von Bauklotzsets: 16, 20 und 25 St&uuml;ck. <strong>In einem Set darf jeder Buchstabe nur maximal einmal vorkommen.</strong></p><p>Im Folgenden werden Ihnen solche Sets angezeigt, Ihre Aufgabe ist es, festzustellen, ob eine Dopplung eines Buchstaben vorliegt oder nicht. Arbeiten Sie dabei bitte so genau und schnell wie m&ouml;glich.</p></div>',
        'Zun&auml;chst folgen zwei Beispieldurchl&auml;ufe.'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter'
};
timeline.push(instructionMatrixOnly);

//Example trials for matrix only in pilot

var exampleMatrixOnlyND = {
    //first example: no double
    type: 'html-button-response',
    stimulus: '<div class="matrix"><table class="table"><tr><td> C </td><td> Q </td><td> Z </td><td> G </td></tr><tr><td> M </td><td> A </td><td> K </td><td> L </td></tr><tr><td> V </td><td> X</td><td> S </td><td> J </td></tr><tr><td> T </td><td> P </td><td> I </td><td> B </td></tr></table></div>',
    //display matrix and automation answer
    choices: ['Set enth&auml;lt Dopplung', 'Set enth&auml;lt keine Dopplung'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>'
};
timeline.push(exampleMatrixOnlyND);

var resultExampleNDPilot = {
    type: 'instructions',
    pages: [
        '<div class="instructions"><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Die Antwort "Set enth&auml;lt keine Dopplung" war somit richtig.</p><p>Es folgt ein weiterer Beispieldurchgang.</p></div>'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter'
};
timeline.push(resultExampleNDPilot);

var exampleMatrixOnlyD = {
    //second example: double
    type: 'html-button-response',
    stimulus: '<div class="matrix"><table class="table"><tr><td> G </td><td> K </td><td> J </td><td> X </td><td> N </td></tr><tr><td> S </td><td> Q </td><td> E </td><td> F </td><td> H </td></tr><tr><td> C </td><td> V </td><td> U </td><td> Z </td><td> Y </td></tr><tr><td> B </td><td> O </td><td> W </td><td> A </td><td> J </td></tr><tr><td> R </td><td> D </td><td> T </td><td> M </td><td> P </td></tr></table></div>',
    //display matrix and automation answer
    choices: ['Set enth&auml;lt Dopplung', 'Set enth&auml;lt keine Dopplung'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>'
};
timeline.push(exampleMatrixOnlyD);

var resultExampleDPilot = {
    type: 'instructions',
    pages: [
        '<div class="instructions"><p> In dem Bauklotzset lag der Buchstabe "J" doppelt vor. Die Antwort "Set enth&auml;lt Dopplung" war somit richtig.</p><p> Sie untersuchen nun 30 weitere Sets auf Dopplungen. Arbeiten Sie dabei bitte so genau und schnell wie m&ouml;glich. </p></div>'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter'
};
timeline.push(resultExampleDPilot);

//Matrix trials for pilot only

function selectMatrices() {

    var trials;

    trials = matrices[Math.floor(Math.random() * matrices.length)]

    for (j = 0; j < trials.length; j++) {

        if (trials[j].length == 16) {
            trials[j].dispmessage = '<div class="matrix"><table class="table"><tr><td>' + trials[j].str[0] + '</td><td>' + trials[j].str[1] + '</td><td>' + trials[j].str[2] + '</td><td>' + trials[j].str[3] + '</td></tr>' + '<tr><td>' + trials[j].str[4] + '</td><td>' + trials[j].str[5] + '</td><td>' + trials[j].str[6] + '</td><td>' + trials[j].str[7] + '</td></tr>' + '<tr><td>' + trials[j].str[8] + '</td><td>' + trials[j].str[9] + '</td><td>' + trials[j].str[10] + '</td><td>' + trials[j].str[11] + '</td></tr>' + '<tr><td>' + trials[j].str[12] + '</td><td>' + trials[j].str[13] + '</td><td>' + trials[j].str[14] + '</td><td>' + trials[j].str[15] + '</td></tr></table></div>';

        } else if (trials[j].length == 20) {
            trials[j].dispmessage = '<div class="matrix"><table class="table"><tr><td>' + trials[j].str[0] + '</td><td>' + trials[j].str[1] + '</td><td>' + trials[j].str[2] + '</td><td>' + trials[j].str[3] + '</td></tr>' + '<tr><td>' + trials[j].str[4] + '</td><td>' + trials[j].str[5] + '</td><td>' + trials[j].str[6] + '</td><td>' + trials[j].str[7] + '</td></tr>' + '<tr><td>' + trials[j].str[8] + '</td><td>' + trials[j].str[9] + '</td><td>' + trials[j].str[10] + '</td><td>' + trials[j].str[11] + '</td></tr>' + '<tr><td>' + trials[j].str[12] + '</td><td>' + trials[j].str[13] + '</td><td>' + trials[j].str[14] + '</td><td>' + trials[j].str[15] + '</td></tr>' + '<tr><td>' + trials[j].str[16] + '</td><td>' + trials[j].str[17] + '</td><td>' + trials[j].str[18] + '</td><td>' + trials[j].str[19] + '</td></tr></table></div>';

        } else if (trials[j].length == 25) {
            trials[j].dispmessage = '<div class="matrix"><table class="table"><tr><td>' + trials[j].str[0] + '</td><td>' + trials[j].str[1] + '</td><td>' + trials[j].str[2] + '</td><td>' + trials[j].str[3] + '</td><td>' + trials[j].str[4] + '</td></tr>' + '<tr><td>' + trials[j].str[5] + '</td><td>' + trials[j].str[6] + '</td><td>' + trials[j].str[7] + '</td><td>' + trials[j].str[8] + '</td><td>' + trials[j].str[9] + '</td></tr>' + '<tr><td>' + trials[j].str[10] + '</td><td>' + trials[j].str[11] + '</td><td>' + trials[j].str[12] + '</td><td>' + trials[j].str[13] + '</td><td>' + trials[j].str[14] + '</td></tr>' + '<tr><td>' + trials[j].str[15] + '</td><td>' + trials[j].str[16] + '</td><td>' + trials[j].str[17] + '</td><td>' + trials[j].str[18] + '</td><td>' + trials[j].str[19] + '</td></tr>' + '<tr><td>' + trials[j].str[20] + '</td><td>' + trials[j].str[21] + '</td><td>' + trials[j].str[22] + '</td><td>' + trials[j].str[23] + '</td><td>' + trials[j].str[24] + '</td></tr></table></div>';
        }

        /*trials[j].data = {
            category: 'test'
        };*/
        //trials[j].data.category = 'test';
        //trials[j].data.category = 'test';

    }

    // Cut off trials for test purposes
    trials.splice(0, 25);

    return trials;
}


var matrixcheck = {
    timeline: [
        {
            type: 'html-keyboard-response',
            stimulus: 'N&auml;chster Durchgang',
            choices: jsPsych.NO_KEYS,
            trial_duration: 1000
        },
        {
            type: 'html-button-response',
            stimulus: jsPsych.timelineVariable('dispmessage'),
            data: {
                category: jsPsych.timelineVariable('doublechar'),
                strlength: jsPsych.timelineVariable('length')
            },
            //display matrix and automation answer
            choices: ['Set enth&auml;lt Dopplung', 'Set enth&auml;lt keine Dopplung'],
            //data: saved to result
            //on_finish: update score
            button_html: '<button class="jspsych-btn">%choice%</button>'
        }
        ],
    timeline_variables: selectMatrices()
};

timeline.push(matrixcheck);

//function to select instruction depending on condition

function selectInstruction() {

    var instruction;

    if (cond == 1) {
        instruction = '<div class="instruction"><p> Zur automatischen &Uuml;berpr&uuml;fung der Bauklotzsets setzt die Spielzeugfabrik einen automatischen Scanner der Firma BrickScan ein, der die Sets auf m&ouml;gliche Dopplungen &uuml;berpr&uuml;ft. Der Scanner gibt Feedback dar&uuml;ber, ob eine Dopplung vorliegt oder nicht.</p> <p>Um die korrekte Funktionsweise des Systems zu gew&auml;hrleisten, werden Sie zus&auml;tzlich als Pr&uuml;fer eingesetzt. Im Folgenden werden Ihnen links auf dem Bildschirm die Bauklotzsets und rechts das Ergebnis des automatischen Scanners angezeigt. Mithilfe zweier Buttons k&ouml;nnen Sie das Ergebnis des Scanners annehmen, falls Sie es f&uuml;r richtig erachten, oder ablehnen, wenn Sie es f&uuml;r falsch halten.</p> <p>F&uuml;r die korrekte Einteilung der Sets in fehlerhafte mit doppelt vorkommenden Buchstaben und fehlerfreie ohne Dopplung erhalten Sie Punkte. F&uuml;r falsche Zuordnungen werden Ihnen jedoch Punkte abgezogen. Zudem verlieren Sie Punkte mit jeder verstrichenen Minute. Die folgende Tabelle zeigt, wie viele Punkte Sie jeweils gewinnen oder verlieren:</p> <table id="scoring"><tr><th>Aktion</th><th>Punkte</th></tr><tr><td>Eine Dopplung korrekt identifizieren</td><td>+100 Punkte</td></tr><tr><td>Eine Dopplung &uuml;bersehen</td><td>-100 Punkte</td></tr><tr><td>Ein passendes Set als korrekt einordnen</td><td>+25 Punkte</td></tr><tr><td>Ein passendes Set f&auml;lschlichweise zur&uuml;ckweisen</td><td>-25 Punkte</td></tr><tr><td>Jede vollst&auml;ndig vergangene Minute</td><td>-10 Punkte</td></tr></table></div>';
    } else {
        instruction = '<div class="instruction"><p> Zur automatischen &Uuml;berpr&uuml;fung der Bauklotzsets setzt die Spielzeugfabrik einen automatischen Scanner der Firma BrickScan ein, der die Sets auf m&ouml;gliche Dopplungen &uuml;berpr&uuml;ft. Der Scanner gibt Feedback dar&uuml;ber, ob eine Dopplung vorliegt oder nicht.</p> <p>Um die korrekte Funktionsweise des Systems zu gew&auml;hrleisten, werden Sie zus&auml;tzlich als Pr&uuml;fer eingesetzt. Im Folgenden werden Ihnen links auf dem Bildschirm die Bauklotzsets und rechts das Ergebnis des automatischen Scanners angezeigt. Mithilfe zweier Buttons k&ouml;nnen Sie das Ergebnis des Scanners annehmen, falls Sie es f&uuml;r richtig erachten, oder ablehnen, wenn Sie es f&uuml;r falsch halten.</p> <p>F&uuml;r die korrekte Einteilung der Sets in fehlerhafte mit doppelt vorkommenden Buchstaben und fehlerfreie ohne Dopplung erhalten Sie Punkte. F&uuml;r falsche Zuordnungen werden Ihnen jedoch Punkte abgezogen. Zudem verlieren Sie Punkte mit jeder verstrichenen Minute. Die folgende Tabelle zeigt, wie viele Punkte Sie jeweils gewinnen oder verlieren:</p></p> <table id="scoring"><tr><th>Aktion</th><th>Punkte</th></tr><tr><td>Eine Dopplung korrekt identifizieren</td><td>+100 Punkte</td></tr><tr><td>Eine Dopplung &uuml;bersehen</td><td>-100 Punkte</td></tr><tr><td>Ein passendes Set als korrekt einordnen</td><td>+25 Punkte</td></tr><tr><td>Ein passendes Set f&auml;lschlichweise zur&uuml;ckweisen</td><td>-25 Punkte</td></tr><tr><td>Jede vollst&auml;ndig vergangene Minute</td><td>-10 Punkte</td></tr></table></div>';
    }

    return instruction;
}

//Instruction

var instruction = {
    type: 'instructions',
    pages: [
        '<div class="instructions">' + selectInstruction() + '</div>',
        'Zun&auml;chst folgen drei Beispieldurchg&auml;nge. W&auml;hrend der Beispieldurchg&auml;nge werden Zeit und Punktstand nicht angezeigt.'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter'
};
timeline.push(instruction);

//Example trials for automation trials

var exampleNDND = {
    //first example: no double, automation no double
    type: 'html-button-response',
    stimulus: '<div class="matrix"><table class="table"><tr><td> X </td><td> Q </td><td> Z </td><td> G </td></tr><tr><td> M </td><td> A </td><td> K </td><td> N </td></tr><tr><td> V </td><td> C </td><td> S </td><td> J </td></tr><tr><td> L </td><td> P </td><td> F </td><td> B </td></tr></table></div><div class="automation"><p class="message">Es liegt keine Dopplung vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis der Automation annehmen', 'Ergebnis der Automation ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>'
};
timeline.push(exampleNDND);

var resultExampleNDND = {
    type: 'instructions',
    pages: [
        '<div class="instructions"><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Die Automation hat mitgeteilt, dass keine Dopplung vorliegt. Es war somit richtig, das Ergebnis der Automation anzunehmen. </p><p> Die richtige Antwort "Ergebnis der Automation annehmen" h&auml;tte 25 Punkte gebracht.</p><p> Die falsche Antwort "Ergebnis der Automation ablehnen" h&auml;tte -25 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter'
};
timeline.push(resultExampleNDND);

var exampleDD = {
    //second example: double, automation double
    type: 'html-button-response',
    stimulus: '<div class="matrix"><table class="table"><tr><td> G </td><td> D </td><td> J </td><td> X </td><td> N </td></tr><tr><td> Y </td><td> Q </td><td> E </td><td> F </td><td> H </td></tr><tr><td> C </td><td> V </td><td> U </td><td> Z </td><td> S </td></tr><tr><td> B </td><td> O </td><td> I </td><td> A </td><td> N </td></tr><tr><td> R </td><td> K </td><td> P </td><td> M </td><td> T </td></tr></table></div><div class="automation"><p class="message"> Ein Buchstabe liegt doppelt vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis der Automation annehmen', 'Ergebnis der Automation ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>'
};
timeline.push(exampleDD);

var resultExampleDD = {
    type: 'instructions',
    pages: [
        '<div class="instructions"><p> In dem Bauklotzset lag der Buchstabe "N" doppelt vor. Die Automation hat mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit richtig, das Ergebnis der Automation anzunehmen. </p><p> Die richtige Antwort "Ergebnis der Automation annehmen" h&auml;tte 100 Punkte gebracht.</p><p> Die falsche Antwort "Ergebnis der Automation ablehnen" h&auml;tte -100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter'
};
timeline.push(resultExampleDD);

var exampleNDD = {
    //sthird example: no double, automation double
    type: 'html-button-response',
    stimulus: '<div class="matrix"><table class="table"><tr><td> Q </td><td> T </td><td> A </td><td> L </td></tr>' + '<tr><td> K </td><td> O </td><td> C </td><td> V </td></tr>' + '<tr><td> I </td><td> N </td><td> W </td><td> B </td></tr>' + '<tr><td> E </td><td> S </td><td> D </td><td> F </td></tr>' + '<tr><td> U </td><td> M </td><td> Y </td><td> X </td></tr></table></div><div class="automation"><p class="message"> Ein Buchstabe liegt doppelt vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis der Automation annehmen', 'Ergebnis der Automation ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>'
};
timeline.push(exampleNDD);

var resultExampleNDD = {
    type: 'instructions',
    pages: [
        '<div class="instructions"><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Die Automation hat jedoch mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit richtig, das Ergebnis der Automation abzulehnen.</p><p> Die richtige Antwort "Ergebnis der Automation ablehnen" h&auml;tte 25 Punkte gebracht.</p><p> Die falsche Antwort "Ergebnis der Automation annehmen" h&auml;tte -25 Punkte Abzug bedeutet.</p><p>Sie untersuchen nun mit Unterst&uuml;tzung des automatischen Scanners 200 weitere Sets auf Dopplungen. Ihr aktueller Punktestand und die vergangene Zeit werden Ihnen nun angezeigt.</p></div>'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter'
};
timeline.push(resultExampleNDD);

//function to select table of 200 trials for each participant

function selectTrials() {

    var trials;

    if (cond == 1) {
        trials = stimuli_v1_85prct[Math.floor(Math.random() * stimuli_v1_85prct.length)];
    } else {
        trials = stimuli_v2_65prct[Math.floor(Math.random() * stimuli_v2_65prct.length)];
    }

    /*jsPsych.data.addProperties({
        category: 'test2'
    });*/



    for (j = 0; j < trials.length; j++) {

        if (trials[j].length == 16) {
            trials[j].dispmessage = '<div class="matrix"><table class="table"><tr><td>' + trials[j].str[0] + '</td><td>' + trials[j].str[1] + '</td><td>' + trials[j].str[2] + '</td><td>' + trials[j].str[3] + '</td></tr>' + '<tr><td>' + trials[j].str[4] + '</td><td>' + trials[j].str[5] + '</td><td>' + trials[j].str[6] + '</td><td>' + trials[j].str[7] + '</td></tr>' + '<tr><td>' + trials[j].str[8] + '</td><td>' + trials[j].str[9] + '</td><td>' + trials[j].str[10] + '</td><td>' + trials[j].str[11] + '</td></tr>' + '<tr><td>' + trials[j].str[12] + '</td><td>' + trials[j].str[13] + '</td><td>' + trials[j].str[14] + '</td><td>' + trials[j].str[15] + '</td></tr></table></div>' + '<div class="automation"><p id="timer">Zeit: insertTime min </p> <p id="score"> Score: insertScore </p><p class="message">' + trials[j].message + '</p></div>';

        } else if (trials[j].length == 20) {
            trials[j].dispmessage = '<div class="matrix"><table class="table"><tr><td>' + trials[j].str[0] + '</td><td>' + trials[j].str[1] + '</td><td>' + trials[j].str[2] + '</td><td>' + trials[j].str[3] + '</td></tr>' + '<tr><td>' + trials[j].str[4] + '</td><td>' + trials[j].str[5] + '</td><td>' + trials[j].str[6] + '</td><td>' + trials[j].str[7] + '</td></tr>' + '<tr><td>' + trials[j].str[8] + '</td><td>' + trials[j].str[9] + '</td><td>' + trials[j].str[10] + '</td><td>' + trials[j].str[11] + '</td></tr>' + '<tr><td>' + trials[j].str[12] + '</td><td>' + trials[j].str[13] + '</td><td>' + trials[j].str[14] + '</td><td>' + trials[j].str[15] + '</td></tr>' + '<tr><td>' + trials[j].str[16] + '</td><td>' + trials[j].str[17] + '</td><td>' + trials[j].str[18] + '</td><td>' + trials[j].str[19] + '</td></tr></table></div>' + '<div class="automation"><p id="timer">Zeit: insertTime min</p><p id="score"> Score: insertScore </p> <p class="message">' + trials[j].message + '</p></div>';

        } else if (trials[j].length == 25) {
            trials[j].dispmessage = '<div class="matrix"><table class="table"><tr><td>' + trials[j].str[0] + '</td><td>' + trials[j].str[1] + '</td><td>' + trials[j].str[2] + '</td><td>' + trials[j].str[3] + '</td><td>' + trials[j].str[4] + '</td></tr>' + '<tr><td>' + trials[j].str[5] + '</td><td>' + trials[j].str[6] + '</td><td>' + trials[j].str[7] + '</td><td>' + trials[j].str[8] + '</td><td>' + trials[j].str[9] + '</td></tr>' + '<tr><td>' + trials[j].str[10] + '</td><td>' + trials[j].str[11] + '</td><td>' + trials[j].str[12] + '</td><td>' + trials[j].str[13] + '</td><td>' + trials[j].str[14] + '</td></tr>' + '<tr><td>' + trials[j].str[15] + '</td><td>' + trials[j].str[16] + '</td><td>' + trials[j].str[17] + '</td><td>' + trials[j].str[18] + '</td><td>' + trials[j].str[19] + '</td></tr>' + '<tr><td>' + trials[j].str[20] + '</td><td>' + trials[j].str[21] + '</td><td>' + trials[j].str[22] + '</td><td>' + trials[j].str[23] + '</td><td>' + trials[j].str[24] + '</td></tr></table></div>' + '<div class="automation"><p id="timer">Zeit: insertTime min</p><p id="score"> Score: insertScore </p> <p class="message">' + trials[j].message + '</p></div>';
        }

        /*trials[j].data = {
            category: 'test'
        };*/
        //trials[j].data.category = 'test';
        //trials[j].data.category = 'test';

    }

    // Cut off trials for test purposes
    trials.splice(0, 190);

    return trials;
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

function pointsFromTrial(category, button) {
    var points

    //a: string contains duplicate, automation finds duplicate
    //b: string contains duplicate, automation doesn't find duplicate
    //c: string doesn't contain duplicate, automation is correct
    //d: string doesn't contain duplicate, automation is incorrect

    if ((category == 'a') && (button == 0)) {
        points = 100;
    } else if ((category == 'a') && (button == 1)) {
        points = -100;
    } else if ((category == 'b') && (button == 0)) {
        points = -100;
    } else if ((category == 'b') && (button == 1)) {
        points = 100;
    } else if ((category == 'c') && (button == 0)) {
        points = 25;
    } else if ((category == 'c') && (button == 1)) {
        points = -25;
    } else if ((category == 'd') && (button == 0)) {
        points = -25;
    } else if ((category == 'd') && (button == 1)) {
        points = 25;
    }

    return points;
}

var my_trials = selectTrials();

//Automation trials
var setscan_automation_procedure = {
    timeline: [
        {
            type: 'html-keyboard-response',
            stimulus: 'Start',
            choices: jsPsych.NO_KEYS,
            trial_duration: 1500,
            on_start: function (trial) {
                if (AddToScore != 0) {
                    trial.stimulus = 'Punkte: ' + AddToScore.toString();
                }
            }
        },
        {
            type: 'html-button-response',
            stimulus: jsPsych.timelineVariable('dispmessage'),
            on_start: function (trial) {
                trial.stimulus = trial.stimulus.replace('insertScore', score.toString());
                trial.stimulus = trial.stimulus.replace('insertTime', millisToMinutesAndSeconds(elapsedTime));
                timeHtml = elapsedTime;
                DisplayTimer = setInterval(function () {
                    timeHtml = timeHtml + 1000;
                    document.getElementById('timer').innerHTML = 'Zeit: ' + millisToMinutesAndSeconds(timeHtml) + ' min';
                }, 1000);
            },
            on_finish: function (data) {
                clearInterval(DisplayTimer);
                AddToScore = pointsFromTrial(data.category, data.button_pressed);
                data.scorefromtrial = AddToScore;
                score = score + AddToScore;
                data.scoreaftertrial = score;
                elapsedTime = elapsedTime + data.rt;
            },
            data: {
                category: jsPsych.timelineVariable('category'),
                strlength: jsPsych.timelineVariable('length'),
                scorefromtrial: 0,
                scoreaftertrial: 0,
                elapsedTime: 0
            },
            //display matrix and automation answer
            choices: ['Ergebnis der Automation annehmen', 'Ergebnis der Automation ablehnen'],
            //data: saved to result
            //on_finish: update score
            button_html: '<button class="jspsych-btn">%choice%</button>'
        }
        ],
    timeline_variables: selectTrials()
};

timeline.push(setscan_automation_procedure);

//Total score

var finalScore = {
    type: 'instructions',
    pages: [''
    ],
    on_start: function (trial) {
        scoreMinusTime = score - (Math.floor(elapsedTime / 60000) * 10);
        trial.pages = ['<div class="instruction"><p>Sie haben in der Bauklotz-Aufgabe mit Unterst&uuml;tzung des automatischen Scanners<strong> ' + score + ' Punkte</strong> erreicht. Daf&uuml;r haben Sie<strong> ' + millisToMinutesAndSeconds(elapsedTime) + ' Minuten </strong> ben&ouml;tigt.</p><p>Somit ergibt Sich ein Gesamtscore von <strong>' + scoreMinusTime + ' Punkten</strong>. Herzlichen Gl&uuml;ckwunsch!</p></div>'];
    },
    on_finish: function (data) {
        data.finalScore = scoreMinusTime;
    },
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    data: {
        finalScore: scoreMinusTime
    }
};
timeline.push(finalScore);

//Final comments

//assessment of the automation's reliability
var reliabilityAsses = {
    type: 'survey-text',
    preamble: '<p>Bitte sch&aumltzen Sie, wie zuverl&aumlssig der automatische Bauklotz-Scanner festgestellt hat, ob Dopplungen in den Sets vorlagen oder nicht. Geben Sie eine Sch&aumltzung ab, in wieviel Prozent der F&aumllle der Scanner ein Set richtig eingeordnet hat.</p>',
    button_label: 'Weiter',
    questions: [
        {
            prompt: "Gesch&aumltzte Zuverl&aumlssigkeit in %:"
            }
            ],
};
timeline.push(reliabilityAsses);

//Trust questionnaire

var likert = ["Stimme gar nicht zu", "Stimme eher nicht zu", "Stimme weder zu noch nicht zu", "Stimme eher zu", "Stimme voll zu", "keine Angabe"];

var TiA = {
    type: 'survey-likert',
    preamble: '<p>Bitte bewerten Sie die folgenden Aussagen bezogen auf den automatischen Bauklotzscanner der Firma BrickScan, den Sie in diesem Versuch kennengelernt haben.</p>',
    button_label: 'Weiter',
    questions: [{
            prompt: "Das System ist imstande Situationen richtig einzusch&auml;tzen.",
            labels: likert
        },
        {
            prompt: "Mir war durchgehend klar, in welchem Zustand sich das System befindet.",
            labels: likert
        },
        {
            prompt: "Ich kenne bereits &auml;hnliche Systeme.",
            labels: likert
        },
        {
            prompt: "Die Entwickler sind vertrauensw&uuml;rdig.",
            labels: likert
        },
        {
            prompt: "Bei unbekannten automatisierten Systemen sollte man eher vorsichtig sein.",
            labels: likert
        },
        {
            prompt: "Das System arbeitet zuverl&auml;ssig.",
            labels: likert
        },
        {
            prompt: "Das System reagiert unvorhersehbar.",
            labels: likert
        },
        {
            prompt: "Die Entwickler nehmen mein Wohlergehen ernst.",
            labels: likert
        },
        {
            prompt: "Ich vertraue dem System.",
            labels: likert
        },
        {
            prompt: "Ein Ausfalls des Systems ist wahrscheinlich.",
            labels: likert
        },
        {
            prompt: "Ich konnte nachvollziehen, warum etwas passiert ist.",
            labels: likert
        },
        {
            prompt: "Ich vertraue einem System eher, als dass ich ihm misstraue.",
            labels: likert
        },
        {
            prompt: "Das System kann wirklich komplizierte Aufgaben &uuml;bernehmen.",
            labels: likert
        },
        {
            prompt: "Ich kann mich auf das System verlassen.",
            labels: likert
        },
        {
            prompt: "Das System k&ouml;nnte stellenweise einen Fehler machen.",
            labels: likert
        },
        {
            prompt: "Zu erkennen, was das System als N&auml;chstes macht, ist schwer.",
            labels: likert
        },
        {
            prompt: "Ich habe &auml;hnliche Systeme bereits genutzt.",
            labels: likert
        },
        {
            prompt: "Automatisierte Systeme funktionieren generell gut.",
            labels: likert
        },
        {
            prompt: "Ich bin &uuml;berzeugt von den F&auml;higkeiten des Systems.",
            labels: likert
        }
               ],
};
timeline.push(TiA);

//Final comments

//feedback on how exhausting/stressful the task was
var feedbackPilotStress = {
    type: 'survey-text',
    preamble: '<p>Bitte lassen Sie uns wissen, wie Sie die Bearbeitung der Aufgabe mit Unterst&uuml;tzung des automatisierten Systems (&Uuml;berpr&uuml;fung der Baukl&ouml;tze und Kontrolle der Automatisierung) erlebt haben und bewerten Sie dabei bitte auch die L&auml;nge dieses Versuchsabschnitts.</p>',
    button_label: 'Weiter',
    questions: [
        {
            prompt: "Ihr Kommentar zur Aufgabenbearbeitung mit Unterst&uuml;tzung durch das automatisierte System:",
            rows: 15,
            colums: 60
            }
            ],
};
timeline.push(feedbackPilotStress);

var feedbackPilotScore = {
    type: 'survey-text',
    preamble: '<p>Bitte beurteilen Sie das Bewertungssystem der Aufgabe, die Sie mit Unterst&uuml;tzung des automatisierten Systems (&Uuml;berpr&uuml;fung der Baukl&ouml;tze) bearbeitet haben. Erscheinen Ihnen die Punktgewinne und -abz&uuml;ge f&uuml;r richtig eingeordnete Bauklotzsets und die dafür benö&ouml;tigte Zeit angemessen?</p>',
    button_label: 'Weiter',
    questions: [
        {
            prompt: "Ihr Kommentar zum Bewertungssystem:",
            rows: 15,
            colums: 60
            }
            ],
};
timeline.push(feedbackPilotScore);

//Final question to assess trust in system

var trustcheck = {
    type: 'survey-multi-choice',
    preamble: '<p> Um zus&auml;tzliche Punkte zu sammeln, k&ouml;nnen Sie den automatischen Scanner 10 Bauklotzsets bewerten lassen. Dabei arbeitet der Scanner nun ganz eigenst&auml;ndig. Sie k&ouml;nnen sein Ergebnis nicht korrigieren. Bei richtiger Einordnung des Sets durch den Scanner gewinnen Sie wie zuvor Punkte, bei falscher Einordnung verlieren Sie wie gehabt Punkte.',
    questions: [{
        prompt: "M&ouml;chten Sie, dass der automatische Scanner weitere 10 Bauklotzsets f&uuml;r Sie bearbeitet?",
        options: ["Ja", "Nein"],
        required: true
    }]
};
timeline.push(trustcheck);

//Final comments

//provide email address
var email = {
    type: 'survey-text',
    preamble: '<p><strong>Vielen Dank f&uuml;r Ihre Teilnahme an dieser Studie!</strong></p> <p>Um an der Verlosung der Amazon-Gutscheine teilzunehmen, geben Sie bitte abschlie&szlig;end Ihre Email-Adresse an. Im Falle eines Gewinnes, werden Sie per Email kontaktiert und der Gutschein an die angegebene Adresse versandt.</p>',
    button_label: 'Weiter',
    questions: [
        {
            prompt: "Email-Adresse:",
            columns: 60
            }
            ],
};
timeline.push(email);

//comments
var comments = {
    type: 'survey-text',
    button_label: 'Fragebogen beenden und abschicken',
    questions: [
        {
            prompt: "Falls es etwas gibt, dass Sie uns abschlie&szlig;end bez&uuml;glich dieser Studie wissen lassen wollen, k&ouml;nnen Sie Ihre Mitteilung hier eintragen:",
            rows: 15,
            columns: 60
            }
            ],
};
timeline.push(comments);

//Exclude browsers that are not at least 800x600 pixel
jsPsych.init({
    timeline: timeline,
    exclusions: {
        min_width: 800,
        min_height: 600
    },
    display_element: "testContent",
    on_finish: function () {
        jsPsych.data.displayData('csv');
    }
});


//add feature to record browser interactions --> check if participants leave window