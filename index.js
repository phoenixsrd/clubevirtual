const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;

app.get('/latest-link', async (req, res) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });

    const asset = response.data.assets[0];
    if (!asset) {
      return res.status(404).json({ error: 'Nenhum Arquivo Encontrado No Release.' });
    }

    res.json({ url: asset.browser_download_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro Ao Obter O Link Do Arquivo.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Rodando Na Porta ${PORT}`);
});
