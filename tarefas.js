const CATEGORIAS = Object.freeze({
    lazer: 'lazer',
    compras: 'compras',
    estudos: 'estudos'
});

class Tarefa {
    #nome;
    #categoria;
    #realizada;

    constructor(nome, categoria, realizada = false) {
        this.#nome = nome;
        this.#categoria = categoria;
        this.#realizada = realizada;
    }

    get nome() {
        return this.#nome;
    }

    get categoria() {
        return this.#categoria;
    }

    get realizada() {
        return this.#realizada;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    set categoria(categoria) {
        this.#categoria = categoria;
    }

    set realizada(realizada) {
        this.#realizada = realizada;
    }

    adicionaNaPagina(containerEl) {
        const novoItem = document.createElement('li');
        novoItem.innerHTML = this.#nome;
        novoItem.classList.add("item-tarefa", `categoria-${this.#categoria}`);
        if (this.#realizada) {
            novoItem.classList.add('marcado');
        }

        novoItem.addEventListener('click', (e) => {
            const el = e.currentTarget;
            const nome = el.innerHTML;
            const categoria = Array.from(el.classList).find(cls => cls.startsWith('categoria-')).slice(10);
            const realizada = el.classList.toggle('marcado');
            const index = tarefas.findIndex(tarefa => tarefa.nome === nome && tarefa.categoria === categoria && tarefa.realizada === !realizada);

            tarefas[index].realizada = realizada;
        });

        containerEl.appendChild(novoItem);
    }

    static insereTarefasNaPagina(containerEl, tarefas) {
        containerEl.innerHTML = '';
        tarefas.forEach(tarefa => tarefa.adicionaNaPagina(containerEl));
    }
}

const tarefas = [
    new Tarefa('Comprar leite', CATEGORIAS.compras, false),
    new Tarefa('Escutar chimbinha', CATEGORIAS.lazer, true)
];

const listaTarefasEl = document.querySelector('#lista-tarefas');
Tarefa.insereTarefasNaPagina(listaTarefasEl, tarefas);

// exercício 2
const btnNovaTarefaEl = document.querySelector('#incluir-nova-tarefa');
const inputNome = document.querySelector('#nova-tarefa-nome');
const inputCategoria = document.querySelector('#nova-tarefa-categoria');

const adicionaTarefa = (e) => {
    if (!inputNome.value) {
        inputNome.focus();
        return;
    }

    const novaTarefa = new Tarefa(inputNome.value, CATEGORIAS[inputCategoria.value]);

    tarefas.push(novaTarefa);

    novaTarefa.adicionaNaPagina(listaTarefasEl);

    inputNome.value = '';
    inputNome.focus();
}

btnNovaTarefaEl.addEventListener('click', adicionaTarefa);

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

// exercício 4
inputNome.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        adicionaTarefa(e);
    }
});