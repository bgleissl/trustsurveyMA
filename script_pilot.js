//pilot study script


//condition variable

// generate a random subject ID
var subject_id = jsPsych.randomization.randomID(10);

// pick a random condition for the subject at the start of the experiment
// 1 = 85% reliability; 2 = 65% reliability
var conditionsArray = [1, 2];
var tempcond = jsPsych.randomization.sampleWithoutReplacement(conditionsArray, 1);
var cond = tempcond[0];
//console.log(cond);

//non-random assignment of condition to equal out group sizes
// var cond = 1;
// var cond = 2;

//global variables necessary for showing participants' score and elapsed time
var score = 0;
var AddToScore = 0;
var DisplayTimer;
var elapsedTime = 0;
var timeHtml = 0;
var scoreMinusTime = 0;

//global feedback variable for test trials
var testTrialFeedback = '';

var timeline = [];

jsPsych.data.addProperties({
    subject: subject_id,
    cond: cond
});

// push questions to timeline

//Introduction

var intro = {
    type: 'instructions',
    pages: [
        '<div class="instruction"><p>Liebe/r Teilnehmer/in,</p><p>vielen Dank f&uuml;r Ihr Interesse an dieser <strong>Studie zur Bewertung von automatisierten Systemen</strong>.</p><p>Die Durchf&uuml;hrung der Studie erfolgt durch den Lehrstuhl f&uuml;r Ergonomie der Technischen Universit&auml;t M&uuml;nchen.</p><p>Im Folgenden werden Sie zun&auml;chst ein paar demographische Angaben zu Ihrer Person machen. Darauf folgt ein Abschnitt mit Suchaufgaben. Anschlie&szlig;end bearbeiten Sie, unterst&uuml;tzt durch ein automatisiertes System, eine weitere Reihe von Aufgaben. Die Studie endet mit einigen kurzen Abschlussfragen. Insgesamt dauert die Studie ca. 1 Stunde.</p><p>Bitte bearbeiten Sie den Versuch <strong>an einem St&uuml;ck </strong> ohne selbstst&auml;ndig Pausen einzulegen. Die Durchf&uuml;hrung sollte an einem <strong>Laptop oder Desktop-PC</strong> erfolgen. Die Verwendung eines Smartphones ist nicht m&ouml;glich. </p><p>Alle im Laufe des Versuchs erhobenen Daten werden anonymisiert gespeichert und ausgewertet und ausschlie&szlig;lich zum Zwecke wissenschaftlicher Forschung verwendet. </p><p>Zum Dank f&uuml;r Ihre Teilnahme haben Sie die M&ouml;glichkeit an der <strong>Verlosung </strong>von <strong>drei 25&euro;-Amazon-Gutscheinen</strong> teilzunehmen. Ein weiterer <strong>Amazon-Gutschein &uuml;ber 50&euro;</strong> wird an den/die Teilnehmer/in mit der <strong>h&ouml;chsten Punktzahl </strong> bei der Bearbeitung der Aufgabe mit dem automatisierten System vergeben. </p><p>Mit Dr&uuml;cken des Weiter-Knopfes erkl&auml;ren Sie sich zur Teilnahme am beschriebenen Versuch und der Aufzeichnung Ihrer Daten bereit. </p><p><strong>Vielen Dank und viel Spa&szlig; bei der Studie! </strong></p></div>'
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
            prompt: "Bitte geben Sie Ihr Alter in Jahren an.",
            rows: 1,
            columns: 2
            }
            ]
};
timeline.push(age);

var gender = {
    type: 'survey-multi-choice',
    button_label: 'Weiter',
    questions: [{
        prompt: "Bitte geben Sie ihr Geschlecht an.",
        options: ["weiblich", "m&auml;nnlich", "anderes"],
        required: true
    }]
};

timeline.push(gender);

