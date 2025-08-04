document.addEventListener("DOMContentLoaded", () => {
    const chatbotContainer = document.querySelector(".chatbot-container");
    const anoSelect = document.getElementById("ano-select");
    const pageTitle = document.getElementById("page-title");
    const pageSubTitle = document.getElementById("page-sub-title");
    const footerYear = document.getElementById("footer-year");

    let allData; 

    // Função para carregar e exibir os chatbots
    const loadChatbots = (ano) => {
        const anoData = allData[ano];
        if (!anoData) return;

        // Limpa o container de chatbots
        chatbotContainer.innerHTML = '';

        // Atualiza o título da página
        pageTitle.textContent = `Apresentando a Vitrine dos Chatbots 🤖💬`;

        // Atualiza o subtítulo da página
        pageSubTitle.textContent = `Turma ${anoData.turma}!`;
        
        // Adiciona os cards dos chatbots
        anoData.chatbots.forEach(chatbot => {
            const card = document.createElement("div");
            card.classList.add("chatbot-card");
            card.innerHTML = `
                <h2>${chatbot.nome}</h2>
                <p>${chatbot.descricao}</p>
                <a href="${chatbot.link}" target="_blank">Acessar Chatbot</a>
            `;
            chatbotContainer.appendChild(card);
        });
    };

    // Carrega os dados do JSON
    fetch('chatbots.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            const anos = Object.keys(allData).sort((a, b) => b - a); // Ordena os anos em ordem decrescente

            // Popula o seletor de ano
            anos.forEach(ano => {
                const option = document.createElement("option");
                option.value = ano;
                option.textContent = ano;
                anoSelect.appendChild(option);
            });

            // Define o ano mais recente como padrão
            const anoMaisRecente = anos[0];
            anoSelect.value = anoMaisRecente;
            footerYear.textContent = `© ${anoMaisRecente} - Vitrine de Chatbots`;

            // Carrega os chatbots do ano mais recente
            loadChatbots(anoMaisRecente);

            // Adiciona o listener para a mudança de ano
            anoSelect.addEventListener("change", (event) => {
                const anoSelecionado = event.target.value;
                footerYear.textContent = `© ${anoSelecionado} - Vitrine de Chatbots`;
                loadChatbots(anoSelecionado);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos chatbots:', error);
            chatbotContainer.innerHTML = '<p style="text-align: center; color: red;">Não foi possível carregar os dados dos chatbots.</p>';
        });
});