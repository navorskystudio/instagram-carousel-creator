# 🚀 Guia de Deploy no GitHub Pages

## Passo a Passo Completo

### 1️⃣ Preparar os Arquivos

Você já tem todos os arquivos necessários:
- `index.html` - Aplicação principal
- `README.md` - Documentação
- `LICENSE` - Licença MIT
- `.gitignore` - Arquivos ignorados

### 2️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name**: `instagram-carousel-creator`
   - **Description**: "Ferramenta para criar e visualizar carrosséis do Instagram"
   - **Public** ✅ (deixe público)
   - **Não** marque "Add README" (já temos um)
3. Clique em **Create repository**

### 3️⃣ Fazer Upload dos Arquivos

**Opção A - Via Interface Web (Mais Fácil):**

1. Na página do repositório recém-criado, clique em **uploading an existing file**
2. Arraste todos os arquivos desta pasta
3. Escreva uma mensagem: "Initial commit"
4. Clique em **Commit changes**

**Opção B - Via Git (Terminal):**

```bash
cd caminho/para/instagram-carousel-creator
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/instagram-carousel-creator.git
git push -u origin main
```

### 4️⃣ Ativar GitHub Pages

1. No seu repositório, clique em **Settings** (⚙️)
2. No menu lateral, clique em **Pages**
3. Em **Source**:
   - Branch: **main**
   - Folder: **/ (root)**
4. Clique em **Save**
5. Aguarde 1-2 minutos

### 5️⃣ Acessar Sua Aplicação

Seu site estará disponível em:
```
https://SEU-USUARIO.github.io/instagram-carousel-creator/
```

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

---

## 🔄 Como Atualizar

Sempre que quiser fazer mudanças:

### Via Interface Web:
1. Clique no arquivo que quer editar
2. Clique no ícone de lápis (✏️)
3. Faça as alterações
4. Clique em **Commit changes**
5. Aguarde 1-2 minutos e as mudanças estarão online

### Via Git:
```bash
git add .
git commit -m "Descrição da atualização"
git push
```

---

## 🎯 Dicas

- ✅ Mantenha o repositório **público** para usar GitHub Pages gratuitamente
- ✅ Toda vez que fizer commit, o site atualiza automaticamente
- ✅ Você pode usar um domínio customizado (veja Settings → Pages → Custom domain)
- ✅ O site funciona offline após o primeiro carregamento
- ✅ Sem limites de uso ou visitantes

---

## ❓ Problemas Comuns

**Site não aparece após 2 minutos?**
- Verifique se o repositório está público
- Confirme que o GitHub Pages está ativado
- Limpe o cache do navegador (Ctrl+Shift+R)

**Erro 404?**
- Certifique-se de que o arquivo se chama `index.html`
- Verifique se está na raiz do repositório

**Mudanças não aparecem?**
- Aguarde alguns minutos
- Limpe o cache
- Verifique se o commit foi feito com sucesso

---

## 📞 Suporte

Caso tenha dúvidas:
1. Verifique a documentação do GitHub Pages
2. Confira os issues do repositório
3. Entre em contato

---

**Pronto! Sua ferramenta estará online e acessível para qualquer pessoa! 🎉**
