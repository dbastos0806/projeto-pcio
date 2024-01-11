import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

// Criação da aplicação PetiteVue
const appQuiz = createApp({
    quizzes: [],
    showTableHeaderQuiz: false,
    showCreateQuizButton: false,
    LoadQuizButton: true,
    CloseQuizButton: false,
    showQuiz: false,
    quiz: {},
    selectedOptions: {},

    // Estado inicial para um novo quiz
newQuiz: {
    name: '',
    questions: [],
  },
  showCreateQuizForm: false,
  
  // Funções para o formulário de criação de quiz
  addQuestion() {
    this.newQuiz.questions.push({
      text: '',
      options: Array(4).fill({ text: '', correct: false })
    });
  },

  addOption(qIndex) {
    if (this.newQuiz.questions[qIndex].options.length < 4) {
        this.newQuiz.questions[qIndex].options.push({ text: '', correct: false });
    } else {
        alert('Máximo de 4 opções por pergunta.');
    }
},

  removeQuestion(qIndex) {
    this.newQuiz.questions.splice(qIndex, 1);
  },


  async saveQuiz() {
    try {
      const url = "http://localhost:3000/quiz/create";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newQuiz),
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      // Resetar o formulário após salvar e recarregar a lista de quizzes
      this.newQuiz = { name: '', questions: [] };
      this.showCreateQuizForm = false;
      await this.fetchQuizzes();
    } catch (error) {
      console.error("Erro ao salvar o quiz:", error);
    }
  },
  
  cancelCreateQuiz() {
    this.newQuiz = { name: '', questions: [] };
    this.showCreateQuizForm = false;
  },


    // Função assíncrona para buscar quizzes
    async fetchQuizzes() {
        try {
            const url = "http://localhost:3000/quiz/";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            // Atualiza o estado da aplicação com os quizzes e ajusta as variáveis de exibição
            this.quizzes = data;
            this.showTableHeaderQuiz = true;
            this.showCreateQuizButton = true;
            this.LoadQuizButton = false;
            this.CloseQuizButton = true;
        } catch (error) {
            console.error("Erro:", error);
            throw error;
        }
    },

    // Função para editar quiz
    async editQuiz(quizId) {
        console.log("Editar quiz com ID:", quizId);
    },
    
    // Função assíncrona para excluir quiz
    async deleteQuiz(quizId) {
        try {
            const url = `http://localhost:3000/quiz/${quizId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            // Remove o quiz da lista após a exclusão
            this.quizzes = this.quizzes.filter((quiz) => quiz._id !== quizId);

            console.log("Quiz excluído com ID:", quizId);
        } catch (error) {
            console.error("Erro:", error);
            throw error;
        }
    },

    // Função para Contar o numero de questoes de um quiz
    countQuestions(quizId) {
        console.log("Contar questões do quiz com ID:", quizId);
    },


 // Função para abrir quiz
 async openQuiz(quizId) {
    try {
        const url = `http://localhost:3000/quiz/${quizId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();

        console.log("Dados brutos da API:", data);

        if (data && data._id) {
            console.log("Quiz aberto com ID:", quizId);
            this.quiz = data;
            this.showQuiz = true;

            // Inicialize a variável selectedOptions
            this.selectedOptions = {};

            // Certifique-se de que as propriedades existam antes de acessá-las
            if (this.quiz.questions && this.quiz.questions.length > 0) {
                // Exemplo de como acessar a primeira pergunta e suas opções

const firstQuestion = this.quiz.questions[0];

console.log("Primeira pergunta:", firstQuestion);

const firstQuestionArray = this.quiz.questions[0];

if (firstQuestionArray && firstQuestionArray.length > 0) {
    const firstQuestion = firstQuestionArray[0];
    console.log("Primeira pergunta:", firstQuestion);

    if (firstQuestion && firstQuestion.question && firstQuestion.options) {
        console.log("Pergunta:", firstQuestion.question);
        console.log("Opções:", firstQuestion.options);

        if (firstQuestion._id && firstQuestion._id) {
            console.log("ID da Pergunta:", firstQuestion._id);
        } else {
            console.error("ID da Pergunta não encontrado ou inválido:", firstQuestion._id);
        }
    } else {
        console.error("Os dados da primeira pergunta não são válidos:", firstQuestion);
    }
} else {
    console.error("Array da primeira pergunta vazio ou inválido.");
}

    }}} catch (error) {
        console.error("Erro ao abrir o quiz:", error);
        throw error;
    }
}
});

// Montagem da aplicação PetiteVue
appQuiz.mount("#appQuiz");