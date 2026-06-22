# Pasta downloads

O instalador real (`MTSistem.exe`) referenciado em `exe_url` dentro de [clientes.json](../clientes.json) **não é versionado no Git** (veja `.gitignore`) porque excede o limite de 100 MB do GitHub.

Para publicar a atualização:

1. Coloque o arquivo `MTSistem.exe` localmente nesta pasta para testes (ele fica ignorado pelo Git).
2. No deploy (ex: Netlify), envie esse arquivo separadamente — por upload manual no painel, um passo de build que baixe de outro storage, ou hospedando-o em um serviço externo (GitHub Releases, S3, Google Drive, etc.) e apontando `exe_url` diretamente para essa URL.
