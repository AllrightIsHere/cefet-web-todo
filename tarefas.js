const CATEGORIAS = Object.freeze({
    LAZER = 'lazer',
    COMPRAS = 'compras',
    ESTUDOS = 'estudos'
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
}

const tarefas = [
    new Tarefa('Comprar leite', CATEGORIAS.COMPRAS, false),
    new Tarefa('Escutar chimbinha', CATEGORIAS.LAZER, true)
];