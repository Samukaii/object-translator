# Translator
![image](https://github.com/Samukaii/object-translator/assets/54710691/9142d73a-e304-493c-b76e-5b4a2ff1c892)

Translator é uma cli para a geração automática de traduções usando o Bing Translate

## Como usar

```shell
git clone https://github.com/Samukaii/object-translator.git
cd object-translator
```

Após isso abra o arquivo src/config.json e adicione as configurações desejadas e execute o script abaixo:

```shell
npm run build && npm i -g .
```

## Configurações
![image](https://github.com/Samukaii/object-translator/assets/54710691/6f853f45-f654-4887-ad68-80a6e411fab4)

### basePath
Aqui você define em qual pasta o seu arquivo de tradução será pesquisado e também onde serão criadas as traduções

### translationSuffix
Defina qual será o sufixo usado nas suas traduções. 
Ex: Se o sufixo for "translate" a CLI irá buscar por um arquivo que termina com -translate e também irá gerar as traduções com este sufixo

Deixe uma string vazia se não quiser usar sufixos

### sourceLanguage
Define a linguagem que a CLI usará como fonte para gerar as demais traduções

### languages
Define quais linguagens serão traduzidas
