// Dados dos livros
const livros = {
  literaturaBrasileira: [
    {
      id: 1,
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      ano: 1899,
      capa: "./public/dom.jpg",
      descricao: "Um clássico da literatura brasileira sobre ciúme e amor",
      reservado: false,
      favorito: false
    },
    {
      id: 2,
      titulo: "O Cortiço",
      autor: "Aluísio Azevedo",
      ano: 1890,
      capa: "./public/cortiço.jpg",
      descricao: "Romance naturalista sobre a vida em um cortiço carioca",
      reservado: false,
      favorito: false
    },
    {
      id: 3,
      titulo: "Grande Sertão: Veredas",
      autor: "João Guimarães Rosa",
      ano: 1956,
      capa: "./public/grandesertao.jpg",
      descricao: "Uma das obras mais importantes da literatura brasileira",
      reservado: true,
      favorito: false
    },
    {
      id: 4,
      titulo: "O Alienista",
      autor: "Machado de Assis",
      ano: 1882,
      capa: "./public/alienista.jpg",
      descricao: "Conto sobre ciência, loucura e poder",
      reservado: false,
      favorito: true
    }
  ],
  literaturaInternacional: [
    {
      id: 5,
      titulo: "1984",
      autor: "George Orwell",
      ano: 1949,
      capa: "./public/george.jpg",
      descricao: "Distopia clássica sobre totalitarismo e controle",
      reservado: false,
      favorito: false
    },
    {
      id: 6,
      titulo: "Orgulho e Preconceito",
      autor: "Jane Austen",
      ano: 1813,
      capa: "./public/orgulho.jpg",
      descricao: "Romance clássico sobre amor e sociedade",
      reservado: false,
      favorito: true
    },
    {
      id: 7,
      titulo: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      ano: 1943,
      capa: "./public/principe.jpg",
      descricao: "Fábula poética sobre amizade e humanidade",
      reservado: false,
      favorito: false
    },
    {
      id: 8,
      titulo: "Cem Anos de Solidão",
      autor: "Gabriel García Márquez",
      ano: 1967,
      capa: "./public/solidao.jpg",
      descricao: "Realismo mágico na saga da família Buendía",
      reservado: true,
      favorito: false
    }
  ],
  livrosAcademicos: [
    {
      id: 9,
      titulo: "Introdução à Filosofia",
      autor: "Marilena Chaui",
      ano: 1994,
      capa: "./public/filosofia.jpg",
      descricao: "Manual introdutório aos principais temas filosóficos",
      reservado: false,
      favorito: false
    },
    {
      id: 10,
      titulo: "Sociologia Geral",
      autor: "Evaldo Amaro Vieira",
      ano: 2008,
      capa: "./public/sociologia.jpg",
      descricao: "Panorama das teorias e conceitos sociológicos",
      reservado: false,
      favorito: false
    },
    {
      id: 11,
      titulo: "História do Brasil",
      autor: "Boris Fausto",
      ano: 1994,
      capa: "./public/historia.jpg",
      descricao: "Análise da formação histórica do Brasil",
      reservado: true,
      favorito: false
    },
    {
      id: 12,
      titulo: "Psicologia Social",
      autor: "Aroldo Rodrigues",
      ano: 2009,
      capa: "./public/psicologia.jpg",
      descricao: "Fundamentos da psicologia social contemporânea",
      reservado: false,
      favorito: true
    }
  ]
};

// Estado da aplicação
let estadoApp = {
  usuarioLogado: false,
  livrosReservados: [],
  livrosFavoritos: [],
  filtroAtual: 'todos'
};

// Elementos da página
const loginBtn = document.getElementById('loginBtn');
const modalLogin = document.getElementById('modalLogin');
const modalCadastro = document.getElementById('modalCadastro');
const formLogin = document.getElementById('formLogin');
const formCadastro = document.getElementById('formCadastro');
const campoBusca = document.getElementById('campoBusca');

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
  carregarLivros();
  inicializarNavegacao();
  console.log('BIBLIOTEC - Sistema carregado com sucesso!');
});

// Inicializar navegação
function inicializarNavegacao() {
  const linksNavegacao = document.querySelectorAll('.navegacao a');
  
  linksNavegacao.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remover classe ativo de todos os links
      linksNavegacao.forEach(l => l.classList.remove('ativo'));
      
      // Adicionar classe ativo ao link clicado
      this.classList.add('ativo');
      
      // Navegar para a seção correspondente
      const textoLink = this.textContent.toLowerCase();
      navegarParaSecao(textoLink);
    });
  });
}