var country = {
    type: 'survey-multi-choice',
    button_label: 'Weiter',
    questions: [{
        prompt: "In welchem Land sind Sie aufgewachsen?",
        options: ["Deutschland", "&Ouml;sterreich", "Schweiz", "anderes"]
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

//language

var language = {
    type: 'survey-multi-choice',
    button_label: 'Weiter',
    questions: [{
        prompt: "Beherrschen Sie die deutsche Sprache mindestens auf ann&auml;hernd Muttersprachenniveau?",
        options: ["ja", "nein"],
        required: true
    }],
    on_finish: function (data) {
        console.log(data.responses);
    }
};

timeline.push(language);

var endIfNoGerman = {
    type: 'instructions',
    pages: [
        '<div class="instruction"><p>Liebe/r Teilnehmer/in,</p><p>vielen Dank f&uuml;r Ihr Interesse an der Studie.</p><p>Leider k&ouml;nnen wir bei dieser Studie jedoch nur Personen, deren Deutschkenntnisse mindestens ann&auml;hernd auf dem Niveau eines deutschen Muttersprachlers sind, ber&uuml;cksichtigen.</p><p>Wir w&uuml;rden uns aber freuen, Sie irgendwann bei einer anderen Studie des Lehrstuhls f&uuml;r Ergonomie der Technischen Universit&auml;t M&uuml;nchen begr&uuml;&szlig;en zu d&uuml;rfen.</p><p>Sie k&ouml;nnen das Browserfenster nun schlie&szlig;en.</p></div>'
    ]
};


var if_node2 = {
    timeline: [endIfNoGerman],
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
    button_label: 'Weiter',
    questions: [{
        prompt: "Was ist Ihr h&ouml;chster Bildungsabschluss?",
        options: ["Kein Schulabschluss", "Grund-/Hauptschulabschluss", "Realschule (Mittlere Reife)", "(Fach-)Hochschulreife", "Abgeschlossene Ausbildung", "Bachelor", "Master/Diplom/Magister/Staatsexamen", "Promotion"]
    }]
};

timeline.push(education);

var job = {
    type: 'survey-multi-choice',
    button_label: 'Weiter',
    questions: [{
        prompt: "Was beschreibt am besten Ihre derzeitige berufliche Situation?",
        options: ["Sch&uuml;ler/in", "Auszubildende/r", "Student/in", "Angestellte/r", "Selbstst&auml;ndig", "Beamter/Beamtin", "Arbeitssuchend", "Rentner/in", "Sonstiges"]
    }]
};

timeline.push(job);

//Instruction

var instruction = {
    type: 'instructions',
    pages: [
        '<div class="instruction"><p> In der Spielzeugfabrik "Spielspa&szlig; Speer" werden Baukl&ouml;tze produziert. Die einzelnen Baukl&ouml;tze werden mit Buchstaben bedruckt und als Set verpackt ausgeliefert. Es gibt drei Setgr&ouml;&szlig;en: 16, 20 und 25 St&uuml;ck.</p> <img src="images/blocks.jpg" alt="Bauklotzset Beispiel" height="200" width="200"> <p>Hierf&uuml;r stellen Mitarbeiter aus den bedruckten Baukl&ouml;tzen Sets zusammen, in denen die Baukl&ouml;tze zuf&auml;llig angeordnet sind. </p> <p>Die Mitarbeiter achten darauf, dass <strong>in einem Set jeder Buchstabe nur ein einziges Mal vorkommt</strong>, da es sich andernfalls gem&auml;&szlig; der Vorschriften des Unternehmens um eine Fehllieferung handelt.</p><p>Dennoch unterlaufen ihnen dabei manchmal Fehler.</p></div>',
        '<div class="instruction"><p> Da bei einer Fehllieferung durch den R&uuml;ckruf des Sets f&uuml;r das Unternehmen gro&szlig;e Kosten entstehen, setzt die Spielzeugfabrik "Spielspa&szlig; Speer" zur automatischen &Uuml;berpr&uuml;fung der Bauklotzsets einen  Scanner der Firma <i>BrickScan</i> ein. Dieser &uuml;berpr&uuml;ft die Sets auf m&ouml;gliche Dopplungen. Der Scanner gibt Feedback dar&uuml;ber, ob eine Dopplung in einem Set vorliegt oder nicht.</p> <p>Um die korrekte Funktionsweise des Systems zu gew&auml;hrleisten, werden Sie zus&auml;tzlich als Pr&uuml;fer eingesetzt. Im Folgenden werden Ihnen links auf dem Bildschirm die Bauklotzsets und rechts das Ergebnis des automatisierten Scanners angezeigt. Mithilfe zweier Buttons k&ouml;nnen Sie das Ergebnis des Scanners annehmen, falls Sie es f&uuml;r richtig erachten, oder ablehnen, wenn Sie es f&uuml;r falsch halten.</p></div>',
        '<div class="instruction"><p> Durch die entstehenden Kosten bei Fehllieferungen tragen Sie als Kontrolleur/in eine gro&szlig;e Verantwortung f&uuml;r die Korrektheit der Lieferungen. </p><p> Ein korrekt ausgeliefertes Set bringt der Firma etwa 25&nbsp;&euro; Gewinn ein. Eine Fehllieferung kostet das Unternehmen durch den R&uuml;ckruf hingegen 100&nbsp;&euro;. </p><p> Falls Sie eine Fehllieferung erkennen, erhalten Sie einen Bonus von 100&nbsp;&euro;. Allerdings entstehen bei einem Fehlalarm durch die unn&ouml;tige weitere &Uuml;berpr&uuml;fung eines Sets Kosten von 25&nbsp;&euro;. </p><p> Zudem verlieren Sie durch die Fixkosten f&uuml;r die Produktion mit jeder verstrichenen Minute 10&nbsp;&euro;. </p><p> Die folgende Tabelle zeigt, wie viele Euro Sie bei Ihren Entscheidungen jeweils gewinnen oder verlieren: </p> <table id="scoring"><tr><th>Aktion</th> <th> Euro </th></tr> <tr> <td> Eine Dopplung korrekt identifizieren </td><td>+ 100 Euro</td> </tr><tr><td>Eine Dopplung &uuml;bersehen</td> <td> &minus; 100 Euro </td></tr> <tr> <td> Ein korrektes Set als korrekt beurteilen </td><td>+ 25 Euro</td> </tr><tr><td>Ein korrektes Set f&auml;lschlicherweise zur&uuml;ckweisen</td> <td> &minus; 25 Euro </td></tr> <tr> <td> Jede vollst&auml;ndig vergangene Minute </td><td>&minus; 10 Euro</td> </tr></table> </div>',
        '<div class="instruction">Sie bearbeiten nun zun&auml;chst 12 Beispieldurchg&auml;nge. W&auml;hrend der Beispieldurchg&auml;nge werden die Zeit und der Punktstand nicht angezeigt.</div>'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter'
};
timeline.push(instruction);

//Example trials for automation trials

//1st example trial: case c

function chooseResultExampleC1(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    }

    return resMessage;
}

var exampleC1 = {
    //first example: no double, automation no double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> X </td><td> Q </td><td> Z </td><td> G </td></tr><tr><td> M </td><td> A </td><td> K </td><td> N </td></tr><tr><td> V </td><td> C </td><td> S </td><td> J </td></tr><tr><td> L </td><td> P </td><td> F </td><td> B </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message">Es liegt keine Dopplung vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleC1(data.button_pressed);
    }
};
timeline.push(exampleC1);

var resultExampleC1 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleC1);

//2nd example trial: case a

function chooseResultExampleA1(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag der Buchstabe "N" doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag der Buchstabe "N" doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    }

    return resMessage;
}

