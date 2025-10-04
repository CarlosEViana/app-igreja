// Este evento garante que o nosso código só vai rodar depois
// que toda a página HTML foi completamente carregada pelo navegador.
document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // BANCO DE DADOS E CONFIGURAÇÕES DE PAGINAÇÃO
    // =============================================
    const ITEMS_PER_PAGE = 4;
    let paginationState = {
        devocionais: { currentPage: 1 },
        eventos: { currentPage: 1 },
        videos: { currentPage: 1 },
    };

    let devocionais = [
        { id: 8, titulo: 'A Força que Vem do Alto', texto: '"Tudo posso naquele que me fortalece." - Filipenses 4:13. Lembre-se que sua força para enfrentar os desafios diários não vem de si mesmo, mas de Deus.', data: '2025-10-08T10:00:00Z' },
        { id: 7, titulo: 'Alegria na Tribulação', texto: 'Meus irmãos, considerem motivo de grande alegria o fato de passarem por diversas provações, pois vocês sabem que a prova da sua fé produz perseverança. - Tiago 1:2-3', data: '2025-10-07T10:00:00Z' },
        { id: 6, titulo: 'Luz para o Mundo', texto: 'Vocês são a luz do mundo. Não se pode esconder uma cidade construída sobre um monte. Deixe sua luz brilhar para que todos vejam as boas obras e glorifiquem ao Pai.', data: '2025-10-06T10:00:00Z' },
        { id: 5, titulo: 'Descanso para a Alma', texto: '"Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso." - Mateus 11:28. Entregue suas preocupações ao Senhor e encontre paz.', data: '2025-10-05T10:00:00Z' },
        { id: 4, titulo: 'A Graça do Perdão', texto: 'Assim como fomos perdoados por Deus de uma dívida impagável, devemos estender o perdão àqueles que nos ofenderam. O perdão liberta primeiro a quem perdoa.', data: '2025-10-04T10:00:00Z' },
        { id: 3, titulo: 'Sementes da Fé', texto: 'A fé é como uma pequena semente. Quando regada com oração e a Palavra, ela cresce e se torna uma árvore forte, capaz de mover montanhas em sua vida.', data: '2025-10-03T10:00:00Z' },
        { id: 2, titulo: 'O Bom Pastor', texto: '"O Senhor é o meu pastor; de nada terei falta." - Salmos 23:1. Confie na provisão e no cuidado constante de Deus em cada área da sua vida.', data: '2025-10-02T10:00:00Z' },
        { id: 1, titulo: 'O Amor ao Próximo', texto: '"Amem-se uns aos outros. Como eu os amei, vocês devem amar-se uns aos outros." - João 13:34. O amor é a marca do cristão. Como você tem demonstrado amor hoje?', data: '2025-10-01T10:00:00Z' },
    ];
    let eventos = [
        { id: 6, dia: '2025-10-25', horario: '09:00', tema: 'Café com Pastores', avisos: 'Um tempo de bate-papo e comunhão com nossa liderança. Vagas limitadas.', data: '2025-10-06T11:00:00Z' },
        { id: 5, dia: '2025-10-18', horario: '19:00', tema: 'Noite de Talentos', avisos: 'Inscrições abertas para apresentações de música, teatro e poesia.', data: '2025-10-05T11:00:00Z' },
        { id: 4, dia: '2025-10-12', horario: '10:00', tema: 'Culto com Santa Ceia', avisos: 'Participe deste momento de memória e renovação da aliança.', data: '2025-10-04T11:00:00Z' },
        { id: 3, dia: '2025-10-11', horario: '19:30', tema: 'Encontro de Jovens Geração Atitude', avisos: 'Louvor, palavra e comunhão para toda a juventude.', data: '2025-10-03T11:00:00Z' },
        { id: 2, dia: '2025-10-08', horario: '20:00', tema: 'Noite de Oração', avisos: 'Um tempo especial para buscarmos a face de Deus em oração.', data: '2025-10-02T11:00:00Z' },
        { id: 1, dia: '2025-10-05', horario: '19:00', tema: 'Culto de Celebração', avisos: 'Venha celebrar conosco as maravilhas que o Senhor tem feito.', data: '2025-10-01T11:00:00Z' },
    ];
    let videos = [
        { id: 2, titulo: 'Série "Fruto do Espírito"', descricao: 'Estudo completo sobre Gálatas 5. Assista ao primeiro episódio sobre o amor.', data: '2025-10-08T12:00:00Z', url: null },
        { id: 1, titulo: 'Mensagem sobre o Perdão', descricao: 'Uma palavra do nosso pastor sobre a importância de perdoar.', data: '2025-10-01T12:00:00Z', url: null },
    ];
    
    const ADMIN_PASSWORD = 'admin123';
    const whatsappIconSVG = `<svg viewBox="0 0 24 24" class="w-4 h-4 mr-2" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.908 6.182l-.341 1.246 1.274-.328zM11.894 8.354c-.224 0-.442.028-.648.083-.206.055-.455.137-.662.254-.207.117-.393.214-.51.275-.117.062-.214.093-.262.094-.048.001-.117-.01-.165-.01-.048 0-.117.046-.224.164-.107.117-.282.312-.42.529-.138.217-.286.49-.393.733-.107.243-.205.528-.205.814 0 .285.048.546.146.78.098.234.286.505.51.748.224.243.48.493.748.718.268.224.566.43.864.592.298.162.617.279.915.34.298.062.636.094.915.094s.546-.047.748-.146c.202-.099.43-.247.648-.48.218-.233.393-.505.51-.814s.138-.648.083-.99c-.055-.341-.186-.63-.393-.864-.207-.234-.48-.42-.814-.528-.334-.108-.748-.094-1.129-.094z"/></svg>`;

    // =============================================
    // LÓGICA DE NOTIFICAÇÕES DO NAVEGADOR
    // =============================================
    const notificationBtn = document.getElementById('notification-bell-btn');
    function updateNotificationButton() {
        if (!('Notification' in window)) { notificationBtn.style.display = 'none'; return; }
        if (Notification.permission === 'granted') { notificationBtn.innerHTML = `<i data-lucide="bell-ring" class="w-5 h-5"></i>`; notificationBtn.title = 'Notificações ativadas'; notificationBtn.classList.add('text-green-400'); notificationBtn.disabled = true; } 
        else if (Notification.permission === 'denied') { notificationBtn.innerHTML = `<i data-lucide="bell-off" class="w-5 h-5"></i>`; notificationBtn.title = 'Notificações bloqueadas'; notificationBtn.classList.add('text-red-400'); notificationBtn.disabled = true; }
        lucide.createIcons();
    }
    notificationBtn.addEventListener('click', () => { if (Notification.permission === 'default') { Notification.requestPermission().then(updateNotificationButton); } });
    function showNotification(title, body) { if (Notification.permission === 'granted') { new Notification(title, { body: body, icon: 'https://img.icons8.com/plasticine/100/church.png' }); } }

    // =============================================
    // FUNÇÕES DE UTILIDADE, PAGINAÇÃO E RENDERIZAÇÃO
    // =============================================
    function formatDateToBR(dateString) { if (!dateString) return ''; const [y, m, d] = dateString.split('-'); return `${d}/${m}/${y}`; }
    function formatDateTimeToBR(dateString) { if (!dateString) return ''; const date = new Date(dateString); return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }); }
    function populateTimeSelect() { const t = document.getElementById('evento-horario'); t.innerHTML = '<option value="" disabled selected>Selecione um horário</option>'; for (let h = 7; h <= 22; h++) { for (let m = 0; m < 60; m += 30) { const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`; t.innerHTML += `<option value="${time}">${time}</option>`; } } }
    
    function renderContent(type, dataArray, renderFunction) {
        dataArray.sort((a, b) => new Date(b.data) - new Date(a.data));
        const state = paginationState[type];
        const totalItems = dataArray.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        state.totalPages = totalPages;
        if (state.currentPage > totalPages && totalPages > 0) state.currentPage = totalPages;
        const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = dataArray.slice(startIndex, endIndex);
        renderFunction(paginatedItems);
        renderPagination(type);
    }

    function renderPagination(type) {
        const state = paginationState[type];
        const container = document.getElementById(`${type}-pagination`);
        if (!container) return;
        if (state.totalPages <= 1) { container.innerHTML = ''; return; }
        container.innerHTML = `<button id="prev-${type}" class="pagination-button">&lt; Anterior</button><span class="page-info">Página ${state.currentPage} de ${state.totalPages}</span><button id="next-${type}" class="pagination-button">Próximo &gt;</button>`;
        const prevBtn = document.getElementById(`prev-${type}`);
        const nextBtn = document.getElementById(`next-${type}`);
        prevBtn.disabled = state.currentPage === 1;
        nextBtn.disabled = state.currentPage === state.totalPages;
        prevBtn.addEventListener('click', () => { if (state.currentPage > 1) { state.currentPage--; initializeApp(); } });
        nextBtn.addEventListener('click', () => { if (state.currentPage < state.totalPages) { state.currentPage++; initializeApp(); } });
    }

    function renderDevocionais(itemsToRender) { const list = document.getElementById('devocionais-list'); list.innerHTML = ''; if (itemsToRender.length === 0) { list.innerHTML = '<p class="text-center text-text-secondary">Nenhum devocional publicado.</p>'; return; } itemsToRender.forEach(item => { list.innerHTML += `<div class="content-card p-5 border-l-[2px]" style="border-color: var(--highlight-main);"><p class="text-sm text-text-secondary mb-2">Publicado em: ${formatDateTimeToBR(item.data)}</p><h3 class="text-xl font-bold text-main">${item.titulo}</h3><p class="text-text-secondary mt-3 whitespace-pre-wrap">${item.texto}</p><div class="mt-4 pt-4 border-t border-white/10 flex justify-end"><button onclick="shareOnWhatsApp('devocional', ${item.id})" class="share-button">${whatsappIconSVG}Compartilhar</button></div></div>`; }); }
    function renderEventos(itemsToRender) { const list = document.getElementById('eventos-list'); list.innerHTML = ''; if (itemsToRender.length === 0) { list.innerHTML = '<p class="text-center text-text-secondary">Nenhum evento agendado.</p>'; return; } itemsToRender.forEach(evento => { list.innerHTML += `<div class="content-card p-5 border-l-[2px]" style="border-color: var(--action-main);"><p class="text-base font-semibold" style="color: var(--highlight-main);">${formatDateToBR(evento.dia)} - ${evento.horario}</p><h3 class="text-xl font-bold text-main mt-1">${evento.tema}</h3><p class="text-text-secondary mt-3">${evento.avisos}</p><div class="mt-4 pt-4 border-t border-white/10 flex justify-end"><button onclick="shareOnWhatsApp('evento', ${evento.id})" class="share-button">${whatsappIconSVG}Compartilhar</button></div></div>`; }); }
    function renderVideos(itemsToRender) { const list = document.getElementById('videos-list'); list.innerHTML = ''; if (itemsToRender.length === 0) { list.innerHTML = '<p class="text-center text-text-secondary">Nenhum vídeo publicado.</p>'; return; } itemsToRender.forEach(item => { const videoElement = item.url ? `<video src="${item.url}" class="w-full rounded-lg mt-3" controls></video>` : ''; list.innerHTML += `<div class="content-card p-5"><p class="text-sm text-text-secondary mb-2">Publicado em: ${formatDateTimeToBR(item.data)}</p><h3 class="text-xl font-bold text-main">${item.titulo}</h3><p class="text-text-secondary mt-2">${item.descricao}</p>${videoElement}</div>`; }); }

    // =============================================
    // LÓGICA DE NAVEGAÇÃO, ADMIN E CRUD
    // =============================================
    window.shareOnWhatsApp = (type, id) => { let msg = ''; if (type === 'devocional') { const i = devocionais.find(d => d.id === id); if (!i) return; msg = `*Devocional do Dia: ${i.titulo}*\n\n${i.texto}\n\n---\n_Compartilhado pelo App da Igreja da Comunidade_`; } else if (type === 'evento') { const i = eventos.find(e => e.id === id); if (!i) return; msg = `*Convite - Evento na Igreja da Comunidade*\n\n*${i.tema}*\n\n🗓️ *Quando:* ${formatDateToBR(i.dia)} às ${i.horario}\n\n📝 *Detalhes:* ${i.avisos}`; } window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank'); };
    const memberView = document.getElementById('member-view');
    const adminView = document.getElementById('admin-view');
    const loginAdminBtn = document.getElementById('login-admin-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginModal = document.getElementById('login-modal');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const loginForm = document.getElementById('login-form');
    hamburgerBtn.addEventListener('click', () => mobileMenu.classList.add('mobile-menu-visible'));
    closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('mobile-menu-visible'));
    loginAdminBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    document.getElementById('close-modal-btn').addEventListener('click', () => loginModal.style.display = 'none');
    loginForm.addEventListener('submit', (e) => { e.preventDefault(); if (document.getElementById('password').value === ADMIN_PASSWORD) { loginModal.style.display = 'none'; memberView.classList.add('hidden'); adminView.classList.remove('hidden'); loginAdminBtn.classList.add('hidden'); logoutBtn.classList.remove('hidden'); loginForm.reset(); document.getElementById('login-error').textContent = ''; } else { document.getElementById('login-error').textContent = 'Senha incorreta.'; } });
    logoutBtn.addEventListener('click', () => { adminView.classList.add('hidden'); memberView.classList.remove('hidden'); logoutBtn.classList.add('hidden'); loginAdminBtn.classList.remove('hidden'); });
    function switchTab(tabName) { document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active-tab', t.dataset.tab === tabName)); document.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active-pane', p.id === `${tabName}-content`)); }
    document.querySelectorAll('.nav-tab').forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
    document.querySelectorAll('.mobile-menu-link').forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); switchTab(link.dataset.tab); closeMenuBtn.click(); }); });
    function setupAdminTabs() { document.querySelectorAll('.admin-nav-tab').forEach(tab => { tab.addEventListener('click', () => { document.querySelectorAll('.admin-nav-tab').forEach(t => t.classList.remove('active-tab')); tab.classList.add('active-tab'); document.querySelectorAll('.admin-tab-pane').forEach(pane => pane.classList.toggle('active-pane', pane.id === `${tab.dataset.tab}-content`)); }); }); }
    const devocionalForm = document.getElementById('devocional-form');
    function renderAdminDevocionais() { const l = document.getElementById('admin-devocionais-list'); l.innerHTML = ''; devocionais.forEach(i => { l.innerHTML += `<div class="flex justify-between items-center p-3 rounded-md hover:bg-white/5 text-main"><p class="font-semibold">${i.titulo}</p><div class="space-x-2"><button onclick="editDevocional(${i.id})" class="p-2 text-blue-400 hover:text-blue-300"><i data-lucide="edit"></i></button><button onclick="deleteDevocional(${i.id})" class="p-2 text-red-400 hover:text-red-300"><i data-lucide="trash-2"></i></button></div></div>`; }); lucide.createIcons(); }
    devocionalForm.addEventListener('submit', e => { e.preventDefault(); const id = document.getElementById('devocional-id').value; const data = { titulo: document.getElementById('devocional-titulo').value, texto: document.getElementById('devocional-texto').value }; if(id) { const index = devocionais.findIndex(i => i.id == id); devocionais[index] = { ...devocionais[index], ...data }; } else { devocionais.unshift({ ...data, id: Date.now(), data: new Date().toISOString() }); showNotification('Novo Devocional!', 'Um novo devocional foi publicado.'); } devocionalForm.reset(); document.getElementById('devocional-id').value = ''; initializeApp(); });
    window.editDevocional = (id) => { const i = devocionais.find(d => d.id == id); document.getElementById('devocional-id').value = i.id; document.getElementById('devocional-titulo').value = i.titulo; document.getElementById('devocional-texto').value = i.texto; }
    window.deleteDevocional = (id) => { if(confirm('Excluir este devocional?')) { devocionais = devocionais.filter(i => i.id != id); initializeApp(); } }
    const eventoForm = document.getElementById('evento-form');
    function renderAdminEventos() { const l = document.getElementById('admin-eventos-list'); l.innerHTML = ''; eventos.forEach(e => { l.innerHTML += `<div class="flex justify-between items-center p-3 rounded-md hover:bg-white/5 text-main"><p class="font-semibold">${e.tema}</p><div class="space-x-2"><button onclick="editEvento(${e.id})" class="p-2 text-blue-400 hover:text-blue-300"><i data-lucide="edit"></i></button><button onclick="deleteEvento(${e.id})" class="p-2 text-red-400 hover:text-red-300"><i data-lucide="trash-2"></i></button></div></div>`; }); lucide.createIcons(); }
    eventoForm.addEventListener('submit', (e) => { e.preventDefault(); const id = document.getElementById('evento-id').value; const data = { dia: document.getElementById('evento-dia').value, horario: document.getElementById('evento-horario').value, tema: document.getElementById('evento-tema').value, avisos: document.getElementById('evento-avisos').value }; if (id) { const index = eventos.findIndex(i => i.id == id); eventos[index] = { ...eventos[index], ...data }; } else { eventos.unshift({ ...data, id: Date.now(), data: new Date().toISOString() }); showNotification('Novo Evento Agendado!', data.tema); } eventoForm.reset(); document.getElementById('evento-id').value = ''; initializeApp(); });
    window.editEvento = (id) => { const i = eventos.find(e => e.id == id); document.getElementById('evento-id').value = i.id; document.getElementById('evento-dia').value = i.dia; document.getElementById('evento-horario').value = i.horario; document.getElementById('evento-tema').value = i.tema; document.getElementById('evento-avisos').value = i.avisos; }
    window.deleteEvento = (id) => { if (confirm('Excluir este evento?')) { eventos = eventos.filter(i => i.id != id); initializeApp(); } }
    const videoForm = document.getElementById('video-form');
    const videoArquivoInput = document.getElementById('video-arquivo');
    const videoPreview = document.getElementById('video-preview');
    videoArquivoInput.addEventListener('change', () => { const f = videoArquivoInput.files[0]; if (f) { videoPreview.src = URL.createObjectURL(f); videoPreview.classList.remove('hidden'); } });
    function renderAdminVideos() { const l = document.getElementById('admin-videos-list'); l.innerHTML = ''; videos.forEach(i => { l.innerHTML += `<div class="flex justify-between items-center p-3 rounded-md hover:bg-white/5 text-main"><p class="font-semibold">${i.titulo}</p><div class="space-x-2"><button onclick="deleteVideo(${i.id})" class="p-2 text-red-400 hover:text-red-300"><i data-lucide="trash-2"></i></button></div></div>`; }); lucide.createIcons(); }
    videoForm.addEventListener('submit', e => { e.preventDefault(); const f = videoArquivoInput.files[0]; const u = f ? URL.createObjectURL(f) : null; const d = { titulo: document.getElementById('video-titulo').value, descricao: document.getElementById('video-descricao').value, arquivo: f ? f.name : 'Nenhum', url: u }; videos.unshift({ ...d, id: Date.now(), data: new Date().toISOString() }); showNotification('Novo Vídeo Publicado!', d.titulo); videoForm.reset(); videoPreview.classList.add('hidden'); initializeApp(); });
    window.deleteVideo = (id) => { if(confirm('Excluir este vídeo?')) { videos = videos.filter(i => i.id != id); initializeApp(); } }

    // =============================================
    // INICIALIZAÇÃO
    // =============================================
    function initializeApp() {
        renderContent('devocionais', devocionais, renderDevocionais);
        renderContent('eventos', eventos, renderEventos);
        renderContent('videos', videos, renderVideos);
        populateTimeSelect();
        setupAdminTabs();
        updateNotificationButton();
        renderAdminDevocionais();
        renderAdminEventos();
        renderAdminVideos();
    }
    
    initializeApp();
});

