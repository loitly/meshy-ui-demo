import https from 'https';

export default function handler(req, res) {

    https.get('https://irsa.ipac.caltech.edu/frontpage-data/irsa-menu.js', (resp) => {
        let data = '';
        resp.on('data', (chunk) => data += chunk)
            .on('end', () => res.status(200).send(data))
            .on('error', (err) => console.log('Error: ' + err.message));
    });
}