var exampleA1 = {
    //second example: double, automation double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> G </td><td> D </td><td> J </td><td> X </td><td> N </td></tr><tr><td> Y </td><td> Q </td><td> E </td><td> F </td><td> H </td></tr><tr><td> C </td><td> V </td><td> U </td><td> Z </td><td> S </td></tr><tr><td> B </td><td> O </td><td> I </td><td> A </td><td> N </td></tr><tr><td> R </td><td> K </td><td> P </td><td> M </td><td> T </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message"> Ein Buchstabe liegt doppelt vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleA1(data.button_pressed);
    }
};
timeline.push(exampleA1);

var resultExampleA1 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleA1);

//3rd example trial: case d

function chooseResultExampleD1(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>.</p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte Abzug bedeutet.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>.</p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte Abzug bedeutet.</p></div>';
    }

    return resMessage;
}

var exampleD1 = {
    //third example: no double, automation double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> Q </td><td> T </td><td> A </td><td> L </td></tr>' + '<tr><td> K </td><td> O </td><td> C </td><td> V </td></tr>' + '<tr><td> I </td><td> N </td><td> W </td><td> B </td></tr>' + '<tr><td> E </td><td> S </td><td> D </td><td> F </td></tr>' + '<tr><td> U </td><td> M </td><td> Y </td><td> X </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message"> Ein Buchstabe liegt doppelt vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleD1(data.button_pressed);
    }
};
timeline.push(exampleD1);

var resultExampleD1 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleD1);

//4th example trial: case b

function chooseResultExampleB1(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag der Buchstabe "Q" doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag der Buchstabe "Q" doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    }

    return resMessage;
}

var exampleB1 = {
    //first example: no double, automation no double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> R </td><td> Q </td><td> Q </td><td> J </td></tr><tr><td> M </td><td> A </td><td> K </td><td> N </td></tr><tr><td> V </td><td> C </td><td> G </td><td> S </td></tr><tr><td> L </td><td> P </td><td> O </td><td> D </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message">Es liegt keine Dopplung vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleB1(data.button_pressed);
    }
};
timeline.push(exampleB1);

