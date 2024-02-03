new Vue({
    el: '#app',
    data: {
        nome: 'Pelos precavidos',
        slogan: 'Transformando cuidado e economia em um sorriso peludo!',
        nomeslogan: 'https://bit.ly/49mOiq7',
        orcamento: "Faça seu orçamento",
        setdata: "Data que deseja realizar atendimento",
        setcp: "Número de cães pequenos",
        setcg: "Número de cães grandes",
        fundos: [
            'https://bit.ly/ppsfundo1',
            'https://bit.ly/ppsfundo2',
            'https://bit.ly/ppsfundo3',
        ],
        fundoAtual: '',
        diaDaSemana: 0,
        qtdPequenos: null,
        qtdGrandes: null,
        melhorPetshop: null,
        precoTotal: 0,
        petlogo: null,


    },
    mounted() {
        this.atualizarFundoAleatorio();
    },
    computed: {
        estiloBackground() {
            return {
                'background-image': `url('${this.fundoAtual}')`,
                'background-size': 'cover',
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'height': '100vh',
            };
        },
        estiloBackground2() {
            return {
                'background-image': `url('${this.fundoAtual}')`,
                'background-size': 'cover',
                'background-position': 'top',
                'background-repeat': 'no-repeat',
                'height': '40vh',
            };
        },

    },
    methods: {
        atualizarFundoAleatorio() {
            const indiceAleatorio = Math.floor(Math.random() * this.fundos.length);
            this.fundoAtual = this.fundos[indiceAleatorio];
        },
        redirecionar() {
            window.location.href = 'pag2.html';
        },
        calcularMelhorPetshop: function () {
            const petshops = [
                { nome: "Meu Canino Feliz", distancia: 2, precoBasePequenos: 20, precoBaseGrandes: 40 },
                { nome: "Vai Rex", distancia: 1.7, precoBasePequenos: 15, precoBaseGrandes: 50 },
                { nome: "ChowChawgas", distancia: 0.8, precoBasePequenos: 30, precoBaseGrandes: 45 }
            ];
            const inputDiaDa = document.getElementById("diaDa");
            const diaDaSemana = new Date(inputDiaDa.value).getDay();
            let menorPrecoTotal = Infinity;
            let melhorPetshopNome = "";
            let resultados = []

            for (const petshop of petshops) {
                const precoTotal = this.calcularPrecoPetshop(petshop, this.qtdPequenos, this.qtdGrandes, diaDaSemana);
                resultados.push({
                    petshop: petshop.nome,
                    precoTotal: precoTotal,
                    distancia: petshop.distancia,
                })
            }

            let melhorPreco = Infinity;
            let melhorPetshop = null;

            for (let resultado of resultados) {
                if (resultado.precoTotal < melhorPreco || (resultado.precoTotal === melhorPreco && resultado.distancia < melhorPetshop.distancia)) {
                    melhorPreco = resultado.precoTotal;
                    melhorPetshop = resultado;
                }
            }
            this.melhorPetshop = melhorPetshop.petshop;
            this.precoTotal = melhorPetshop.precoTotal;
            if (melhorPetshop.petshop == "Meu Canino Feliz") {
                this.petlogo = "https://bit.ly/3uavxrj"
            }

            if (melhorPetshop.petshop == "Vai Rex") {
                this.petlogo = "https://bit.ly/48ZGVW2"
            }

            if (melhorPetshop.petshop == "ChowChawgas") {
                this.petlogo = "https://bit.ly/3SkbOxg"
            }



        },
        calcularPrecoPetshop(petshop, qtdPequenos, qtdGrandes, dia) {
            let precoBasePequenos = petshop.precoBasePequenos;
            let precoBaseGrandes = petshop.precoBaseGrandes;

            if (dia == 5 || dia == 6) {
                if (petshop.nome == "Meu Canino Feliz") {
                    precoBasePequenos *= 1.2;
                    precoBaseGrandes *= 1.2;
                }
                if (petshop.nome == "Vai Rex") {
                    precoBasePequenos += 20;
                    precoBaseGrandes += 55;
                }
            }

            const precoTotalPequenos = qtdPequenos * precoBasePequenos;
            const precoTotalGrandes = qtdGrandes * precoBaseGrandes;
            const precoTotal = precoTotalPequenos + precoTotalGrandes;

            return precoTotal;
        },
    },
});