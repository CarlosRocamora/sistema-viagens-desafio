import { expect, Page } from "@playwright/test"

export class RelatoriosPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async validarTotalDeViagens() {
        const linhasTabela = this.page.locator('table.table tbody tr')
        const quantidadeLinhas = await linhasTabela.count()

        const totalViagensCard = this.page
            .locator('.stat-card')
            .filter({ hasText: 'Total de Viagens' })
            .locator('.value')

        const valorCardTexto = await totalViagensCard.textContent()
        const valorCardNumero = Number(valorCardTexto?.trim())

        await expect(totalViagensCard).toBeVisible()
        expect(valorCardNumero).toBe(quantidadeLinhas)
    }

    async validarReceitaTotal() {
        // Captura todos os valores da coluna "Valor"
        // E retorna um array de strings, uma para cada linha
        const valores = await this.page
            .locator('table.table tbody tr td:nth-child(4)')
            .allTextContents()

        let soma = 0;

        for (const valor of valores) {

            /**
             * Conversão do valor para número:
             * 
             * 1. Remove "R$"
             * 2. Remove separador de milhar "."
             * 3. Substitui vírgula por ponto 
             * 4. Remove espaços
             *
             * Resultado final: "2470.00" → Number(2470)
             */
            const numero = Number(
                valor
                    .replace('R$', '')
                    .replace(/\./g, '') // remove separador de milhar
                    .replace(',', '.') // converte vírgula decimal para ponto
                    .replace(/\s/g, '')
            );

            soma += numero
        }

        // Localiza o card "Receita Total" pelo texto
        const textoCard = await this.page
            .locator('.card')
            .filter({ hasText: 'Receita Total' })
            .locator('div')
            .first()
            .textContent()

        const valorFormatado = textoCard?.trim() ?? ''

        /**
         * Validação de FORMATO BR
         *
         * Regex garante que o valor esteja no padrão brasileiro:
         * - Começa com "R$ "
         * - Pode ter separador de milhar (.)
         * - Decimal com vírgula
         * - Sempre 2 casas decimais
         *
         * Exemplos válidos:
         * R$ 850,00
         * R$ 2.470,00
         */
        const regexBR = /^R\$ \d{1,3}(\.\d{3})*,\d{2}$/
        expect(valorFormatado).toMatch(regexBR)

        /**
         * Validação do VALOR NUMÉRICO
         *
         * Converte novamente o valor do card para número
         * aplicando o mesmo tratamento feito na tabela,
         * garantindo consistência na comparação.
         */
        const valorNumerico = Number(
            valorFormatado
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .replace(/\s/g, '')
        );

        // Compara a soma calculada com o valor exibido no card
        expect(valorNumerico).toBe(soma)
    }

    async validarTaxaDeSucesso() {
        // Pega todas as linhas da tabela "Últimas Viagens"
        const linhas = this.page.locator('table.table tbody tr')
        const total = await linhas.count()

        // Se não existir nenhuma viagem, a taxa correta deve ser 0.0%
        // (evita divisão por zero)
        let taxaEsperada = 0

        if (total > 0) {
            // Conta quantas viagens estão com status "Concluído" (coluna Status)
            const concluidas = await linhas
                .locator('td:nth-child(5) span') // coluna 5 = Status
                .filter({ hasText: 'Concluído' })
                .count()

            taxaEsperada = (concluidas / total) * 100
        }

        // Formata exatamente como o card exibe: 1 casa decimal + "%"
        const taxaEsperadaFormatada = `${taxaEsperada.toFixed(1)}%`

        // Localiza o card "Taxa de Sucesso" e captura o valor exibido (ex: "33.3%")
        const taxaSucessoCard = this.page
            .locator('.card')
            .filter({ hasText: 'Taxa de Sucesso' })
            .locator('div')
            .first();

        await expect(taxaSucessoCard).toBeVisible()

        const textoCard = (await taxaSucessoCard.textContent())?.trim() ?? ''

        // Valida que o valor exibido bate com o cálculo correto (concluídas / total)
        expect(textoCard).toBe(taxaEsperadaFormatada)
    }
}