var resultExampleB1 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleB1);

//5th example trial: case a

function chooseResultExampleA2(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag der Buchstabe "W" doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag der Buchstabe "W" doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    }

    return resMessage;
}

var exampleA2 = {
    //second example: double, automation double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> U </td><td> W </td><td> K </td><td> J </td></tr>' + '<tr><td> D </td><td> G </td><td> O </td><td> C </td></tr>' + '<tr><td> E </td><td> P </td><td> X </td><td> H </td></tr>' + '<tr><td> I </td><td> Z </td><td> S </td><td> V </td></tr>' + '<tr><td> R </td><td> W </td><td> Y </td><td> L </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message"> Ein Buchstabe liegt doppelt vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleA2(data.button_pressed);
    }
};
timeline.push(exampleA2);

var resultExampleA2 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleA2);

//6th example trial: case b

function chooseResultExampleB2(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag der Buchstabe "D" doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag der Buchstabe "D" doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    }

    return resMessage;
}

var exampleB2 = {
    //first example: no double, automation no double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> A </td><td> D </td><td> C </td><td> S </td><td> K </td></tr><tr><td> T </td><td> Q </td><td> E </td><td> F </td><td> H </td></tr><tr><td> J </td><td> V </td><td> U </td><td> P </td><td> R </td></tr><tr><td> B </td><td> O </td><td> I </td><td> G </td><td> D </td></tr><tr><td> Z </td><td> X </td><td> N </td><td> M </td><td> Y </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message">Es liegt keine Dopplung vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleB2(data.button_pressed);
    }
};
timeline.push(exampleB2);

var resultExampleB2 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleB2);

//7th example trial: case d

function chooseResultExampleD2(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>.</p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte Abzug bedeutet.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>.</p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte Abzug bedeutet.</p></div>';
    }

    return resMessage;
}

var exampleD2 = {
    //third example: no double, automation double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> L </td><td> H </td><td> P </td><td> S </td><td> C </td></tr><tr><td> O </td><td> A </td><td> E </td><td> F </td><td> I </td></tr><tr><td> J </td><td> Z </td><td> X </td><td> K </td><td> T </td></tr><tr><td> N </td><td> R </td><td> G </td><td> M </td><td> D </td></tr><tr><td> V </td><td> U </td><td> Y </td><td> Q </td><td> B </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message"> Ein Buchstabe liegt doppelt vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleD2(data.button_pressed);
    }
};
timeline.push(exampleD2);

var resultExampleD2 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleD2);

//8th example trial: case c

function chooseResultExampleC2(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    }

    return resMessage;
}

var exampleC2 = {
    //first example: no double, automation no double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> L </td><td> R </td><td> K </td><td> V </td></tr>' + '<tr><td> P </td><td> W </td><td> G </td><td> J </td></tr>' + '<tr><td> E </td><td> I </td><td> H </td><td> X </td></tr>' + '<tr><td> D </td><td> A </td><td> O </td><td> C </td></tr>' + '<tr><td> Z </td><td> Y </td><td> B </td><td> U </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message">Es liegt keine Dopplung vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleC2(data.button_pressed);
    }
};
timeline.push(exampleC2);

var resultExampleC2 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleC2);

//9th example trial: case c

function chooseResultExampleC3(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    }

    return resMessage;
}

var exampleC3 = {
    //first example: no double, automation no double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> O </td><td> J </td><td> H </td><td> Z </td><td> R </td></tr><tr><td> M </td><td> Y </td><td> Q </td><td> K </td><td> D </td></tr><tr><td> C </td><td> U </td><td> S </td><td> F </td><td> T </td></tr><tr><td> E </td><td> W </td><td> X </td><td> G </td><td> N </td></tr><tr><td> V </td><td> I </td><td> A </td><td> P </td><td> B </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message">Es liegt keine Dopplung vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleC3(data.button_pressed);
    }
};
timeline.push(exampleC3);

var resultExampleC3 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleC3);

//10th example trial: case a

function chooseResultExampleA3(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag der Buchstabe "A" doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag der Buchstabe "A" doppelt vor. Der automatisierte Scanner hat mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners anzunehmen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    }

    return resMessage;
}

