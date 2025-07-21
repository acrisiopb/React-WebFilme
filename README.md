### Projeto | Criado em Next.js - Consumindo API TMDB - 2025

<p>Este projeto foi desenvolvido utilizando Next.js, um framework moderno baseado em React, com foco em performance, renderização híbrida (SSR e SSG) e experiência do usuário.
A aplicação consome dados diretamente da API pública do TMDB (The Movie Database), uma das maiores bases de dados de filmes, séries e celebridades do mundo.</p>
<br/>

![Movie](https://github.com/user-attachments/assets/962a0cb0-05fd-4f6e-bb5c-622a02549d6c)

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

<h5>Prévia - Captura de Tela</h5>
<a href="https://bbg-front-end.vercel.app/">LINK - > SITE </a>

 img I | img II | Todos os img III |
|:-----:|:----:|:------------------:|
  <img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753111621/tala_1_jqq3kf.png" alt="1" width="400" /> |
  <img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753111620/tala_3_bolvfg.png" alt="2" width="400" /> |
  <img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753111620/tela_3_kws0tn.png" alt="3" width="400" /> |

 img IV | img V | img VI |
|:-----:|:----:|:------------------:|
  <img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753111620/tela_2_fbtril.png" alt="4" width="400" /> |
  <img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753111620/tela_4_s33vdg.png" alt="5" width="400" /> |
  <img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753111621/tela_5_xdlh4h.png" alt="6" width="400" /> |


 img VII | img VIII | 
|:-----:|:----:|:------------------:|
  <img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753111620/tela_2.1_o3y9w5.png" alt="7" width="400" /> |
  <img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753111620/tela_6_czcd5k.png" alt="8" width="400" />   |


<br/>
<p align="center"><img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753112571/painel_Mobile_vtl1fi.png"></p>
<br/>

 <div align="center">
   <h5>TECNOLOGIAS </h5>
    <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="Badge MySQL">
    <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" alt="Badge Spring">
    <img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=blue" alt="NEXT">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=red" alt="Git">
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="Badge Spring">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML 5">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
 </div>

<br/>  

 <p align="center">
   <h5>Swagger | Documentaçã </h5>
   <p> A documentação completa da API está disponível via Swagger:</p>
   <a href="https://deploy-bbgcine.onrender.com/swagger-ui/index.html#/">Link -> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="Badge Spring"></a>
     <img src="https://res.cloudinary.com/dyk1w5pnr/image/upload/v1753111619/tela_7_ekpfud.png" alt="Swagger">
 </p>


 <br/>

 <h5>Instruções de Instalação</h5>

<p>
  <strong>Front-end:</strong> abra a pasta principal chamada <code>movie_app</code> no terminal, instale as dependências com o comando:<br>
  <code>npm install</code><br>
  Em seguida, inicie a aplicação com:<br>
  <code>npm run dev</code>
</p>

<p>
  <strong>Back-end:</strong> abra a pasta <code>overview</code> na sua IDE preferida e execute a aplicação Spring Boot.<br>
  <strong>Observação:</strong> configure o banco de dados no arquivo <code>application.properties</code> com o nome e credenciais desejadas antes de iniciar o projeto.
</p>


 <br/>

<h5>⚛️⚛️Aviso Legal</h5>

<p>
  Este projeto foi desenvolvido com propósito exclusivamente educacional, sem qualquer intenção comercial. Ele utiliza a API pública da <a href="https://www.themoviedb.org/" target="_blank">TMDB (The Movie Database)</a> para exibição de dados relacionados a filmes.
</p>

<p>
  Este site <strong>não possui nenhuma afiliação oficial</strong> com a TMDB. Todos os direitos autorais e marcas registradas pertencem aos seus respectivos proprietários.
</p>

<p>
  Caso você seja o titular de algum conteúdo exibido e deseje solicitar a remoção, entre em contato.
</p>

<p>
  Desenvolvido por <strong>Acrísio Cruz</strong>.
</p>





