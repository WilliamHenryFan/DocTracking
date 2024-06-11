const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const ejs = require('ejs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;
const serverAddress = 'http://localhost'; // 主機 IP

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const departments = [
    '經營室(O)',
    '戰略事業群(O51)',
    '數位應用服務部(J0)',
    '通關服務部(SA)',
    '公衛服務部(D)',
    '資訊服務部(SB)',
    '電商服務部(L)',
    '資安整合服務部(M)',
    '客戶服務部 (QB)',
    '高雄營業部（H）',
    '關港貿服務部(G)',
    '關港貿服務部海關駐點(G)',
    '創新保險服務部(U)',
    '品保中心(W)',
    '行政管理部(Y0)',
    '財務及會計部(R0)',
    '人才育成中心 (X)',
    '海外事業中心(N)',
    '資安長辦公室(V)',
    '營運服務部(E)',
    '軟體工程部(C)',
    '雲架構服務部(A)',
    '企劃及市場部 (P)',
    '數位發展部 (T)',
    '台中辦公室'
].sort();

let documents = {};

app.get('/', (req, res) => {
    res.render('index', { departments });
});

app.post('/generate', (req, res) => {
    const id = uuidv4();
    documents[id] = req.body;

    QRCode.toDataURL(`${serverAddress}:${port}/document/${id}`, (err, url) => {
        if (err) return res.send('錯誤發生');
        res.render('qrcode', { src: url, id });
    });
});

app.post('/generate-multiple', async (req, res) => {
    const { quantity, ...docData } = req.body;
    const qrCodes = [];

    for (let i = 0; i < quantity; i++) {
        const id = uuidv4();
        documents[id] = docData;

        try {
            const url = await QRCode.toDataURL(`${serverAddress}:${port}/document/${id}`);
            qrCodes.push({ src: url, id });
        } catch (err) {
            return res.send('錯誤發生');
        }
    }

    res.render('qrcodes', { qrCodes });
});

app.get('/document/:id', (req, res) => {
    const id = req.params.id;
    const document = documents[id];
    const editable = false;

    if (!document) {
        return res.send('找不到該文件');
    }

    res.render('document', { id, document, departments, editable });
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const document = documents[id];
    const editable = true;

    if (!document) {
        return res.send('找不到該文件');
    }

    res.render('document', { id, document, departments, editable });
});

app.post('/save/:id', (req, res) => {
    const id = req.params.id;
    documents[id] = req.body;

    res.redirect(`/document/${id}`);
});

app.listen(port, () => {
    console.log(`Server is running on ${serverAddress}:${port}`);
});
