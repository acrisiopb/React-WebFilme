### Projeto | Criado em Next.js - Consumindo API TMDB - 2025

<p>Este projeto foi desenvolvido utilizando Next.js, um framework moderno baseado em React, com foco em performance, renderização híbrida (SSR e SSG) e experiência do usuário.
A aplicação consome dados diretamente da API pública do TMDB (The Movie Database), uma das maiores bases de dados de filmes, séries e celebridades do mundo.</p>

<br/>

<p>
  A aplicação realiza requisições para os endpoints da API do TMDB, utilizando uma chave de API fornecida pela própria plataforma. Os dados retornados são processados e renderizados dinamicamente nas páginas, 
  garantindo uma experiência atualizada e fluida para o usuário.
  Além disso, foi implementado um sistema de favoritos com persistência de dados. Quando um usuário não está logado, os filmes marcados como favoritos são armazenados localmente (localStorage).
  Já para usuários autenticados, os filmes adicionados à lista de favoritos são automaticamente salvos em um banco de dados, vinculados ao seu perfil de usuário.
  Isso permite que o sistema recupere os dados a qualquer momento, mesmo após logout ou em diferentes dispositivos.
  
  <h6>Usuários logados também têm acesso a funcionalidades exclusivas, como:</h6>
  <ul>
    <li>Alteração de senha</li>
    <li>Botão para "Assistir Filme"</li>
    <li>Sincronização completa dos favoritos</li>
  </ul>
</p>


<p align="center">
    ![Movie](https://github.com/user-attachments/assets/cdbf68c1-f03f-4965-84f5-0324b8bc6c6c)
</p>




<br/>




