document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#monte form");
    const carrinhoDiv = document.getElementById("carrinhoCompras");

    const precos = {
        pao: { tradicional: 2, australiano: 3, brioche: 3.5, integral: 2.5 },
        carne: { bovino: 8, suina: 7.5, frango: 7, vegetariano: 6.5, duplo: 12, triplo: 15 },
        queijos: { cheddar: 2, mussarela: 1.5, prato: 1.8 },
        complementos: { bacon: 3, alface: 0.8, tomate: 1, cebola: 1 },
        molhos: { maionese: 1.5, barbecue: 1.5, picante: 1.5 }
    };

    const processarItens = grupo => {
        return Object.keys(precos[grupo])
            .map(id => {
                const checkbox = document.getElementById(id);
                const qtd = parseInt(document.getElementById(`qtd_${id}`).value) || 0;
                if (checkbox.checked && qtd > 0) {
                    const subtotal = precos[grupo][id] * qtd;
                    return {
                        nome: `${qtd}x ${id.charAt(0).toUpperCase() + id.slice(1)}`,
                        preco: subtotal
                    };
                }
                return null;
            })
            .filter(item => item !== null);
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Pão
        const pao = document.getElementById("pao").value;
        let itens = [];
        if (pao) {
            itens.push({
                nome: `Pão ${pao.charAt(0).toUpperCase() + pao.slice(1)}`,
                preco: precos.pao[pao]
            });
        }

        // Carne
        const carne = document.getElementById("carne").value;
        const qtdProteina = parseInt(document.getElementById("qtd_proteina").value) || 1;
        if (carne) {
            itens.push({
                nome: `${qtdProteina}x Carne ${carne.charAt(0).toUpperCase() + carne.slice(1)}`,
                preco: precos.carne[carne] * qtdProteina
            });
        }

        // Queijos, complementos e molhos
        ["queijos", "complementos", "molhos"].forEach(grupo => {
            itens = itens.concat(processarItens(grupo));
        });

        // Ordenar pelo preço do menor para o maior
        itens.sort((a, b) => a.preco - b.preco);

        // Calcular total com reduce
        const total = itens.reduce((acc, item) => acc + item.preco, 0);

        // Mostrar no carrinho
        carrinhoDiv.innerHTML = `
            <h3>🍔 Seu pedido:</h3>
            <ul>${itens.map(i => `<li>${i.nome} - R$ ${i.preco.toFixed(2)}</li>`).join("")}</ul>
            <h4>Total: R$ ${total.toFixed(2)}</h4>
        `;
    });
});


// Lista de lanches com nome e preço
     
const listaDeLanches = [
    { nome: "CheddarFilter", preco: 12.99 },
    { nome: "PullDom's", preco: 13.99 },
    { nome: "SortBacon", preco: 14.99 },
    { nome: "Pickle'sReduce", preco: 10.99 },
    { nome: "PushMeltDom's", preco: 39.99 },
    { nome: "BreadPush", preco: 19.99 },
    { nome: "ForEachMill", preco: 23.99 },
    { nome: "SpliceTomato", preco: 30.99 },
    { nome: "JoinOnim", preco: 34.99 }
];

const botao = document.getElementById("MenorQue20");
const divLanchesBaratos = document.getElementById("espacoLanchesBaratos");

botao.addEventListener("click", () => {
    divLanchesBaratos.innerHTML = "";

    const baratos = listaDeLanches.filter(lanche => lanche.preco < 20);

    baratos.forEach(lanche => {
        const p = document.createElement("p");
        p.textContent = `${lanche.nome} — R$ ${lanche.preco.toFixed(2)}`;
        divLanchesBaratos.appendChild(p);
    });
});
