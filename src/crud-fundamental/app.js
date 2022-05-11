const { throws } = require('assert');
const fs = require('fs');
const http = require('http');
const url = require('url');

const menu = `<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>진욱이네 중국집</title>
</head>
<body>
    <h1> 진욱이네 중국집 메뉴판<h1>
    <h2> <주의사항> 곱빼기는 주문 안됩니다. <h2>
    <h3> 짜장면 - 7,000원 <h3>
    <h3> 짬뽕 - 8,000원 <h3>
    <h3> 탕수육 - 16,000원 <h3>
    <h3> 팔보채 - 59,000원 <h3>
</body>
`
//요청 url의 pathname을 보고 라우팅을 분리
const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url, true);
    const pathName = urlObj.pathname;

    if (pathName === '/') {
        console.log("메뉴판을 보여줍니다.");
        res.end(menu);

    } else if (pathName === '/create') {
        console.log();
        fs.readdir(`./data`, 'utf8', (err, files) => {
            if (err) throw err;
            //테이블(파일) 별 주문내역(내용) 출력
            fs.readFile(`./data/1st-table.txt`, 'utf8', (err2, data) => {
                if (err2) throw err2;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                console.log(data);
            });
            fs.readFile(`./data/2nd-table.txt`, 'utf8', (err3, data) => {
                if (err3) throw err3;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                console.log(data);
            });
            fs.readFile(`./data/3rd-table.txt`, 'utf8', (err4, data) => {
                if (err4) throw err4;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                console.log(data);
                res.end("CREATE ORDER LIST");
            });
        });
    } else if (pathName === '/update') {
        console.log();
        //additional-order.txt 파일을 생성하도록 지정
        fs.writeFile(`./data/additional-order.txt`, "모든 테이블 음료 서비스 추가", 'utf8', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("추가 주문이 접수되었습니다.");
        });
        //Update form
        //현재까지의 주문 내역을 수정하는 작업을 고정
        fs.appendFile('./data/1st-table.txt', " 서비스 음료 추가", () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("UPDATE ORDER LIST");
        });
        fs.appendFile('./data/2nd-table.txt', " 서비스 음료 추가", () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("UPDATE ORDER LIST");
        });
        fs.appendFile('./data/3rd-table.txt', " 서비스 음료 추가", () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("UPDATE ORDER LIST");
        });
        console.log("서비스 음료 적립, 각 테이블 별 주문 내역이 수정되었습니다.")

    } else if (pathName === '/delete') {
        console.log();
        //Delete
        //추가 주문 파일이 삭제되도록 지정
        console.log("일일 정산을 위해 서비스 내역 삭제")
        fs.unlink(`./data/addtional-order.txt`, () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("DELETE ORDER LIST");
        });
    } else {
        //없는 경로에 접근
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end("Sorry! Wrong path. <a href='/'>Go home</a>");
    }
});
server.listen(8010);

server.on('listening', () => {
    console.log('8010번 포트에서 서버 대기중');
});
server.on('error', (error) => {
    console.error(error);
});