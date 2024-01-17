import { createApp } from 'https://unpkg.com/petite-vue?module';

const appQuiz = createApp({
  quizzes: [],
  showTableHeaderQuiz: false,
  showCreateQuizButton: false,
  LoadQuizButton: true,
  CloseQuizButton: false,
  showCreateQuizForm: false,
  newQuiz: {
    name: '',
    questions: [],
  },

  // Método para exibir o formulário
  displayCreateQuizForm() {
    this.showCreateQuizForm = true;
  },

  // Adiciona uma nova pergunta ao quiz
  addQuestion() {
    this.newQuiz.questions.push({
      question: '',
      options: [
        { opcion: '', correct: false },
        { opcion: '', correct: false },
        { opcion: '', correct: false },
        { opcion: '', correct: false }
      ]
    });
  },


  // Remove uma pergunta específica
  removeQuestion(qIndex) {
    this.newQuiz.questions.splice(qIndex, 1);
  },

  async closeTableQuiz() {
    this.quizzes = false;
    this.showTableHeaderQuiz = false;
    this.showCreateQuizButton = false;
    this.LoadQuizButton = true;
    this.CloseQuizButton = false;
    this.showCreateQuizForm = false;
    
  },

  async closeQuiz() {
    this.quiz = false;
    this.showQuiz = false;
  },


 //salvar
  async saveQuiz() {
  // Verificação de pelo menos uma pergunta
  if (this.newQuiz.questions.length === 0) {
    alert('O quiz deve ter pelo menos uma pergunta.');
    return;
  }

  // Verificação de quatro opções por pergunta e pelo menos uma opção correta
  for (let question of this.newQuiz.questions) {
    if (question.options.length !== 4) {
      alert('Cada pergunta deve ter quatro opções.');
      return;
    }

    // Verifica se há pelo menos uma opção correta
    const hasCorrectOption = question.options.some(option => option.correct);
    if (!hasCorrectOption) {
      alert('Cada pergunta deve ter pelo menos uma opção correta.');
      return;
    }
  }

  // Determinar se é para criar um novo quiz ou atualizar um existente
  const isNewQuiz = !this.newQuiz._id;
  const url = isNewQuiz ? "http://localhost:3000/quiz/create" : `http://localhost:3000/quiz/${this.newQuiz._id}`;
  const method = isNewQuiz ? 'POST' : 'PATCH';

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.newQuiz),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Resetar o formulário após salvar e recarregar a lista de quizzes
    this.newQuiz = { name: '', questions: [] };
    this.showCreateQuizForm = false;
    await this.fetchQuizzes();
  } catch (error) {
    console.error("Erro ao salvar o quiz:", error);
  }
},



  // Cancela a criação de um novo quiz
 async cancelCreateQuiz() {
    this.newQuiz = { name: '', questions: [] };
    this.showCreateQuizForm = false;
  },

  // Carrega os quizzes existentes
  async fetchQuizzes() {
    try {
      const url = "http://localhost:3000/quiz/";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const quizzes = await response.json();
      this.quizzes = quizzes;
      this.showTableHeaderQuiz = true;
      this.LoadQuizButton = false;
      this.CloseQuizButton = true;
      this.showCreateQuizButton = true;
    } catch (error) {
      console.error("Erro ao buscar quizzes:", error);
    }
  },

    // Função para editar quiz
    editQuiz(quizId) {
      const quizToEdit = this.quizzes.find(quiz => quiz._id === quizId);
      if (quizToEdit) {
        this.newQuiz = { ...quizToEdit };
        this.showCreateQuizForm = true;
      } else {
        console.error("Quiz não encontrado!");
      }
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