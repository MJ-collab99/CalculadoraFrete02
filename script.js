function converterNumero(id) {
    const valor = document.getElementById(id).value.trim();

    if (valor === "") {
        return 0;
    }
    return Number(valor.replace(",", ".")); //transforma "12,5" em 12.5
}

function calcularTarifaPorKm(distancia) {
    if (distancia <= 50) {
        return 0.80;
    } else if (distancia <= 100) {
        return 1.00;
    } else if (distancia <= 200) {
        return 1.20;
    } else {
        return 0;
    }
}

function validarCampos() {
    const cliente = document.getElementById("cliente").value.trim(); //.trim retira espaços desnecessarios antes e dps da palavra
    const origem = document.getElementById("origem").value.trim();
    const destino = document.getElementById("destino").value.trim();

    if (!cliente || !origem || !destino) { // (!: negação), (||: "ou")
        return "Preencha cliente, origem e destino.";
    }

    const distancia = converterNumero("distancia");
    const quantidadeVolumes = converterNumero("quantidadeVolumes");
    const pesoReal = converterNumero("pesoReal");
    const comprimento = converterNumero("comprimento");
    const largura = converterNumero("largura");
    const altura = converterNumero("altura");
    const pedagio = converterNumero("pedagio");

    if (
        distancia <= 0 ||
        quantidadeVolumes <= 0 ||
        pesoReal <= 0 ||
        comprimento <= 0 ||
        largura <= 0 ||
        altura <= 0
    ) {
        return "Preencha corretamente distância, volumes, peso e dimensões.";
    }
    if (pedagio < 0) {
        return "O pedágio não pode ser negativo.";
    }
    if (calcularTarifaPorKm(distancia) === 0) {
        return "A tabela aceita distâncias de até 200 km.";
    }
    return "";
}

function calcularVolume() {
    const comprimento = converterNumero("comprimento");
    const largura = converterNumero("largura");
    const altura = converterNumero("altura");
    const quantidadeVolumes = converterNumero("quantidadeVolumes");

    return comprimento * largura * altura * quantidadeVolumes;
}

function calcularPesoCubado(volumeTotal) {
    return volumeTotal / 6000;
}

function calcularFrete() {
    const erro = validarCampos();

    if (erro) {
        document.getElementById("resultado").innerHTML =
            "<p style='color:red;'><strong>Erro:</strong> " + erro + "</p>";
        return;
    }

    const cliente = document.getElementById("cliente").value.trim();
    const origem = document.getElementById("origem").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const mercadoria = document.getElementById("mercadoria").value.trim();

    const distancia = converterNumero("distancia");
    const valorNota = converterNumero("valorNota");
    const pesoReal = converterNumero("pesoReal");
    const pedagio = converterNumero("pedagio");

    const tarifa = calcularTarifaPorKm(distancia);
    const volumeTotal = calcularVolume();
    const pesoCubado = calcularPesoCubado(volumeTotal);

    let pesoCobrado;
    let criterioPeso;

    if (pesoReal >= pesoCubado) {
        pesoCobrado = pesoReal;
        criterioPeso = "Peso real";
    } else {
        pesoCobrado = pesoCubado;
        criterioPeso = "Peso cubado";
    }

    let fretePeso = distancia * tarifa;
    let freteMinimoAplicado = "Não";

    if (fretePeso < 50) {
        fretePeso = 50;
        freteMinimoAplicado = "Sim";
    }

    const valorTotal = fretePeso + pedagio;

    document.getElementById("resultado").innerHTML = `
        <h2>Resumo da Cotação</h2>
        <p><strong>Cliente:</strong> ${cliente}</p>
        <p><strong>Origem:</strong> ${origem}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Mercadoria:</strong> ${mercadoria}</p>
        
        <p><strong>Valor da nota:</strong> R$ ${valorNota.toFixed(2)}</p>
        <p><strong>Distância:</strong> ${distancia.toFixed(2)} km</p>
        <p><strong>Tarifa:</strong> R$ ${tarifa.toFixed(2)} por km</p>
        <p><strong>Volume total:</strong> ${volumeTotal.toFixed(2)} cm³</p>
        <p><strong>Peso real:</strong> ${pesoReal.toFixed(2)} kg</p>
        <p><strong>Peso cubado:</strong> ${pesoCubado.toFixed(2)} kg</p>
        <p><strong>Peso utilizado:</strong> ${pesoCobrado.toFixed(2)} kg</p>
        <p><strong>Critério:</strong> ${criterioPeso}</p>
        <p><strong>Frete-peso:</strong> R$ ${fretePeso.toFixed(2)}</p>
        <p><strong>Frete mínimo aplicado:</strong> ${freteMinimoAplicado}</p>
        <p><strong>Pedágio:</strong> R$ ${pedagio.toFixed(2)}</p>
        <h3>Valor total: R$ ${valorTotal.toFixed(2)}</h3>
    `;
}

function limparDados() {
    document.getElementById("cliente").value = "";
    document.getElementById("origem").value = "";
    document.getElementById("destino").value = "";
    document.getElementById("distancia").value = "";
    document.getElementById("mercadoria").value = "";
    document.getElementById("valorNota").value = "";
    document.getElementById("quantidadeVolumes").value = "";
    document.getElementById("pesoReal").value = "";
    document.getElementById("comprimento").value = "";
    document.getElementById("largura").value = "";
    document.getElementById("altura").value = "";

    document.getElementById("pedagio").value = "0";
    document.getElementById("resultado").innerHTML = "";
}


/* NOTAS
----------------------------------

Tabela do Frete por Km
/ 0 a 50km    | 0,80/km \
/ 51 a 100km  | 1,00/km \
/ 100 a 200km | 1,20/km \

-----------------------------------

2. ...
document.querySelector(#campo)
...

3. Conversao de dados: 
const peso = Number (campoPeso.value)
parseInt()
parseFloat()

4. Funções:
calcularPesoCubado(volumeTotal) {
    return volumeTotal*300;
}

5. Estruturas condicionais:
    if (pesoReal >= pesoCubado) {
        pesoCubado = pesoReal;
    } else {
        pesoCobrança = pesoCubado;
        }
---------------------------------------

*/