// Navegação entre seções
function navegarParaSecao(secao) {
  switch(secao) {
    case 'início':
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'catálogo':
      document.querySelector('.container-livros').scrollIntoView({ behavior: 'smooth' });
      break;
    case 'reservas':
      mostrarReservas();
      break;
    case 'favoritos':
      mostrarFavoritos();
      break;
  }
}

// Carregar livros nas seções
function carregarLivros() {
  carregarSecaoLivros('literaturaBrasileira');
  carregarSecaoLivros('literaturaInternacional');
  carregarSecaoLivros('livrosAcademicos');
}

function carregarSecaoLivros(categoria) {
  const secao = document.getElementById(categoria);
  if (!secao) return;
  
  secao.innerHTML = '';
  
  livros[categoria].forEach(livro => {
    secao.appendChild(criarCardLivro(livro));
  });
}

// Criar card de livro
function criarCardLivro(livro) {
  const card = document.createElement('div');
  card.className = 'container-produto';
  card.dataset.id = livro.id;
  
  card.innerHTML = `
    <img src="${livro.capa}" alt="${livro.titulo}" onerror="this.src='https://via.placeholder.com/200x300/2c3e50/ffffff?text=Livro'">
    <h4>${livro.titulo}</h4>
    <p><strong>${livro.autor}</strong> (${livro.ano})</p>
    <p class="descricao-livro">${livro.descricao}</p>
    <button class="btn-reservar" onclick="reservarLivro(${livro.id})" ${livro.reservado ? 'disabled' : ''}>
      ${livro.reservado ? '✓ Reservado' : '📖 Reservar'}
    </button>
    <button class="btn-favorito" onclick="favoritarLivro(${livro.id})">
      ${livro.favorito ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
    </button>
  `;
  
  return card;
}

// Reservar livro
function reservarLivro(id) {
  if (!estadoApp.usuarioLogado) {
    alert('Por favor, faça login para reservar livros.');
    abrirModalLogin();
    return;
  }
  
  const livro = encontrarLivroPorId(id);
  if (livro && !livro.reservado) {
    livro.reservado = true;
    estadoApp.livrosReservados.push(livro);
    carregarLivros();
    
    // Feedback visual
    mostrarNotificacao(`"${livro.titulo}" reservado com sucesso!`, 'success');
  }
}

// Favoritar livro
function favoritarLivro(id) {
  if (!estadoApp.usuarioLogado) {
    alert('Por favor, faça login para favoritar livros.');
    abrirModalLogin();
    return;
  }
  
  const livro = encontrarLivroPorId(id);
  if (livro) {
    livro.favorito = !livro.favorito;
    
    if (livro.favorito) {
      estadoApp.livrosFavoritos.push(livro);
      mostrarNotificacao(`"${livro.titulo}" adicionado aos favoritos!`, 'success');
    } else {
      estadoApp.livrosFavoritos = estadoApp.livrosFavoritos.filter(l => l.id !== id);
      mostrarNotificacao(`"${livro.titulo}" removido dos favoritos!`, 'info');
    }
    
    carregarLivros();
  }
}

// Encontrar livro por ID
function encontrarLivroPorId(id) {
  for (const categoria in livros) {
    const livro = livros[categoria].find(l => l.id === id);
    if (livro) return livro;
  }
  return null;
}

// Buscar livros
function buscarLivros() {
  const termo = campoBusca.value.toLowerCase().trim();
  
  if (termo === '') {
    carregarLivros();
    return;
  }
  
  // Limpar e mostrar resultados
  const secoes = ['literaturaBrasileira', 'literaturaInternacional', 'livrosAcademicos'];
  let encontrouResultados = false;
  
  secoes.forEach(secaoId => {
    const secao = document.getElementById(secaoId);
    secao.innerHTML = '';
    
    const livrosEncontrados = livros[secaoId.replace('literatura', 'literatura').replace('Academicos', 'Academicos')]
      .filter(livro => 
        livro.titulo.toLowerCase().includes(termo) || 
        livro.autor.toLowerCase().includes(termo) ||
        livro.descricao.toLowerCase().includes(termo)
      );
    
    if (livrosEncontrados.length > 0) {
      encontrouResultados = true;
      livrosEncontrados.forEach(livro => {
        secao.appendChild(criarCardLivro(livro));
      });
    }
  });
  
  if (!encontrouResultados) {
    document.getElementById('literaturaBrasileira').innerHTML = 
      '<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">Nenhum livro encontrado para "' + termo + '".</p>';
  }
  
  mostrarNotificacao(`Busca realizada: ${termo}`, 'info');
}

