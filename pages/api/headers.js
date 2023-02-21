import https from 'https';

export default function handler(req, res) {

    // prints the request headers in JSON format

    res.write(JSON.stringify(req.headers), 'utf8');
}