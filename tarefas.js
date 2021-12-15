const CATEGORIAS = Object.freeze({
    LAZER: 'lazer',
    COMPRAS: 'compras',
    ESTUDOS: 'estudos'
});

class Tarefa {
    #nome;
    #categoria;
    #realizada;

    constructor(nome, categoria, realizada) {
        this.#nome = nome;
        this.#categoria = categoria;
        this.#realizada = realizada;
    }

    adicionaNaPagina(containerEl) {
        const template = `
        <li class="item-tarefa ${this.#realizada ? 'marcado' : ''} categoria-${this.#categoria}">${this.#nome}</li>
        `;

        containerEl.innerHTML += template;
    }

    static insereTarefasNaPagina(containerEl, tarefas) {
        containerEl.innerHTML = '';
        tarefas.forEach(tarefa => tarefa.adicionaNaPagina(containerEl));
    }
}

const tarefas = [
    new Tarefa('Comprar leite', CATEGORIAS.COMPRAS, false),
    new Tarefa('Escutar chimbinha', CATEGORIAS.LAZER, true)
];

const listaTarefasEl = document.querySelector('#lista-tarefas');
Tarefa.insereTarefasNaPagina(listaTarefasEl, tarefas);

// exercício 2
const btnNovaTarefaEl = document.querySelector('#incluir-nova-tarefa');

btnNovaTarefaEl.addEventListener('click', (e) => {
    const inputNome = document.querySelector('#nova-tarefa-nome');
    const inputCategoria = document.querySelector('#nova-tarefa-categoria');

    if (!inputNome.value) return;

    const novaTarefa = new Tarefa(inputNome.value, inputCategoria.value);

    tarefas.push(novaTarefa);

    novaTarefa.adicionaNaPagina(listaTarefasEl);

    inputNome.value = '';
    inputNome.focus();
});

// exercício 3
const filtroEl = document.querySelector('#filtro-de-categoria');

filtroEl.addEventListener('change', (e) => {
    const filtro = e.currentTarget.value;

    const tarefasNodeEl = document.querySelectorAll('#lista-tarefas > li');

    tarefasNodeEl.forEach(tarefaEl => tarefaEl.classList.remove('retido-no-filtro'));

    if (!filtro) return;

    const tarefasFiltradas = Array.from(tarefasNodeEl).filter(tarefaEl => !tarefaEl.classList.contains(`categoria-${filtro}`))
    tarefasFiltradas.forEach(tarefaEl => tarefaEl.classList.add('retido-no-filtro'));
});