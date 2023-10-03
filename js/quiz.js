export class Quiz {
    constructor(question, amount) {
        this.question = question;
        this.amount = amount;
        this.currentQuestionElement = document.getElementById("current");
        this.questionElement = document.getElementById("question");
        this.totalAmountElement = document.getElementById("totalAmount");
        this.rowAnswerElement = document.getElementById("rowAnswer");
        this.checkedElement = document.getElementsByName("answer");
        this.nextBtn = document.getElementById("next");
        this.tryBtn = document.getElementById("tryBtn");
        this.scoreElement = document.getElementById("score");
        this.score = 0;
        this.isCorrect = false;
        this.currentQuestion = 0;
        this.nextBtn.addEventListener("click", this.nextQuestion.bind(this));
        this.tryBtn.addEventListener("click", this.tryAgain.bind(this));
        this.showQuestion();
    }

    showQuestion() {
        this.questionElement.innerHTML =
            this.question[this.currentQuestion].question;
        this.currentQuestionElement.innerHTML = this.currentQuestion + 1;
        this.totalAmountElement.innerHTML = this.amount;
        let answers = this.getAnswer(this.question[this.currentQuestion]);
        this.showAnswer(answers);
    }
    nextQuestion() {
        let checkedAmswer = [...this.checkedElement].filter((el) => el.checked);
        if (checkedAmswer.length == 0) {
            $(".alert").fadeIn(500);
        } else {
            this.isCorrect = this.checkAnswers(checkedAmswer[0].value);
            this.isCorrect ?
                $("#Correct").fadeIn(500, () => {
                    this.show();
                }) :
                $("#inCorrect").fadeIn(500, () => {
                    this.show();
                });
            $(".alert").fadeOut(500);
        }
    }
    show() {
        $("#Correct").fadeOut(0);
        $("#inCorrect").fadeOut(0);
        this.currentQuestion++;
        this.currentQuestion < this.amount ?
            this.showQuestion() :
            this.finishQuiz();
    }
    getAnswer(currentQuestion) {
        const answers = [
            currentQuestion.correct_answer,
            ...currentQuestion.incorrect_answers,
        ];
        // console.log("answers", answers);
        let ranNums = [],
            i = answers.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(answers[j]);
            answers.splice(j, 1);
        }
        // console.log("ranNums", ranNums);
        return ranNums;
    }

    showAnswer(answersArr) {
        let temp = " ";
        for (let i = 0; i < answersArr.length; i++) {
            temp += `<div class="form-check">
                            <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="answer" id="q{i}" value="${answersArr[i]}">
                          ${answersArr[i]}
                        </label>
                    </div>`;
        }
        this.rowAnswerElement.innerHTML = temp;
    }
    checkAnswers(checkedAnswer) {
        let correct;
        if (this.question[this.currentQuestion].correct_answer == checkedAnswer) {
            correct = true;
            this.score++;
        } else {
            correct = false;
        }
        return correct;
    }
    finishQuiz() {
        this.scoreElement.innerHTML = this.score;
        $("#quiz").fadeOut(500, () => {
            $("#finish").fadeIn(500);
        });
    }
    tryAgain() {
        $("#finish").fadeOut(500, () => {
            $("#setting").fadeIn(500);
        });
    }
}