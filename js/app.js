// Dados dos livros com imagens atualizadas
const livros = [
    { 
        id: 1, 
        titulo: "Dom Casmurro", 
        autor: "Machado de Assis", 
        ano: 1899, 
        capa: 'https://m.media-amazon.com/images/I/61x1ZHomWUL._AC_UF1000,1000_QL80_.jpg'
    },
    { 
        id: 2, 
        titulo: "O Cortiço", 
        autor: "Aluísio Azevedo", 
        ano: 1890, 
        capa: 'https://m.media-amazon.com/images/I/81m1emiSp-S.jpg'
    },
    { 
        id: 3, 
        titulo: "Grande Sertão: Veredas", 
        autor: "João Guimarães Rosa", 
        ano: 1956, 
        capa: 'https://m.media-amazon.com/images/I/81NtboFZziL.jpg'
    },
    { 
        id: 4, 
        titulo: "1984", 
        autor: "George Orwell", 
        ano: 1949, 
        capa: 'https://m.media-amazon.com/images/I/91jHOlKEPwL._AC_UF1000,1000_QL80_.jpg'
    },
    { 
        id: 5, 
        titulo: "Orgulho e Preconceito", 
        autor: "Jane Austen", 
        ano: 1813, 
        capa: 'https://m.media-amazon.com/images/I/719esIW3D7L._AC_UF1000,1000_QL80_.jpg'
    },
    { 
        id: 6, 
        titulo: "Cem Anos de Solidão", 
        autor: "Gabriel García Márquez", 
        ano: 1967, 
        capa: 'https://m.media-amazon.com/images/I/816Yy5v+S5L._AC_UF1000,1000_QL80_.jpg'
    }
];

// Estado global
let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || false;
let livrosReservados = JSON.parse(localStorage.getItem('livrosReservados')) || [];
let livrosFavoritos = JSON.parse(localStorage.getItem('livrosFavoritos')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    const pagina = window.location.pathname.split('/').pop();
    
    // Verificar autenticação para páginas protegidas
    if (pagina !== 'index.html' && pagina !== 'cadastrar.html' && !usuarioLogado) {
        window.location.href = 'index.html';
        return;
    }

    // Configurar página atual
    switch(pagina) {
        case 'index.html':
            configurarLogin();
            break;
        case 'cadastrar.html':
            configurarCadastro();
            break;
        case 'catalogos.html':
            carregarCatalogo();
            break;
        case 'reservas.html':
            carregarReservas();
            break;
        case 'favoritos.html':
            carregarFavoritos();
            break;
    }
});

// Configurar login
function configurarLogin() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            usuarioLogado = true;
            localStorage.setItem('usuarioLogado', 'true');
            window.location.href = 'catalogos.html';
        });
    }
}

// Configurar cadastro
function configurarCadastro() {
    const form = document.getElementById('cadastroForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'index.html';
        });
    }
}

// Carregar catálogo
function carregarCatalogo() {
    const container = document.getElementById('livros-container');
    if (!container) return;

    container.innerHTML = '';

    livros.forEach(livro => {
        const reservado = livrosReservados.some(l => l.id === livro.id);
        const favorito = livrosFavoritos.some(l => l.id === livro.id);

        const card = document.createElement('div');
        card.className = 'livro-card';
        card.innerHTML = `
            <div class="livro-capa">
                <img src="${livro.capa}" alt="${livro.titulo}" 
                     onerror="this.style.display='none'; this.parentElement.innerHTML='📚';">
            </div>
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
            <div class="livro-actions">
                <button class="btn btn-primary" onclick="reservarLivro(${livro.id})" ${reservado ? 'disabled' : ''}>
                    ${reservado ? '✓ Reservado' : 'Reservar'}
                </button>
                <button class="btn btn-secondary" onclick="favoritarLivro(${livro.id})">
                    ${favorito ? '❤️ Favorito' : '🤍 Favoritar'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Carregar reservas
function carregarReservas() {
    const container = document.getElementById('reservas-container');
    if (!container) return;

    container.innerHTML = '';

    if (livrosReservados.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:2rem;">Nenhum livro reservado.</p>';
        return;
    }

    livrosReservados.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'livro-card';
        card.innerHTML = `
            <div class="livro-capa">
                <img src="${livro.capa}" alt="${livro.titulo}" 
                     onerror="this.style.display='none'; this.parentElement.innerHTML='📚';">
            </div>
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
            <div class="livro-actions">
                <button class="btn btn-primary" disabled>✓ Reservado</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Carregar favoritos
function carregarFavoritos() {
    const container = document.getElementById('favoritos-container');
    if (!container) return;

    container.innerHTML = '';

    if (livrosFavoritos.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:2rem;">Nenhum livro favoritado.</p>';
        return;
    }

    livrosFavoritos.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'livro-card';
        card.innerHTML = `
            <div class="livro-capa">
                <img src="${livro.capa}" alt="${livro.titulo}" 
                     onerror="this.style.display='none'; this.parentElement.innerHTML='📚';">
            </div>
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
            <div class="livro-actions">
                <button class="btn btn-secondary" onclick="favoritarLivro(${livro.id})">❤️ Remover</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Reservar livro
function reservarLivro(id) {
    const livro = livros.find(l => l.id === id);
    if (livro && !livrosReservados.some(l => l.id === id)) {
        livrosReservados.push(livro);
        localStorage.setItem('livrosReservados', JSON.stringify(livrosReservados));
        alert(`"${livro.titulo}" reservado com sucesso!`);
        window.location.reload();
    }
}

// Favoritar livro
function favoritarLivro(id) {
    const livro = livros.find(l => l.id === id);
    const jaFavoritado = livrosFavoritos.some(l => l.id === id);

    if (jaFavoritado) {
        livrosFavoritos = livrosFavoritos.filter(l => l.id !== id);
        alert(`"${livro.titulo}" removido dos favoritos!`);
    } else {
        livrosFavoritos.push(livro);
        alert(`"${livro.titulo}" adicionado aos favoritos!`);
    }

    localStorage.setItem('livrosFavoritos', JSON.stringify(livrosFavoritos));
    window.location.reload();
}

// Buscar livros
function buscarLivros() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('livros-container');
    
    if (!termo) {
        carregarCatalogo();
        return;
    }

    const livrosFiltrados = livros.filter(livro => 
        livro.titulo.toLowerCase().includes(termo) || 
        livro.autor.toLowerCase().includes(termo)
    );

    container.innerHTML = '';

    if (livrosFiltrados.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:2rem;">Nenhum livro encontrado.</p>';
        return;
    }

    livrosFiltrados.forEach(livro => {
        const reservado = livrosReservados.some(l => l.id === livro.id);
        const favorito = livrosFavoritos.some(l => l.id === livro.id);

        const card = document.createElement('div');
        card.className = 'livro-card';
        card.innerHTML = `
            <div class="livro-capa">
                <img src="${livro.capa}" alt="${livro.titulo}" 
                     onerror="this.style.display='none'; this.parentElement.innerHTML='📚';">
            </div>
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
            <div class="livro-actions">
                <button class="btn btn-primary" onclick="reservarLivro(${livro.id})" ${reservado ? 'disabled' : ''}>
                    ${reservado ? '✓ Reservado' : 'Reservar'}
                </button>
                <button class="btn btn-secondary" onclick="favoritarLivro(${livro.id})">
                    ${favorito ? '❤️ Favorito' : '🤍 Favoritar'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Sair da conta
function sair() {
    if (confirm('Deseja sair da sua conta?')) {
        usuarioLogado = false;
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    }
}