var exampleA3 = {
    //second example: double, automation double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> A </td><td> Q </td><td> L </td><td> J </td></tr><tr><td> F </td><td> A </td><td> P </td><td> H </td></tr><tr><td> C </td><td> S </td><td> N </td><td> Z </td></tr><tr><td> B </td><td> Y </td><td> K </td><td> G </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message"> Ein Buchstabe liegt doppelt vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleA3(data.button_pressed);
    }
};
timeline.push(exampleA3);

var resultExampleA3 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleA3);

//11th example trial: case d

function chooseResultExampleD3(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>.</p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte Abzug bedeutet.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag kein Buchstabe doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass ein Buchstabe doppelt vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>.</p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 25 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners annehmen" h&auml;tte 25 Punkte Abzug bedeutet.</p></div>';
    }

    return resMessage;
}

var exampleD3 = {
    //third example: no double, automation double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> Z </td><td> Q </td><td> S </td><td> P </td></tr><tr><td> V </td><td> U </td><td> F </td><td> K </td></tr><tr><td> N </td><td> M </td><td> C </td><td> X </td></tr><tr><td> J </td><td> G </td><td> L </td><td> B </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message"> Ein Buchstabe liegt doppelt vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleD3(data.button_pressed);
    }
};
timeline.push(exampleD3);

