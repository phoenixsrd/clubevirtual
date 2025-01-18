const fetch = require('node-fetch');
require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;

async function getLatestRelease() {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'Node.js',
      },
    });

    if (!response.ok) {
      console.error('Erro Ao Acessar A API Do GitHub:', await response.json());
      return;
    }

    const data = await response.json();
    const asset = data.assets?.[0];
    if (!asset) {
      console.error('Nenhum Arquivo Encontrado No Release.');
      return;
    }

    console.log('Link do arquivo:', asset.browser_download_url);
  } catch (error) {
    console.error('Erro Ao Buscar O Release:', error.message);
  }
}

getLatestRelease();
