const form = document.querySelector("#survey-form");
const resultsDiv = document.querySelector("#results");

//Question and answer object array
const questions = [
    {
        question: "What is your favorite color?",
        answers: [
            { text: "Red", value: "red" },
            { text: "Green", value: "green" },
            { text: "Blue", value: "blue" }
        ]
    },
    {
        question: "What is your favorite food?",
        answers: [
            { text: "Pizza", value: "pizza" },
            { text: "Sushi", value: "sushi" },
            { text: "Steak", value: "steak" }
        ]
    },
    {
        question: "What is your favorite pet?",
        answers: [
            { text: "Dog", value: "dog" },
            { text: "Cat", value: "cat" },
            { text: "Bird", value: "bird" }
        ]
    }
];
let answersArray = [];
let responseFrequency = [];

const renderForm = () =>
{
    form.innerHTML += `<h2 class="is-size-3 my-5">Survey Questions:</h2>`;
    questions.forEach((question) =>
    {
        form.innerHTML += `<h3 class="is-size-5 my-4">${question.question}</h3>`;
        question.answers.forEach((answer) =>
        {
            form.innerHTML += `
          <input class="radio" type="radio" id="${answer.value}" name="${question.question}" value="${answer.value}">
          <label class="radio" for="${answer.value}">${answer.text}</label><br>
        `;
        });
    });
    form.innerHTML += `<button class="button is-medium my-6" type="submit">Submit</button>`;
};

renderForm(); //End of form render

form.addEventListener("submit", (event) =>
{
    event.preventDefault();
    const name = form.elements.name.value;
    let answers = [];
    let responses = [];

    questions.forEach((question) =>
    {
        const selectedOption = form.elements[question.question].value;
        answers.push({ [question.question]: selectedOption });
        responses.push(selectedOption);
    });

    responseFrequency.push(responses);
    // console.log(responseFrequency);

    answersArray.push({ name, answers });

    let result = "";
    result += `<p class="is-size-3 my-4">All Responses and report:</p>`;
    result += `<ul>`;
    answersArray.forEach((person) =>
    {
        result += `<li class="is-size-6 mb-2 mt-5">${person.name} responses were:</li>`;
        person.answers.forEach((answer) =>
        {
            for (const question in answer) {
                result += `<ul class="is-size-6 ml-6">
                <li>For the question: ${question} the response was: ${answer[question]}</li>
                </ul>`;
            }
        });
    });

    result += `</ul>`;

    resultsDiv.innerHTML = result;

    //Finding the frequency of responses

    let mostFrequent = [];
    for (let i = 0; i < 3; i++) {
        let frequency = responseFrequency.reduce((acc, response) =>
        {
            let item = response[i];
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

        mostFrequent[i] = Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
    }

    let report = document.getElementById("report");

    let count = responseFrequency.length;


    report.innerHTML = `Most favorite color: ${mostFrequent[0]}<br>Most favorite food: ${mostFrequent[1]}<br>Most favorite pet: ${mostFrequent[2]}<br><br> ${count} person did the survey.`;



    form.reset();
});