var resultExampleD3 = {
    type: 'instructions',
    pages: [
        'content'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleD3);

//12th example trial: case b

function chooseResultExampleB3(button) {

    var resMessage

    if (button == 0) {
        resMessage = '<div class="instruction"><p><strong style="color:red";>Falsch!</strong></p><p> In dem Bauklotzset lag der Buchstabe "D" doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    } else {
        resMessage = '<div class="instruction"><p><strong style="color:green";>Richtig!</strong></p><p> In dem Bauklotzset lag der Buchstabe "D" doppelt vor. Der automatisierte Scanner hat jedoch mitgeteilt, dass keine Dopplung vorliegt. Es war somit <strong style="color:green;">richtig, das Ergebnis des automatisierten Scanners abzulehnen</strong>. </p><p> Die <strong style="color:green;">richtige</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte gebracht.</p><p> Die <strong style="color:red;">falsche</strong> Antwort "Ergebnis des automatisierten Scanners ablehnen" h&auml;tte 100 Punkte Abzug bedeutet.</p><p>Es folgt ein weiteres Beispiel.</p></div>';
    }

    return resMessage;
}

var exampleB3 = {
    //first example: no double, automation no double
    type: 'html-button-response',
    stimulus: '<div class="matrix-trial"><table class="table"><tr><td> S </td><td> R </td><td> Z </td><td> Y </td></tr>' + '<tr><td> D </td><td> P </td><td> I </td><td> J </td></tr>' + '<tr><td> L </td><td> V </td><td> B </td><td> U </td></tr>' + '<tr><td> N </td><td> A </td><td> W </td><td> C </td></tr>' + '<tr><td> Z </td><td> G </td><td> M </td><td> X </td></tr></table></div><div class="automation"><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message">Es liegt keine Dopplung vor.</p></div>',
    //display matrix and automation answer
    choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
    //data: saved to result
    //on_finish: update score
    button_html: '<button class="jspsych-btn">%choice%</button>',
    on_finish: function (data) {
        testTrialFeedback = chooseResultExampleB3(data.button_pressed);
    }
};
timeline.push(exampleB3);

var resultExampleB3 = {
    type: 'instructions',
    pages: [
        'content',
        '<div class="instruction"><p>Nun beginnt der eigentlich Versuch. Sie untersuchen dabei mit Unterst&uuml;tzung des automatisierten Scanners 200 weitere Sets auf Dopplungen. Ihr aktueller Punktestand, der dem Unterbehmensgewinn entspricht, und die vergangene Zeit werden Ihnen nun angezeigt.</p></div>'
    ],
    show_clickable_nav: true,
    button_label_previous: 'Zur&uuml;ck',
    button_label_next: 'Weiter',
    on_start: function (trial) {
        trial.pages[0] = testTrialFeedback;
    }
};
timeline.push(resultExampleB3);


//Press button to start test

var startButton = {
    type: 'html-button-response',
    stimulus: '<p><strong>Dr&uuml;cken Sie "Start", um den Versuch zu beginnen.</strong></p>',
    choices: ['Start']
};

timeline.push(startButton);

//function to select table of 200 trials for each participant

function selectTrials() {

    var trials;

    if (cond == 1) {
        trials = stimuli_v1_85prct[Math.floor(Math.random() * stimuli_v1_85prct.length)];
    } else {
        trials = stimuli_v2_65prct[Math.floor(Math.random() * stimuli_v2_65prct.length)];
    }


    for (j = 0; j < trials.length; j++) {

        if (trials[j].length == 16) {
            trials[j].dispmessage = '<div class="matrix-trial"><table class="table"><tr><td>' + trials[j].str[0] + '</td><td>' + trials[j].str[1] + '</td><td>' + trials[j].str[2] + '</td><td>' + trials[j].str[3] + '</td></tr>' + '<tr><td>' + trials[j].str[4] + '</td><td>' + trials[j].str[5] + '</td><td>' + trials[j].str[6] + '</td><td>' + trials[j].str[7] + '</td></tr>' + '<tr><td>' + trials[j].str[8] + '</td><td>' + trials[j].str[9] + '</td><td>' + trials[j].str[10] + '</td><td>' + trials[j].str[11] + '</td></tr>' + '<tr><td>' + trials[j].str[12] + '</td><td>' + trials[j].str[13] + '</td><td>' + trials[j].str[14] + '</td><td>' + trials[j].str[15] + '</td></tr></table></div>' + '<div class="automation"><p id="timer">Zeit: insertTime min </p> <p id="score"> Punktestand: insertScore </p><p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message">' + trials[j].message + '</p></div>';

        } else if (trials[j].length == 20) {
            trials[j].dispmessage = '<div class="matrix-trial"><table class="table"><tr><td>' + trials[j].str[0] + '</td><td>' + trials[j].str[1] + '</td><td>' + trials[j].str[2] + '</td><td>' + trials[j].str[3] + '</td></tr>' + '<tr><td>' + trials[j].str[4] + '</td><td>' + trials[j].str[5] + '</td><td>' + trials[j].str[6] + '</td><td>' + trials[j].str[7] + '</td></tr>' + '<tr><td>' + trials[j].str[8] + '</td><td>' + trials[j].str[9] + '</td><td>' + trials[j].str[10] + '</td><td>' + trials[j].str[11] + '</td></tr>' + '<tr><td>' + trials[j].str[12] + '</td><td>' + trials[j].str[13] + '</td><td>' + trials[j].str[14] + '</td><td>' + trials[j].str[15] + '</td></tr>' + '<tr><td>' + trials[j].str[16] + '</td><td>' + trials[j].str[17] + '</td><td>' + trials[j].str[18] + '</td><td>' + trials[j].str[19] + '</td></tr></table></div>' + '<div class="automation"><p id="timer">Zeit: insertTime min</p><p id="score"> Punktestand: insertScore </p><p>Einsch&auml;tzung des automatisierten Scanners:</p> <p class="message">' + trials[j].message + '</p></div>';

        } else if (trials[j].length == 25) {
            trials[j].dispmessage = '<div class="matrix-trial"><table class="table"><tr><td>' + trials[j].str[0] + '</td><td>' + trials[j].str[1] + '</td><td>' + trials[j].str[2] + '</td><td>' + trials[j].str[3] + '</td><td>' + trials[j].str[4] + '</td></tr>' + '<tr><td>' + trials[j].str[5] + '</td><td>' + trials[j].str[6] + '</td><td>' + trials[j].str[7] + '</td><td>' + trials[j].str[8] + '</td><td>' + trials[j].str[9] + '</td></tr>' + '<tr><td>' + trials[j].str[10] + '</td><td>' + trials[j].str[11] + '</td><td>' + trials[j].str[12] + '</td><td>' + trials[j].str[13] + '</td><td>' + trials[j].str[14] + '</td></tr>' + '<tr><td>' + trials[j].str[15] + '</td><td>' + trials[j].str[16] + '</td><td>' + trials[j].str[17] + '</td><td>' + trials[j].str[18] + '</td><td>' + trials[j].str[19] + '</td></tr>' + '<tr><td>' + trials[j].str[20] + '</td><td>' + trials[j].str[21] + '</td><td>' + trials[j].str[22] + '</td><td>' + trials[j].str[23] + '</td><td>' + trials[j].str[24] + '</td></tr></table></div>' + '<div class="automation"><p id="timer">Zeit: insertTime min</p><p id="score"> Punktestand: insertScore </p> <p>Einsch&auml;tzung des automatisierten Scanners:</p><p class="message">' + trials[j].message + '</p></div>';
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

function feedbackScore() {

    var feedbackPrevTrial

    if (AddToScore > 0) {
        feedbackPrevTrial = '<strong><p>Richtig!<p/><p style="color:green;">' + AddToScore + ' Punkte</p></strong>';
    } else if (AddToScore < 0) {
        feedbackPrevTrial = '<strong><p>Falsch!<p/><p style="color:red;">' + Math.abs(AddToScore) + ' Punkte Abzug</p></strong>';
    } else {
        feedbackPrevTrial = '<strong>Start</strong>';
    }

    return feedbackPrevTrial;
}

var my_trials = selectTrials();

//Automation trials
var setscan_automation_procedure = {
    timeline: [
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
                data.elapsedTime = elapsedTime;
            },
            data: {
                category: jsPsych.timelineVariable('category'),
                strlength: jsPsych.timelineVariable('length'),
                scorefromtrial: 0,
                scoreaftertrial: 0,
                elapsedTime: 0
            },
            //display matrix and automation answer
            choices: ['Ergebnis des automatisierten Scanners annehmen', 'Ergebnis des automatisierten Scanners ablehnen'],
            //data: saved to result
            //on_finish: update score
            button_html: '<button class="jspsych-btn">%choice%</button>'
        },
        {
            type: 'html-keyboard-response',
            stimulus: 'Start',
            choices: jsPsych.NO_KEYS,
            trial_duration: 1500,
            on_start: function (trial) {
                trial.stimulus = feedbackScore();
            }
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

        if (scoreMinusTime <= 0) {
            trial.pages = ['<div class="instruction"><p>Sie haben in der Bauklotz-Aufgabe mit Unterst&uuml;tzung des automatischen Scanners<strong> ' + score + ' Punkte</strong> erreicht. Daf&uuml;r haben Sie<strong> ' + millisToMinutesAndSeconds(elapsedTime) + ' Minuten </strong> ben&ouml;tigt.</p><p>Somit ergibt Sich ein Gesamtscore von <strong>' + scoreMinusTime + ' Punkten</strong>.</p></div>'];
        } else {
            trial.pages = ['<div class="instruction"><p>Sie haben in der Bauklotz-Aufgabe mit Unterst&uuml;tzung des automatischen Scanners<strong> ' + score + ' Punkte</strong> erreicht. Daf&uuml;r haben Sie<strong> ' + millisToMinutesAndSeconds(elapsedTime) + ' Minuten </strong> ben&ouml;tigt.</p><p>Somit ergibt Sich ein Gesamtscore von <strong>' + scoreMinusTime + ' Punkten</strong>. Herzlichen Gl&uuml;ckwunsch!</p></div>'];
        }

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
    preamble: '<p>Bitte sch&aumltzen Sie, wie zuverl&aumlssig der automatisierte Bauklotz-Scanner festgestellt hat, ob Dopplungen in den Sets vorlagen oder nicht. Geben Sie eine Sch&aumltzung ab, in wieviel Prozent der F&aumllle der Scanner ein Set richtig eingeordnet hat.</p>',
    button_label: 'Weiter',
    questions: [
        {
            prompt: "Gesch&aumltzte Zuverl&aumlssigkeit in %:"
            }
            ],
};
timeline.push(reliabilityAsses);

//question to assess trust in system

var trustcheck = {
    type: 'survey-multi-choice',
    button_label: 'Weiter',
    preamble: '<p> Um zus&auml;tzliche Punkte zu sammeln, die Ihnen f&uuml;r den m&ouml;glichen Gutscheingewinn angerechnet werden, k&ouml;nnen Sie den automatischen Scanner 10 zus&auml;tzliche Bauklotzsets bewerten lassen. Dabei arbeitet der Scanner nun ganz eigenst&auml;ndig. Sie k&ouml;nnen sein Ergebnis nicht korrigieren. Bei richtiger Einordnung des Sets durch den Scanner gewinnen Sie wie zuvor Punkte, bei falscher Einordnung verlieren Sie wie gehabt Punkte.',
    questions: [{
        prompt: "M&ouml;chten Sie, dass der automatische Scanner weitere 10 Bauklotzsets f&uuml;r Sie bearbeitet?",
        options: ["Ja", "Nein"],
        required: true
    }]
};
timeline.push(trustcheck);

//Trust questionnaire

var likert = ["Stimme gar nicht zu", "Stimme eher nicht zu", "Stimme weder zu noch nicht zu", "Stimme eher zu", "Stimme voll zu", "keine Angabe"];

var TiA = {
    type: 'survey-likert',
    preamble: '<p>Bitte bewerten Sie die folgenden Aussagen bezogen auf den automatisierten Bauklotzscanner der Firma BrickScan, den Sie in diesem Versuch kennengelernt haben.</p>',
    button_label: 'Weiter',
    questions: [{
            prompt: "Das System ist imstande Situationen richtig einzusch&auml;tzen.",
            labels: likert,
            required: true
        },
        {
            prompt: "Mir war durchgehend klar, in welchem Zustand sich das System befindet.",
            labels: likert,
            required: true
        },
        {
            prompt: "Ich kenne bereits &auml;hnliche Systeme.",
            labels: likert,
            required: true
        },
        {
            prompt: "Die Entwickler sind vertrauensw&uuml;rdig.",
            labels: likert,
            required: true
        },
        {
            prompt: "Bei unbekannten automatisierten Systemen sollte man eher vorsichtig sein.",
            labels: likert,
            required: true
        },
        {
            prompt: "Das System arbeitet zuverl&auml;ssig.",
            labels: likert,
            required: true
        },
        {
            prompt: "Das System reagiert unvorhersehbar.",
            labels: likert,
            required: true
        },
        {
            prompt: "Die Entwickler nehmen mein Wohlergehen ernst.",
            labels: likert,
            required: true
        },
        {
            prompt: "Ich vertraue dem System.",
            labels: likert,
            required: true
        },
        {
            prompt: "Ein Ausfalls des Systems ist wahrscheinlich.",
            labels: likert,
            required: true
        },
        {
            prompt: "Ich konnte nachvollziehen, warum etwas passiert ist.",
            labels: likert,
            required: true
        },
        {
            prompt: "Ich vertraue einem System eher, als dass ich ihm misstraue.",
            labels: likert,
            required: true
        },
        {
            prompt: "Das System kann wirklich komplizierte Aufgaben &uuml;bernehmen.",
            labels: likert,
            required: true
        },
        {
            prompt: "Ich kann mich auf das System verlassen.",
            labels: likert,
            required: true
        },
        {
            prompt: "Das System k&ouml;nnte stellenweise einen Fehler machen.",
            labels: likert,
            required: true
        },
        {
            prompt: "Zu erkennen, was das System als N&auml;chstes macht, ist schwer.",
            labels: likert,
            required: true
        },
        {
            prompt: "Ich habe &auml;hnliche Systeme bereits genutzt.",
            labels: likert,
            required: true
        },
        {
            prompt: "Automatisierte Systeme funktionieren generell gut.",
            labels: likert,
            required: true
        },
        {
            prompt: "Ich bin &uuml;berzeugt von den F&auml;higkeiten des Systems.",
            labels: likert,
            required: true
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
    preamble: '<p>Bitte beurteilen Sie das Bewertungssystem der Aufgabe, die Sie mit Unterst&uuml;tzung des automatisierten Systems (&Uuml;berpr&uuml;fung der Baukl&ouml;tze) bearbeitet haben. Erscheinen Ihnen die Punktgewinne und -abz&uuml;ge f&uuml;r richtig eingeordnete Bauklotzsets und die daf&uuml;r ben&ouml;tigte Zeit angemessen?</p>',
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
            prompt: "Falls es etwas gibt, das Sie uns abschlie&szlig;end bez&uuml;glich dieser Studie wissen lassen wollen, k&ouml;nnen Sie Ihre Mitteilung hier eintragen:",
            rows: 15,
            columns: 60
            }
            ],
};
timeline.push(comments);

timeline.push({
    type: 'call-function',
    func: saveData
});

var endInfo = {
    type: 'instructions',
    pages: [
        '<div class="instruction"><strong><p>Vielen Dank f&uuml;r Ihre Teilnahme!</p><p>Ihre Daten wurden gespeichert und Sie k&ouml;nnen das Browserfenster nun schlie&szlig;en. </p></strong></div>'
    ],
    button_label_previous: 'Zur&uuml;ck'
};
timeline.push(endInfo);

//save data to database

function saveData() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_data.php'); // change 'write_data.php' to point to php script.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(xhr.responseText)
            var response = JSON.parse(xhr.responseText);
            console.log(response.success);
        }
    };
    xhr.send(jsPsych.data.get().json());
}

//Exclude browsers that are not at least 800x600 pixel
jsPsych.init({
    timeline: timeline,
    exclusions: {
        min_width: 800,
        min_height: 600
    },
    display_element: "testContent"
        /*on_finish: function () {
            //saveData
            //on_finish: function () {
            //jsPsych.data.displayData('csv'); //displays data on end screen
            //}
            console.log('Finished survey');
            jsPsych.data.displayData('csv'); //displays data on end screen
            console.log('Displayed data and am still here');
            saveData();
            console.log('I executed saveData and I am still here :)')
        }*/
});