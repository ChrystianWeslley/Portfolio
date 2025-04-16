document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o comportamento padrão de envio do formulário

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            // Formato do corpo do email
            const mailtoLink = `mailto:sakuratemporario@gmail.com?subject=Contato%20do%20Website&body=Nome:%20${nome}%0DEmail:%20${email}%0DMensagem:%20${mensagem}`;

            // Abrir o cliente de email padrão do usuário com os dados preenchidos
            window.location.href = mailtoLink;

            // Limpar os campos do formulário após o envio (opcional)
            document.getElementById('nome').value = '';
            document.getElementById('email').value = '';
            document.getElementById('mensagem').value = '';

            // Adicionar lógica adicional aqui, como feedback visual para o usuário
            console.log('Email enviado via cliente de email padrão.');
        });
    }
});