// Mostrar reservas
function mostrarReservas() {
  if (!estadoApp.usuarioLogado) {
    alert('Por favor, faça login para ver suas reservas.');
    abrirModalLogin();
    return;
  }
  
  const livrosReservados = estadoApp.livrosReservados;
  if (livrosReservados.length === 0) {
    alert('Você não tem livros reservados.');
    return;
  }
  
  // Criar modal de reservas
  const modalReservas = criarModalPersonalizado('Meus Livros Reservados', livrosReservados);
  document.body.appendChild(modalReservas);
}

// Mostrar favoritos
function mostrarFavoritos() {
  if (!estadoApp.usuarioLogado) {
    alert('Por favor, faça login para ver seus favoritos.');
    abrirModalLogin();
    return;
  }
  
  const livrosFavoritos = estadoApp.livrosFavoritos;
  if (livrosFavoritos.length === 0) {
    alert('Você não tem livros favoritos.');
    return;
  }
  
  // Criar modal de favoritos
  const modalFavoritos = criarModalPersonalizado('Meus Livros Favoritos', livrosFavoritos);
  document.body.appendChild(modalFavoritos);
}

// Criar modal personalizado
function criarModalPersonalizado(titulo, listaLivros) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  
  modal.innerHTML = `
    <div class="modal-conteudo" style="max-width: 600px;">
      <span class="fechar-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>${titulo}</h2>
      <div class="lista-livros-modal">
        ${listaLivros.map(livro => `
          <div class="item-livro-modal">
            <img src="${livro.capa}" alt="${livro.titulo}" onerror="this.src='https://via.placeholder.com/80x120/2c3e50/ffffff?text=Livro'">
            <div class="info-livro-modal">
              <h4>${livro.titulo}</h4>
              <p><strong>${livro.autor}</strong> (${livro.ano})</p>
              <p>${livro.descricao}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Fechar modal ao clicar fora
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  return modal;
}

// Notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
  const notification = document.createElement('div');
  notification.className = `notificacao notificacao-${tipo}`;
  notification.textContent = mensagem;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${tipo === 'success' ? '#27ae60' : '#3498db'};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 10000;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Serviços e Eventos
function solicitarServico(servico) {
  if (!estadoApp.usuarioLogado) {
    alert('Por favor, faça login para solicitar serviços.');
    abrirModalLogin();
    return;
  }
  mostrarNotificacao(`Serviço "${servico}" solicitado com sucesso!`, 'success');
}

function inscreverEvento(evento) {
  if (!estadoApp.usuarioLogado) {
    alert('Por favor, faça login para se inscrever em eventos.');
    abrirModalLogin();
    return;
  }
  mostrarNotificacao(`Inscrição no evento "${evento}" realizada!`, 'success');
}

// Funções para modais
loginBtn.addEventListener('click', abrirModalLogin);

function abrirModalLogin() {
  modalLogin.style.display = 'flex';
}

function fecharModal(idModal) {
  document.getElementById(idModal).style.display = 'none';
}

function abrirCadastro() {
  modalLogin.style.display = 'none';
  modalCadastro.style.display = 'flex';
}

function abrirLogin() {
  modalCadastro.style.display = 'none';
  modalLogin.style.display = 'flex';
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
  if (event.target === modalLogin) {
    modalLogin.style.display = 'none';
  }
  if (event.target === modalCadastro) {
    modalCadastro.style.display = 'none';
  }
});

// Enviar formulários
formLogin.addEventListener('submit', function(event) {
  event.preventDefault();
  estadoApp.usuarioLogado = true;
  mostrarNotificacao('Login realizado com sucesso!', 'success');
  modalLogin.style.display = 'none';
  
  // Atualizar interface
  loginBtn.textContent = 'Minha Conta';
});

formCadastro.addEventListener('submit', function(event) {
  event.preventDefault();
  estadoApp.usuarioLogado = true;
  mostrarNotificacao('Cadastro realizado com sucesso!', 'success');
  modalCadastro.style.display = 'none';
  
  // Atualizar interface
  loginBtn.textContent = 'Minha Conta';
});

// Permitir busca com Enter
campoBusca.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    buscarLivros();
  }
});

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .lista-livros-modal {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .item-livro-modal {
    display: flex;
    align-items: center;
    padding: 15px;
    background: rgba(255,255,255,0.1);
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .item-livro-modal img {
    width: 60px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 15px;
  }
  
  .info-livro-modal h4 {
    margin-bottom: 5px;
    color: white;
  }
  
  .info-livro-modal p {
    margin-bottom: 3px;
    font-size: 14px;
    color: rgba(255,255,255,0.8);
  }
  
  .descricao-livro {
    font-size: 14px;
    color: #7f8c8d;
    height: 40px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
document.head.appendChild(style);